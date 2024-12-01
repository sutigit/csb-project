import { useEffect, useState } from 'react'
import '../styles.css'
import { useNavigate, useLocation } from 'react-router-dom'

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
      <button>
        Logout
      </button>
    </nav>
  )

  const HomeButton = () => (
    <button onClick={() => navigate("/")}>
      Home
    </button>
  )

  return (
    <nav>
      { location.pathname !== "/" && <HomeButton />}
      { (location.pathname !== "/login" && location.pathname !== "/signup") && (isLogged ? <Logged /> : <UnLogged />)}
    </nav>
  )
}
