import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const style = {
    padding: 12,
    border: 'solid 1px gray',
    borderRadius: 4,
    marginBottom: 8,
    maxWidth: 520,
    minWidth: 360
  }

  const toggleView = () => (
    <input 
    type="button" 
    value={viewDetails ? "hide" : "view" } 
    onClick={() => setViewDetails(!viewDetails)} 
    />
  )

  const likeBtn = () => {
    const likes = Number(blog.likes || 0)
    const id = blog.id

    return (
      <input 
      type="button" 
      value="Like" 
      onClick={() => updateBlog({ likes: likes + 1 }, id)} 
      />
    )
  }
  
  return (
    <div style={style}>
      <div>{blog.title}, {blog.author}&nbsp;{toggleView()}
      </div>
      <div style={{ display: viewDetails ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>Likes {blog.likes}&nbsp;{likeBtn()}</div>
        <div>{blog.user.name}</div>
      </div>
    </div>  
)}

export default Blog