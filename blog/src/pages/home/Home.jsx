import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/posts'+search);
        setPosts(res.data);

      } catch (err) {
        console.log(err);
      }

    };
    fetchPosts();
  }, [search]);


  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </div>
  )
}

export default Home
