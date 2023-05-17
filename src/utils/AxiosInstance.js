import axios from 'axios'

const AxiosInstance = axios.create({
  baseURL: 'https://dashapi.abnourgroup.com/api/'
})

export default AxiosInstance
