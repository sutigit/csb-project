import './styles.css'

import { useState } from 'react'

// My components
import BlogCard from './components/BlogCard'
import { useEffect } from 'react'

// Environment variables
const backend_url = import.meta.env.VITE_BACKEND_URL

function App() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // fetch data from the server
    fetch(`${backend_url}/blogs`)
      .then(res => res.json())
      .then(data => setBlogs(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <main>
      <h1>Blogs</h1>
      <section>
        {blogs.map((blog: any) => (
          <BlogCard key={blog.id} title={blog.title} content={blog.content} />
        ))}
      </section>
    </main>
  )
}

export default App
