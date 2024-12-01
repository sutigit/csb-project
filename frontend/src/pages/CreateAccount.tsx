import { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const backend_url = import.meta.env.VITE_BACKEND_URL

// My components
import Nav from '../components/Nav'

export default function CreateAccount() {
  const [isError, setIsError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e: any) => {
    e.preventDefault();

    if (e.target[1].value !== e.target[2].value) {
      setIsPasswordError(true)
      return
    }

    fetch(`${backend_url}/users`, {
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
        Cookies.set('username', data.username)
        navigate('/')
      })
      .catch(err => {
        console.error(err)
        setIsError(true)
      })
  }

  return (
    <>
      <Nav />
      <form onSubmit={handleSignup}>
        {isError && <span className='error-message'>Error creating account</span>}
        {isPasswordError && <span className='error-message'>Passwords mismatch</span>}
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm Password" />
        <button type="submit">Create Account</button>
      </form>
    </>
  )
}
