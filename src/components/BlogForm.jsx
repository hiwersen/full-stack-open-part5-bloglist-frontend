import { useState } from 'react'

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

    return (
        <div>
          <h3>Create New Blog</h3>
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
}

export default BlogForm