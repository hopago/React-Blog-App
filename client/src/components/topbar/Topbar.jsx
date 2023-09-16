import './topbar.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../context/Context';


export default function Topbar() {

  const { user, dispatch } = useContext(Context);

  const PF = "http://localhost:8000/images/";

  const handleLogout = () => {

    dispatch({
      type: "LOGOUT"
    });

  };

  console.log(user);

  return (
    <div className='top'>
        <div className="topLeft">
            <i className="topIcon fab fa-facebook-square"></i>
            <i className="topIcon fab fa-twitter-square"></i>
            <i className="topIcon fab fa-pinterest-square"></i>
            <i className="topIcon fab fa-instagram-square"></i>
        </div>
        <div className="topCenter">
            <ul className="topList">
                <li className='topListItem'>
                  <Link className='link' to="/">Home</Link>
                </li>
                <li className='topListItem'>
                  <Link className='link' to="/about">About</Link>
                </li>
                <li className='topListItem'>
                  <Link className='link' to="/contact">CONTACT</Link>
                </li>
                <li className='topListItem'>
                  <Link className='link' to="/write">WRITE</Link>
                </li>
            </ul>
        </div>
        <div className="topRight">
          { user ? (
            <>
            <Link to='/settings'>
            <img 
              className='topImg'
              src={user.profilePicture ? PF+user.profilePicture : null}
              alt=""
            />
            </Link>
            <ul className="topList">
              <li className="topListItem">
                <li className="topListItem" onClick={handleLogout}>LOGOUT</li>
              </li>
            </ul>
            </>
          ) : 
          (
            <>
            <ul className="topList">
                <li className="topListItem">
                  <Link className='link' to="/login">LOGIN</Link>
                </li>
                <li className="topListItem">
                  <Link className='link' to="/register">REGISTER</Link>
                </li>
            </ul>
            </>
          )
          }
            <i className="topSearchIcon fas fa-search"></i>
        </div>
    </div>
  )
}
