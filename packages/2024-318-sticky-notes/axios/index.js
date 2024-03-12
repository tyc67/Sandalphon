import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 3000,
  method: 'get',
})

export default axiosInstance
