import { useEffect, useState } from 'react';
import './sidebar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Sidebar() {

  const [cats, setCats] = useState([]);

  useEffect(() => {

    const getCats = async () => {

      const res = await axios.get('http://localhost:8000/api/categories');

      setCats(res.data);

    };

    getCats();

  }, [])

  return (
    <div className="sidebar">
        <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img 
            src="https://images.pexels.com/photos/102061/pexels-photo-102061.jpeg" 
            alt="" 
            className='sidebarImg'
            />
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, veritatis!
            </p>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
              {cats.map(c => {
                return (
                  <Link to={`/?cat=${c.name}`} className='link'>
                    <li className="sidebarListItem">{c.name}</li>
                  </Link>
                )
              })}
            </ul>
        </div>
        <div className="sidebarItem">
            <span className="sidebarTitle">Follow</span>
            <div className="sidebarSocial">
              <i className="sidebarIcon fab fa-facebook-square"></i>
              <i className="sidebarIcon fab fa-twitter-square"></i>
              <i className="sidebarIcon fab fa-pinterest-square"></i>
              <i className="sidebarIcon fab fa-instagram-square"></i>
            </div>
        </div>
    </div>
  )
}
