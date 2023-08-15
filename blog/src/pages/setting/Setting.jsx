import { useContext, useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import './setting.css'
import { Context } from '../../context/Context'
import axios from 'axios'

const Setting = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [success, setSuccess] = useState(false);


    const { user, dispatch } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START"});
        const updateUser = {
            userId: user._id,
            username,
            email,
            password
        };

        try {
            const res = await axios.put("http://localhost:4000/api/users/" + user._id, updateUser);
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS",payload:res.data});

        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE"});
        }

    }

    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className='settingsForm' onSubmit={handleSubmit}>
                    <label > Profile Picture</label>
                    <div className="settingspp">
                        <img src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
                        <label htmlFor="fileInput">
                            <i className="settingsIcon fa-regular fa-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} className="settingsPPInput" />
                    </div>


                    {/* details  */}
                    <label >Username</label>
                    <input
                        type="text"
                        placeholder={user.username}
                        name='name'
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label >Email</label>
                    <input
                        type="email"
                        placeholder={user.email}
                        name='email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label >Password</label>
                    <input
                        type="password"
                        name='password'
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* submit button  */}
                    <button className='settingsSubmitButton' type='submit'>Update</button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>
                    )}

                </form>
            </div>
            <Sidebar />

        </div>
    )
}

export default Setting
