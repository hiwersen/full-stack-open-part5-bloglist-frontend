import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/user'
import Notification from './components/Notification'
import AuthForm from './components/AuthForm'
import ToggleVisibility from './components/ToggleVisibility'
import BlogForm from './components/BlogForm'
import ToggleComponent from './components/ToggleComponent'

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

  const signup = async userToSignup => {

    try {
      const user = await userService.post(userToSignup)

      if (user) {
        login({ username: userToSignup.username, password: userToSignup.password })
      }

    } catch (error) {
      const message = error.response.data.error || error.message
      showMessage({ message, error: true })
    }
  }

  const login = async userToLogin => {

    try {
      const user = await loginService.login(userToLogin)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

    } catch (error) {
      const message = error.response.data.error || error.message
      showMessage({ message, error: true })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
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

  const flex = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const authStyle = {
    width: 328,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -75%)',
    transformOrigin: 'top',
  }

  return (
    <div>
      <Notification message={message} />
      { !user
        ? <section style={authStyle}>
          <ToggleComponent
            showLabel="Sign Up"
            hideLabel="Log In">
            <AuthForm key="login" type="Log In" auth={login} />
            <AuthForm key="signup" type="Sign Up" auth={signup} />
          </ToggleComponent>
        </section>
        : (
          <section style={flex}>
            <h1>Blogs</h1>
            <div style={{ fontSize: 14, width: '100%', textAlign: 'right', paddingRight: 8 }}>{user.name} logged-in
              <input
                style={{ fontSize: 14, marginLeft: 14, width: 82, padding: '2px 4px' }}
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
            <div style={{ width: '100%' }}>
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
          </section>
        )}
    </div>
  )
}

export default App