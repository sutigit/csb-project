import { useEffect, useState } from 'react'
import '../styles.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

export default function Nav() {
  const [isLogged, setIsLogged] = useState<boolean>(false)

  const navigate = useNavigate()
  const location = useLocation()

  const UnLogged = () => (
    <nav>
      <button onClick={() => navigate("/signup")}>
        Create Account
      </button>
      <span>or</span>
      <button onClick={() => navigate("/login")}>
        Login
      </button>
    </nav>
  )

  const Logged = () => (
    <nav>
      <h3>
        Welcome, {Cookies.get('username')}
      </h3>
      { location.pathname !== "/" && <HomeButton />}
      <button className='my-blogs-button' onClick={() => navigate("/dashboard")}>
        My Blogs
      </button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </nav>
  )

  const HomeButton = () => (
    <button className='home-button' onClick={() => navigate("/")}>
      Home
    </button>
  )

  const handleLogout = () => {
    // Clear cookies
    Cookies.remove('jwt')
    Cookies.remove('username')
    // Redirect to home
    setIsLogged(false)
    navigate("/")
  }

  useEffect(() => {
    // Check if user is logged in
    if (Cookies.get('jwt') && Cookies.get('username')) {
      setIsLogged(true)
    }
  }, [isLogged])

  return (
    <nav>
      { (location.pathname !== "/login" && location.pathname !== "/signup") ? (isLogged ? <Logged /> : <UnLogged />) : <HomeButton /> }
    </nav>
  )
}
