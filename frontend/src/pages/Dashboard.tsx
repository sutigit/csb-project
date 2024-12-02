import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

// My components
import Nav from "../components/Nav"
import BlogCard from "../components/BlogCard"

const backend_url = import.meta.env.VITE_BACKEND_URL

export default function Dashboard() {
    const [myBlogs, setMyBlogs] = useState([])
    const [isError, setIsError] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is logged in
        if (!Cookies.get('jwt') || !Cookies.get('username')) {
            navigate("/")
        }

        // fetch blogs from the server
        fetch(`${backend_url}/blogs`)
            .then(res => res.json())
            .then(data => setMyBlogs(data))
            .catch(err => {
                console.error(err)
                setIsError(true)
            })

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
                        myBlogs.map((blog: any) => (
                            <div style={{ marginBottom: '2rem' }}>
                                <BlogCard key={blog.id} user_id={blog.user_id} title={blog.title} content={blog.content} />
                                <button className="delete-button">Delete</button>
                            </div>
                        ))
                        : <p>You don't have any blogs yet</p>
                }
            </section>
        </>
    )
}
