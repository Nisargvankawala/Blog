import { useState } from 'react'
import './write.css'
import { useContext } from 'react'
import { Context } from '../../context/Context'
import axios from 'axios'

const Write = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null);
    const {user} = useContext(Context);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username : user.username,
            title,
            description,
        };
        if(file){
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name",filename);
            data.append("file",file);
            newPost.photo = filename;

            try {
                await axios.post("http://localhost:4000/api/upload",data)
            } catch (err) {
                
            }
        }
        try {
            const res = await axios.post("http://localhost:4000/api/posts",newPost);
            window.location.replace("/post/" + res.data._id);
            
        } catch (err) {
            
        }
        
    }

    return (
        <div className='write'>
            {file && 
            <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
            />
        }
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input 
                        type="file" 
                        id='fileInput' 
                        style={{ display: "none" }} 
                        onChange={(e)=>setFile(e.target.files[0])}
                    />
                    {/* This is for title  */}
                    <input
                        type="text"
                        placeholder='Title'
                        className='writeInput'
                        autoFocus={true} 
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
                    {/* This is for description */}
                <div className="writeFormGroup">
                    <textarea
                        placeholder='Tell Your Story ..'
                        type='text'
                        className='writeInput writeText'
                        onChange={(e)=>setDescription(e.target.value)}
                    ></textarea>
                </div>

                <button className='writeSubmit' type='submit'>Publish</button>
            </form>
        </div>
    )
}

export default Write
