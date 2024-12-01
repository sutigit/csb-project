import '../styles.css'

export default function BlogCard({ title, content }: { title: string, content: string }) {
  return (
    <div className="blog-card">
        <h2>{title}</h2>
        <p>{content}</p>
    </div>
  )
}
