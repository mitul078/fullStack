import React from 'react'
import "../styles/login.css"
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../features/userAction'
const Login = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate("/register")
    }
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const submitHandler = (user) => {
        dispatch(loginUser(user, navigate))
    }

    return (
        <div className='Login'>
            <div className="container">
                <h1>Login Here</h1>
                <form onSubmit={handleSubmit(submitHandler)} >
                    <input
                        required
                        type="text"
                        placeholder='Enter Username'
                        name="username"
                        {...register("username")}
                    />
                    <input
                        required
                        type="password"
                        placeholder='Enter Password'
                        name="password"
                        {...register("password")}
                    />

                    <p >Don't have an account <span onClick={navigateHandler}>register</span></p>
                    <button className='bg-blue-500' type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
