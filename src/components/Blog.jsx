const Blog = ({ blog }) => (
  <div>
    Title: {blog.title}{blog.author && `- Author: ${blog.author}`}
  </div>  
)

export default Blog