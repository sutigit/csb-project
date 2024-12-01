import '../styles.css';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Environment variables
const backend_url = import.meta.env.VITE_BACKEND_URL

export default function Login() {
  const [ isError, setIsError ] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: any) => {
    e.preventDefault();
    
    fetch(`${backend_url}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target[0].value,
        password: e.target[1].value
      })
    })
    .then(res => res.json())
    .then(data => {
      Cookies.set('jwt', data.token)
      navigate('/')
    })
    .catch(err => {
      console.error(err)
      setIsError(true)
    })
  }

  return (
    <>
      <form onSubmit={handleLogin}>
        { isError &&  <span className='error-message'>Error logging you in</span>}
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </>
  )
}
