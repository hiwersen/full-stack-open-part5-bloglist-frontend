import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [viewDetails, setViewDetails] = useState(false)

  const style = {
    backgroundColor: '#ffffff8b',
    padding: '24px 14px 12px',
    border: 'solid 0.5px lightgray',
    borderRadius: 4,
    marginBottom: 12,
    boxShadow: '0 8px 12px #d1d1d1'
  }

  const flex = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const toggleViewBtn = () => (
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
      display: blog.user?.username === user?.username ? '' : 'none',
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
    <div style={style} className="blog">
      <div style={{ ...flex, fontSize: 18 }}><span>{blog.title}, {blog.author}</span>{toggleViewBtn()}
      </div>
      <div style={{ display: viewDetails ? '' : 'none', fontSize: 14 }}>
        <div><a href='#' target='_blank'>{blog.url}</a></div>
        <div style={flex}>Likes {blog.likes}&nbsp;{likeBtn()}</div>
        <div>{blog.user?.name}</div>
        <div style={{ textAlign: 'right' }}>{deleteBtn()}</div>
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