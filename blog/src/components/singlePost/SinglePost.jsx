import { Link, useLocation, useNavigate } from 'react-router-dom'
import './singlePost.css'
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Context } from '../../context/Context';

const SinglePost = () => {
    //location is use to get the id of a post
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    let navigate = useNavigate();

    //images of particular post
    const PF = "http://localhost:4000/images/";

    const [post, setPost] = useState({});

    const { user } = useContext(Context);


    //update post
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [updateMode, setUpdateMode] = useState(false)



    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('http://localhost:4000/api/posts/' + path);
            setPost(res.data)
            setTitle(res.data.title)
            setDescription(res.data.description)
        }
        getPost();
    }, [path])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/api/posts/${post._id}`, { data: { username: user.username } });
            navigate('/')
        } catch (err) {

        }

    }

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/api/posts/${post._id}`, {
                username: user.username,
                title,
                description
            });

            setUpdateMode(false);
        } catch (err) {

        }
    }




    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {/* post image  */}
                {post.photo && (
                    <img className='singlePostImg' src={PF + post.photo} alt="" />
                )}

                {/* post icon and title  */}
                {
                    updateMode ? (

                        <div className='singlePostUpdate'>
                            <p className='singlePostTitle'>Update Title :
                                <input
                                    type="text"
                                    value={title}
                                    className='singlePostTitleInput'
                                    autoFocus
                                    onChange={(e) => setTitle(e.target.value)}

                                />
                            </p>
                        </div>

                    )
                        :

                        (<h1 className="singlePostTitle">
                            {title}
                            {post.username === user?.username &&
                                <div className="singlePostEdit">
                                    <i className="snglePostIconEdit fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                                    <i className="snglePostIconDelete fa-solid fa-trash" onClick={handleDelete}></i>
                                </div>
                            }
                        </h1>)
                }

                {/* post author info  */}
                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>Author :
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b style={{ paddingLeft: "6px" }}>{post.username}</b>
                        </Link>

                    </span>
                    <span className='singlePostDate'>{new Date(post.createdAt).toDateString()}</span>
                </div>

                {/* post description */}
                {
                    updateMode ?
                        (
                            <textarea
                                className="singlePostDescInput"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        )
                        :
                        (<p className="singlePostDesc">
                            {description}
                            <br />
                        </p>)
                }

                {updateMode && (
                    <button className="singlePostButton" onClick={handleUpdate}>
                        Update
                    </button>
                )}
            </div>

        </div>

    )
}

export default SinglePost
