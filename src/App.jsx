import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import ToggleVisibility from './components/ToggleVisibility'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const toggleBlogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

      const message = `User ${user.name} logged in`
      showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response.data.error || error.message
      showMessage({ message, error: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)

    const message = `User ${user.name} logged out`
    showMessage({ message: message, error: false })
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <Notification message={message} />
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Username:&nbsp;
            <input
              id="username"
              name="username"
              type="text"
              value={username}
              onChange={({ target: { value } }) => setUsername(value)}
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">Password:&nbsp;
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )

  const createBlog = async blogToCreate => {

    try {
      const blog = await blogService.create(blogToCreate)
      setBlogs(blogs.concat(blog))
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
      setBlogs(blogs.map(b => b.id === blog.id ? blog : b))

      const message = `"${blog.title}" has been updated`
      showMessage({ message: message, error: false })
      
    } catch (error) {
      const message = error.response?.data?.error || 'error updating blog'
      showMessage({ message, error: true })
      console.error(error.message)
    }
  }

  const blogForm = () => (
    <ToggleVisibility 
    showLabel="Create New Blog" 
    hideLabel="Cancel"
    ref={toggleBlogFormRef}>
      <BlogForm createBlog={createBlog} />
    </ ToggleVisibility>
  )

  return (
    <>
      { !user
        ? loginForm()
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
            {blogForm()}
            <br />
            <div>
              {blogs.map(blog =>
                <Blog 
                key={blog.id} 
                blog={blog} 
                updateBlog={updateBlog} 
                />
              )}
            </div>
          </div>
      )}
    </>
  )
}

export default App