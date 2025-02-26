import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import ToggleVisibility from './components/ToggleVisibility'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)

  const toggleBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    })
  }, [])

  useEffect(() => {
    let user = window.localStorage.getItem('user')
    if (user) {
      user = JSON.parse(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = message => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const login = async userToLogin => {

    try {
      const user = await loginService.login(userToLogin)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      // const message = `User ${user.name} logged in`
      // showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response.data.error || error.message
      showMessage({ message, error: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)

    // const message = `User ${user.name} logged out`
    // showMessage({ message: message, error: false })
  }

  const createBlog = async blogToCreate => {

    try {
      const blog = await blogService.create(blogToCreate)
      setBlogs(blogs.concat(blog).sort((a, b) => b.likes - a.likes))
      toggleBlogFormRef.current.toggleVisibility()

      const message = `a new blog "${blog.title}" by ${blog.author} added`
      showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response?.data?.error || 'error creating new blog'
      showMessage({ message, error: true })
      console.error(error.message)
    }
  }

  const updateBlog = async (blogToUpdate, id) => {

    try {
      const blog = await blogService.update(blogToUpdate, id)
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b).sort((a, b) => b.likes - a.likes))

      const message = `"${blog.title}" has been updated`
      showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response?.data?.error || 'error updating blog'
      showMessage({ message, error: true })
      console.error(error.message)
    }
  }

  const deleteBlog = async blog => {
    const ok = window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)
    if (!ok) return

    try {
      const response = await blogService.delete(blog.id)

      if (response.status !== 204) {
        const message = `failed to delete blog: "${blog.title}"`
        showMessage({ message, error: true })
        return
      }

      setBlogs(blogs.filter(b => b.id !== blog.id).sort((a, b) => b.likes - a.likes))

      const message = `blog "${blog.title}" has been deleted`
      showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response?.data?.error || `error deleting blog: "${blog.title}"`
      showMessage({ message, error: true })
      console.error(error.message)
    }
  }

  return (
    <>
      { !user
        ? <LoginForm message={message} login={login} />
        : (
          <div>
            <h2>Blogs</h2>
            <Notification message={message} />
            <div>{user.name} logged-in&nbsp;
              <input
                type="button"
                value="Log out"
                onClick={handleLogout}
              />
            </div>
            <ToggleVisibility
              showLabel="Create New Blog"
              hideLabel="Cancel"
              ref={toggleBlogFormRef}>
              <BlogForm createBlog={createBlog} />
            </ ToggleVisibility>
            <br />
            <div>
              {blogs.map(blog =>
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                  user={user}
                />
              )}
            </div>
          </div>
        )}
    </>
  )
}

export default App