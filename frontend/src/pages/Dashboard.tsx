import { useEffect } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

// My components
import Nav from "../components/Nav"

export default function Dashboard() {
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is logged in
        if (!Cookies.get('jwt') || !Cookies.get('username')) {
            navigate("/")
        }
    }, [])

    return (
        <>
            <Nav />
            <h1>Dashboard</h1>
        </>
    )
}
