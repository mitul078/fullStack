import axios from 'axios'

const instance = axios.create({
    baseURL: "https://backendserver-yakq.onrender.com/",
})

export default instance