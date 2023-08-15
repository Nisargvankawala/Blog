import { Link } from 'react-router-dom'
import './topbar.css'
import { useContext } from 'react';
import { Context } from '../../context/Context';

const TopBar = () => {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <div className='top'>
      <div className="topLeft">
        <Link to='https://www.facebook.com/login/'><i className="topIcon fa-brands fa-facebook" style={{ color: "#144ed7" }}></i></Link>
        <Link to='/'><i className="topIcon fa-brands fa-instagram" style={{ color: "#b526c0" }}></i></Link>
        <Link to='https://twitter.com/i/flow/login?redirect_after_login=%2Flogin%3Flang%3Den'><i className="topIcon fa-brands fa-twitter" style={{ color: "#0c5fed" }}></i></Link>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <Link className="topListItem" to='/'>Home</Link>
          <Link className="topListItem" to='/about'>About</Link>
          <Link className="topListItem" to='/contact'>Contact</Link>
          <Link className="topListItem" to='/write'>Write</Link>
          <Link className="topListItem" to='/' onClick={handleLogout}>{user && "Logout"}</Link>
        </ul>
      </div>
      <div className="topRight">
        {user ?(
          <Link to='/setting' className='link'><button className='topButton'>{user.username}</button></Link>
        ):(
          <ul className="topList">
            <Link className="topListItem" to='/login'>Login</Link>
            <Link className="topListItem" to='/register'>register</Link>
          </ul>
        )
        }

        {/* <img className="topimg" src="https://www.pngegg.com/en/search?q=login" alt=" " /> */}
        
        <i className="topsearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  )
}

export default TopBar
