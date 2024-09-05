import React, { useState } from "react"
import axios from "axios"

interface BlogFormProps {
  refreshBlogs: () => void
}

const BlogForm: React.FC<BlogFormProps> = ({ refreshBlogs }) => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:8000/api/blogs", {
        title,
        content,
      })

      if (response.status === 201) {
        setMessage("Blog post created successfully!")
        setTitle("")
        setContent("")
      }
      refreshBlogs() // Refresh the blog list
    } catch (error) {
      console.error(error)
      setMessage("An error occurred while creating the blog post.")
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Blog Post</h2>
      {message && (
        <div
          className={`mb-4 p-2 text-sm ${
            message.includes("successfully")
              ? "text-green-700 bg-green-100"
              : "text-red-700 bg-red-100"
          } rounded`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2"
            htmlFor="content"
          >
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            rows={5}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm
