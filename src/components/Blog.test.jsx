import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'To be displayed',
        author: 'Anonymous',
        url: 'example.com',
        likes: 15
    }

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} />).container
        // screen.debug()
    })

    test('.content-main renders by default', () => {
        const main = container.querySelector('.content-main')
        expect(main).toHaveTextContent(`${blog.title}, ${blog.author}`)
    })

    test('.content-details are not displayed by default', () => {
        const details = container.querySelector('.content-details')
        expect(details).not.toBeVisible()
    })

    test('.content-details are displayed after clicking "view" btn', async () => {
        const user = userEvent.setup()
        const viewBtn = screen.getByText('view')
        await user.click(viewBtn)

        const details = container.querySelector('.content-details')
        expect(details).toBeVisible()
        expect(details).toHaveTextContent(blog.url)
        expect(details).toHaveTextContent(blog.likes.toString())
    })
})