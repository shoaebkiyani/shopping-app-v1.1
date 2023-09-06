import axios from 'axios'

export default axios.create({
  baseURL: process.env.NODE_ENV === 'production'
  ? import.meta.env.VITE_API_URL : import.meta.env.VITE_API_LOCAL_URL
})