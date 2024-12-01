import { useEffect, useState } from 'react'
import '../styles.css'

interface Blog {
  user_id: number
  title: string
  content: string
}

export default function BlogCard({ user_id, title, content }: Blog) {

  const [owner, setOwner] = useState('')

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${user_id}`)
      .then(res => res.json())
      .then(data => setOwner(data.username))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="blog-card">
        <i>{owner}</i>
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
  )
}
