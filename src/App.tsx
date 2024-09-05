import React, { useState, useEffect } from "react"
import "./App.css"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import axios from "axios"

interface BlogPost {
  id: number
  title: string
  content: string
}

const App: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/blogs")
      setBlogs(response.data)
    } catch (error) {
      console.error("Error fetching blogs:", error)
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">My Blog</h1>
      <BlogForm refreshBlogs={fetchBlogs} />
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">All Blog Posts</h2>
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <Blog key={blog.id} title={blog.title} content={blog.content} />
          ))
        ) : (
          <p>No blog posts available.</p>
        )}
      </div>
    </div>
  )
}
export default App
