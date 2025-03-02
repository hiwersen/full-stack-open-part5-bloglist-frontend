import { useState } from 'react'
import PropTypes from 'prop-types'

const AuthForm = ({ type, auth }) => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleAuth = async event => {
        event.preventDefault()

        auth({ username, password, name })
    }

    const nameForm = () => {
        return (
            <div>
                <label htmlFor="name">Name:
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={name}
                        onChange={({ target: { value } }) => setName(value)}
                    />
                </label>
            </div>
        )
    }

    return (
        <>
            <h1>{ type === 'Sign Up' ? 'Signup' : 'Login' }</h1>
            <form onSubmit={handleAuth}>
                { type === 'Sign Up' && nameForm() }
                <div>
                    <label htmlFor="username">Username:
                        <input
                            id="username"
                            data-testid="username"
                            name="username"
                            type="text"
                            value={username}
                            onChange={({ target: { value } }) => setUsername(value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="password">Password:
                        <input
                            id="password"
                            data-testid="password"
                            name="password"
                            type="password"
                            value={password}
                            onChange={({ target: { value } }) => setPassword(value)}
                        />
                    </label>
                </div>
                <button type="submit">{ type }</button>
            </form>
        </>
    )
}

AuthForm.propTypes = {
    type: PropTypes.string.isRequired,
    auth: PropTypes.func.isRequired
}

export default AuthForm