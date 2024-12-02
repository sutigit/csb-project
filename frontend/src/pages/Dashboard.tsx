import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

// Definitions
import { Blog } from "../lib/definitions"

// My components
import Nav from "../components/Nav"
import BlogCard from "../components/BlogCard"

const backend_url = import.meta.env.VITE_BACKEND_URL

export default function Dashboard() {
    const [myBlogs, setMyBlogs] = useState([])
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    const getMyBlogs = async () => {
        try {
            const res_users = await fetch(`${backend_url}/users`)
            const users = await res_users.json()

            const user = users.find((user: any) => user.username === Cookies.get('username'))

            const res_blogs = await fetch(`${backend_url}/user/${user.id}/blogs`)
            const blogs = await res_blogs.json()
            setMyBlogs(blogs)
        }
        catch (err) {
            console.error(err)
            setIsError(true)
        }
    };

    useEffect(() => {
        // Check if user is logged in
        if (!Cookies.get('jwt') || !Cookies.get('username')) {
            navigate("/")
        } else {
            getMyBlogs()
        }
    }, [])

    return (
        <>
            <Nav />
            <h1>Dashboard</h1>
            <h2>Write new blog</h2>
            <form action="">
                <input type="text" name="title" placeholder="Blog title" />
                <textarea name="content" placeholder="Things I want to write about..." id="" rows={8}></textarea>
                <button className="create-blog-button" type="submit">Publish Blog</button>
            </form>
            <br />
            <h2>My Blogs</h2>
            <section className='blogs-section'>
                {isError && <p className='error-message'>Oops, something went wrong while trying to get your blogs...</p>}
                {
                    myBlogs.length > 0 ?
                        myBlogs.map((blog: Blog) => (
                            <div key={blog.id} style={{ marginBottom: '2rem' }}>
                                <BlogCard user_id={blog.user_id} title={blog.title} content={blog.content} />
                                <button className="delete-button">Delete</button>
                            </div>
                        ))
                        : <p>You don't have any blogs yet</p>
                }
            </section>
        </>
    )
}
