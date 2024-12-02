import '../styles.css'

import { useState, useEffect } from 'react'

// My components
import BlogCard from '../components/BlogCard'
import Nav from '../components/Nav'

// Definitions
import { Blog } from '../lib/definitions'

// Environment variables
const backend_url = import.meta.env.VITE_BACKEND_URL

export default function Home() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [isError, setIsError] = useState(false)

    useEffect(() => {

        // fetch blogs from the server
        fetch(`${backend_url}/blogs`)
            .then(res => res.json())
            .then(data => setBlogs(data))
            .catch(err => {
                console.error(err)
                setIsError(true)
            })

    }, [])

    return (
        <>
            <Nav />
            <h1>Blogs</h1>
            <section className='blogs-section'>
                {isError && <p className='error-message'>Oops, something went wrong while trying to get beautiful blogs...</p>}
                {blogs.map((blog: any) => (
                    <BlogCard key={blog.id} user_id={blog.user_id} title={blog.title} content={blog.content} />
                ))}
            </section>
        </>
    )
}