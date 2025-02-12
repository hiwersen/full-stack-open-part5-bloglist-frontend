import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = t => {
  token = t ? `Bearer ${t}` : null
}

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async blog => {
  const config = { headers: { Authorization: token } }
  const { data } = await axios.post(baseUrl, blog, config)
  return data
}

export default { setToken, getAll, create }