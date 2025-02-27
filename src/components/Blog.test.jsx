import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'To be displayed',
        author: 'Anonymous',
        url: 'example.com',
        likes: 0
    }

    let container

    beforeEach(() => {
        container = render(<Blog blog={blog} />).container
        // screen.debug()
    })

    test('.content-main renders by default', () => {
        const main = container.querySelector('.content-main')
        // console.log('main content: ----------------', main)
        // screen.debug(main)
        expect(main).toHaveTextContent(`${blog.title}, ${blog.author}`)
    })

    test('.content-details do not render by default', () => {
        const details = container.querySelector('.content-details')
        // console.log('details content: -------------', details)
        // screen.debug(details)
        expect(details).toHaveStyle('display: none')
    })
})