import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import '../styles/login.css'
import { nanoid } from '@reduxjs/toolkit'
import { addUser } from '../features/userAction'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitHandler = (user) => {
        try {
            user.uid = nanoid();
            user.isAdmin = false;
            user.cart = [];
            dispatch(addUser(user));

            toast.success("Registration successful!");
            setTimeout(() => navigate("/login"), 2000); // navigate after 2s
        } catch (err) {
            toast.error("Something went wrong during registration.");
        }
    }

    return (
        <div className='Login'>
            <div className="container">
                <h1>Register Here</h1>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <input
                        type="text"
                        placeholder='Enter Username'
                        {...register("username", {
                            required: "Username is required"
                        })}
                    />
                    {errors.username && <p className="error">{errors.username.message}</p>}

                    <input
                        type="email"
                        placeholder='Enter email'
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email"
                            }
                        })}
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}

                    <input
                        type="password"
                        placeholder='Enter Password'
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })}
                    />
                    {errors.password && <p className="error">{errors.password.message}</p>}

                    <button className='bg-blue-500' type='submit'>Submit</button>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    )
}

export default Register
