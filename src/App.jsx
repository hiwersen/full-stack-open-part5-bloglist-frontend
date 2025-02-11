import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      setUser(JSON.parse(user))
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

  const handleCreateBlog = async event => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')

      const message = `a new blog ${blog.title} by ${blog.author} added`
      showMessage({ message: message, error: false })

    } catch (error) {
      const message = error.response.data.error || error.message
      showMessage({ message, error: true })
    }
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
              type="text"
              value={password}
              onChange={({ target: { value } }) => setPassword(value)}
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  )

  const createBlogForm = () => (
    <div>
      <h3>Create New</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          <label htmlFor="title">Title:&nbsp;
            <input
              id="title"
              name="title"
              type="text"
              value={title}
              onChange={({ target: { value } }) => setTitle(value)}
            />
          </label>
        </div>
        <div>
        <label htmlFor="author">Author:&nbsp;
            <input
              id="author"
              name="author"
              type="text"
              value={author}
              onChange={({ target: { value } }) => setAuthor(value)}
            />
          </label>
        </div>
        <div>
        <label htmlFor="url">Url:&nbsp;
            <input
              id="url"
              name="url"
              type="text"
              value={url}
              onChange={({ target: { value } }) => setUrl(value)}
            />
          </label>
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
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
            {createBlogForm()}
            <br />
            <div>
              {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
          </div>
      )}
    </>
  )
}

export default App