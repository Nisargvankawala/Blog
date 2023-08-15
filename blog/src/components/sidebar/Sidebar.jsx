import { useState } from 'react'
import './sidebar.css'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    const [cat, setcat] = useState([])


    useEffect(() => {

        const getCats = async () => {
            const res = await axios.get('http://localhost:4000/api/categories');
            setcat(res.data);
        }
        getCats();

    }, [])




    return (
        <div className='sidebar'>

            {/* about me  */}
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis nihil aliquid quidem.</p>
            </div>

            {/* categories  */}
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {
                        cat.map(c => (
                            <Link to={`/?cat=${c.name}`} className='link'>
                                <li className="sidebarListItem" key={c.name}>{c.name}</li>
                            </Link>
                        ))
                    }


                </ul>
            </div>



            {/* social handle  */}
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook" ></i>
                    <i className="sidebarIcon fa-brands fa-instagram" ></i>
                    <i className="sidebarIcon fa-brands fa-twitter" ></i>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
