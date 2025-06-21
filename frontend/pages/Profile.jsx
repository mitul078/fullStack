import React, { useEffect } from 'react'
import '../styles/profile.css'
import { useState } from 'react'
import axios from '../api/axiosConfig'
import { logoutUser } from '../features/userAction'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const Profile = () => {

    const [showEdit, setShowEdit] = useState(false)
    const [data, setdata] = useState({
        address: "",
        mobile: "",
        name: ""
    })
    const user = JSON.parse(localStorage.getItem("user"))
    useEffect(() => {
        if (user) {
            setdata({
                mobile: user?.mobile || "",
                address: user?.address || "",
                name: user?.name || ""
            })
        }
    }, [])

    const aysncData = async () => {
        try {
            const newUser = { ...user, mobile: data.mobile, address: data.address, name: data.name }
            await axios.patch(`/users/${user.id}`, {
                mobile: data.mobile, address: data.address, name: data.name
            })
            localStorage.setItem("user", JSON.stringify(newUser))
            setShowEdit(false)
        } catch (error) {
            console.log(error)
        }
    }
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logOutHandler = () => {
        dispatch(logoutUser())
        navigate("/login")
    }
    const editHandler = () => {
        setShowEdit(!showEdit)
    }
    return (
        <div className='Profile'>
            <h1 className='header'>Profile</h1>
            <div className="container">
                <div className="left">
                    <div className="image">
                        <img src="https://i.pinimg.com/736x/03/eb/d6/03ebd625cc0b9d636256ecc44c0ea324.jpg" alt="" />
                    </div>
                    <div className="name">
                        {showEdit ? (
                            <input type="name"
                                value={data.name}
                                placeholder='Enter Name Here'
                                onChange={(e) => setdata({ ...data, name: e.target.value })}
                            />
                        ) : (
                            <h1>{data.name || "Not set yet"}</h1>
                        )}
                    </div>
                </div>
                <div className="right">
                    <div className="box username bg-zinc-200">
                        <h1>Username:</h1>
                        <p>{user.username}</p>
                    </div>
                    <div className="box email bg-zinc-200">
                        <h1>Email:</h1>
                        <p>{user.email}</p>
                    </div>
                    <div className="box mobile bg-zinc-200">
                        <h1>Mobile-no:</h1>
                        {showEdit ? (
                            <input
                                type='text'
                                inputMode='numeric'
                                pattern='[0-9]*'
                                maxLength={10}
                                value={data.mobile}
                                placeholder='Enter New Number here'
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, ''); // 
                                    if (value.length <= 10) {
                                        setdata({ ...data, mobile: value });
                                    }
                                }}
                            />
                        ) : (
                            <p>{data.mobile || "Not Set Yet"} </p>
                        )}
                    </div>
                    <div className="box address bg-zinc-200">
                        <h1>Address:</h1>
                        {showEdit ? (
                            <input
                                type='text'
                                placeholder='Enter Address here'
                                value={data.address}
                                onChange={(e) => setdata({ ...data, address: e.target.value })}
                            />
                        ) : (
                            <p>{data.address || "Not Set Yet"} </p>
                        )}
                    </div>
                    <div className="btn">
                        <button className='bg-blue-500' onClick={showEdit ? aysncData : editHandler}>{showEdit ? "Save" : "Edit"}</button>
                        <button onClick={logOutHandler} className='bg-red-500'>Logout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
