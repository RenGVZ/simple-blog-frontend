import React from "react"

interface BlogProps {
  title: string
  content: string
}

const Blog: React.FC<BlogProps> = ({ title, content }) => {
  return (
    <div className="p-4 border rounded-md shadow-md mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{content}</p>
    </div>
  )
}

export default Blog
