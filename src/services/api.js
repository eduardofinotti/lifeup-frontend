import axios from 'axios'

const api = axios.create({
    // baseURL: 'http://192.168.0.101:3030'
    baseURL: 'https://lifeup-backend.herokuapp.com/'
})

export default api