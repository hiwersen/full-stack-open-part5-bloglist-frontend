import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = event => {
        event.preventDefault()

        createBlog({ title, author, url })
        reset()
    }

    const reset = () => {
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const style = {
        width: '100%',
        marginBottom: 8,
        padding: '2px 4px',
        textAlign: 'center'
    }

    return (
        <div>
            <h2 style={style}>Create New Blog</h2>
            <form onSubmit={handleCreateBlog}>
                <div>
                    <label htmlFor="title">Title:
                        <input
                            id="title"
                            data-testid="title"
                            name="title"
                            type="text"
                            value={title}
                            onChange={({ target: { value } }) => setTitle(value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="author">Author:
                        <input
                            id="author"
                            data-testid="author"
                            name="author"
                            type="text"
                            value={author}
                            onChange={({ target: { value } }) => setAuthor(value)}
                        />
                    </label>
                </div>
                <div>
                    <label htmlFor="url">Url:
                        <input
                            id="url"
                            data-testid="url"
                            name="url"
                            type="text"
                            value={url}
                            onChange={({ target: { value } }) => setUrl(value)}
                        />
                    </label>
                </div>
                <button type="submit" >Create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm