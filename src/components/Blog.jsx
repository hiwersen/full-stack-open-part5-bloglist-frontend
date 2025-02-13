import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const style = {
    padding: 8,
    paddingTop: 16,
    border: 'solid 1px lightgray',
    borderRadius: 4,
    marginBottom: 12,
    minWidth: 320
  }

  const toggleView = () => (
    <input
      type="button"
      value={viewDetails ? 'hide' : 'view' }
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

  const deleteBtn = () => {
    const style = {
      display: blog.user.username === user.username ? '' : 'none',
      border: '0.5px solid lightGray',
      borderRadius: 4
    }

    return (
      <input
        style={style}
        type="button"
        value="Delete"
        onClick={() => deleteBlog(blog)}
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
        <div>{deleteBtn()}</div>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog