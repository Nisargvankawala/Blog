import './post.css'
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  const PF = "http://localhost:4000/images/";

  return (
    <div className='post'>
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}

  

      {/* post information */}
      <div className="postInfo">
        <div className="postCards" >{
          post.category.map(c => (
            <span className="postCard">{c.name}</span>
          ))
        }


        </div >
        <Link className='link' to={`/post/${post._id}`}>
          <span className="postTitle" >{post.title}</span>
        </Link>
        <hr />
        <span className='postDate'>{new Date(post.createdAt).toDateString()}</span>
      </div>
      {/* post description */}
      <p className="postDesc">
        {post.description}
      </p>
    </div>
  )
}

export default Post
