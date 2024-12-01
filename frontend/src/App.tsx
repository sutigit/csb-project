import './styles.css'

import { useState, useEffect } from 'react'

// My components
import Nav from './components/Nav'
import BlogCard from './components/BlogCard'

interface Blog {
  user_id: number
  title: string
  content: string
}

// Environment variables
const backend_url = import.meta.env.VITE_BACKEND_URL

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {

    // fetch blogs from the server
    fetch(`${backend_url}/blogs`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setBlogs(data)
      })
      .catch(err => console.error(err))
      
  }, [])

  return (
    <>
      <Nav />
      <main>
        <h1>Blogs</h1>
        <section className='blogs-section'>
          {blogs.map((blog: any) => (
            <BlogCard key={blog.id} user_id={blog.user_id} title={blog.title} content={blog.content} />
          ))}
        </section>
      </main>
    </>
  )
}

export default App
