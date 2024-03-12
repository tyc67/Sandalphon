import axios from 'axios'
import { env } from '../const'

const apiTimeout = env !== 'prod' ? 5000 : 3000

const axiosInstance = axios.create({
  timeout: apiTimeout,
  method: 'get',
})

export default axiosInstance
