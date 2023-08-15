import { Link } from 'react-router-dom'
import './login.css'
import { useRef } from 'react'
import { useContext } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFecthing } = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" })
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS",payload:res.data })

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }

  console.log(isFecthing)


  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className='loginForm'  onSubmit={handleSubmit}>
        <label >Username</label>
        <input type="text" className='loginInput' placeholder='Enter your username...' ref={userRef} />
        <label >Password</label>
        <input type="password" className='loginInput' placeholder='Enter your password...' ref={passwordRef} />
        <button className="loginButton" type="submit" disabled={isFecthing}>
          Login
        </button>
      </form>
      <button className='loginRegisterButton'>
        <Link className="link" to='/register'>
          Register
        </Link>
      </button>
    </div>
  )
}

export default Login;
