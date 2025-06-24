import axios from 'axios'

const instance = axios.create({
    // baseURL: "https://backendserver-yakq.onrender.com/"
    baseURL:"http://localhost:3000"
})

export default instance