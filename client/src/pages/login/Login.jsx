import { useContext, useRef } from 'react';
import { Context } from '../../context/Context';
import './login.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Login() {

  const userRef = useRef();
  const pwRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    
    e.preventDefault();

    dispatch({
      type: "LOGIN_START"
    });

    try {
      
      const res = await axios.post("http://localhost:8000/api/auth/login", {
        username: userRef.current.value,
        password: pwRef.current.value
      });

      res && dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data
      });

    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }

  }



  return (
    <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input type="text" placeholder='Username' className='loginInput' ref={userRef} />
            <label>Password</label>
            <input type="password" placeholder='PW' className='loginInput' ref={pwRef} />
            <button className="loginButton" disabled={isFetching}>Login</button>
        </form>
            <button className="loginRegisterButton" type='submit'>
              <Link to="/register" style={{textDecoration: "none", color: "inherit"}}>
                Register
              </Link>
            </button>
    </div>
  )
}
