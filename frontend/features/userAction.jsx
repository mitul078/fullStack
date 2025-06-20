
import axios from '../api/axiosConfig'
import { loadUser } from '../features/useSlice'
import { toast } from 'react-toastify'
export const addUser = (user) => async () => {
    try {
        await axios.post("/users", user)
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = (user , navigate) => async () => {
    try {
        const { data } = await axios.get(`/users?username=${user.username}&password=${user.password}`)

        const found = data[0]
        
        if (found) {
            localStorage.setItem("isLogin", true)
            localStorage.setItem("user", JSON.stringify(found))
            toast.success("Login successful ✅")
            navigate("/")
        }
        else {
            toast.error("Invalid username or password ❌")
        }

    } catch (error) {
        console.log(error)
    }
}
export const logoutUser = () => async () => {
    try {
        localStorage.removeItem("user")
        localStorage.removeItem("isLogin")
    } catch (error) {
        console.log(error)
    }
}
export const currentUser = () => async (dispatch) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if (user) dispatch(loadUser(user))
    } catch (error) {
        console.log(error)
    }
}

