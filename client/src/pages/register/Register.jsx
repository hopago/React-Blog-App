import { useEffect, useState } from 'react';
import './register.css';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default function Register() {

  const [username,setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [err, setErr] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      setErr(false);
      const res = await axios.post("http://localhost:8000/api/auth/register", {
        username,
        email,
        password
      });
      res.data && window.location.replace("/login");
    } catch(err) {
      setErr(true);
    }



  };

  useEffect(() => {

    err && setTimeout(() => {
      setErr(false);
    }, 3000);

  }, [err])

  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Username</label>
            <input 
              type="text" 
              placeholder='Username' 
              className='registerInput' 
              onChange={e => setUsername(e.target.value)} 
            />
            <label>Email</label>
            <input 
              type="email" 
              placeholder='Email' 
              className='registerInput' 
              onChange={e => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input 
              type="password" 
              placeholder='PW' 
              className='registerInput'
              onChange={e => setPassword(e.target.value)}
            />
            <button className="registerButton" type='submit'>Register</button>
        </form>
            <button className="registerLoginButton">
              <Link to="/login" className='list'>
                Login
              </Link>
            </button>
            { err ? <span style={{marginTop: '10px', color: 'red'}}>Error!</span> : null }
    </div>
  )
}
