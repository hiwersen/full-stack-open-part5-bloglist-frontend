import axios from 'axios'
const baseUrl = '/api/users'

const post = async credentials => {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { post }