import axios from 'axios'
import { env } from '../const'

const apiTimeout = env !== 'prod' ? 8000 : 5000

const axiosInstance = axios.create({
  timeout: apiTimeout,
  method: 'get',
})

export default axiosInstance
