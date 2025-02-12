import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const style = {
    padding: 12,
    border: 'solid 1px gray',
    marginBottom: 8
  }

  const toggleView = () => (
    <input 
    type="button" 
    value={viewDetails ? "hide" : "view" } 
    onClick={() => setViewDetails(!viewDetails)} 
    />
  )

  const like = () => (
    <input 
    type="button" 
    value="Like" 
    onClick={() => console.log('Liked!')} 
    />
  )
  
  return (
    <div style={style}>
      <div>{blog.title}&nbsp;{toggleView()}
      </div>
      <div style={{ display: viewDetails ? '' : 'none' }}>
        <div>{blog.url}</div>
        <div>Likes {blog.likes}&nbsp;{like()}</div>
        <div>{blog.author}</div>
      </div>
    </div>  
)}

export default Blog