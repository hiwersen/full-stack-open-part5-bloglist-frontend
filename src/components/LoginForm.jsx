import { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const LoginForm = ({ message, login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async event => {
    event.preventDefault()

    login({ username, password })
  }

  return (
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
}

LoginForm.propTypes = {
  message: PropTypes.any,
  login: PropTypes.func.isRequired
}

export default LoginForm