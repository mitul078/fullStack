import axios from '../api/axiosConfig';
import React, { useEffect } from 'react'
import {  useParams } from 'react-router-dom'
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { loadCart } from '../features/cartSlice';
import '../styles/productDetail.css'
import { toast } from 'react-toastify';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setproduct] = useState("")
    const [bg, setbg] = useState(product.productImageURL?.[0])
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [activeTab, setActiveTab] = useState("description");
    const [quantity, setQuantity] = useState(1)
    const user = JSON.parse(localStorage.getItem("user"))


    const add = () => {
        setQuantity(prev => prev + 1)
    }
    const sub = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1))
    }
    const price = Number(product.productPrice)
    const total = quantity * price
    useEffect(() => {

        const getProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`)
                setproduct(data);
                setbg(data.productImageURL?.[0]);
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [id])


    const dispatch = useDispatch();
    const addToCart = async (product) => {
        const result = await dispatch(loadCart(product))
        const isHave = (user.cart || []).some(item => item.id === product.id)

        if (isHave) {
            toast.error("Already in Cart!", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }
        else {
            const productQuantity = {
                ...result.payload,
                quantity: quantity,
                totalPrice: total
            }
            const updatedCart = [...(user.cart || []), productQuantity];
            const updatedUser = {
                ...user,
                cart: updatedCart
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
            await axios.patch(`/users/${user.id}`, {
                cart: updatedCart
            });
            toast.success("Added to Cart!", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    }

    return (

        <div className='ProductDetail'>
            <div className="product-container">
                <div className="left">
                    <div className="image">
                        <img src={bg} loading='lazy' alt="" />
                    </div>
                    <div className="boxes">
                        {
                            product.productImageURL?.map((img, i) => (
                                <div key={i} onClick={() => setbg(img)} className="box">
                                    <img loading='lazy' src={img} alt="" />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="right">
                    <p className='head'>New Collection</p>
                    <h1 className='name'>{product.productName}</h1>
                    <div className="rating">
                        {
                            [1, 2, 3, 4, 5].map((value) => (
                                <i key={value}
                                    className={
                                        (hover || rating) >= value ? 'ri-star-fill' : 'ri-star-line'
                                    }
                                    style={{
                                        color: 'tomato',
                                        fontSize: '24px',
                                        cursor: 'pointer',
                                        marginRight: '4px',
                                    }}
                                    onClick={() => setRating(value)}
                                    onMouseEnter={() => setHover(value)}
                                    onMouseLeave={() => setHover(null)}

                                ></i>
                            ))
                        }
                        <span style={{ marginLeft: '10px', fontSize: '14px' }}>
                            {rating} / 5
                        </span>

                        <h3 className='price'>Price</h3>
                        <h2 className='p'>${product.productPrice}</h2>
                        <div className="quantity flex gap-2">
                            <button
                                className='bg-blue-500'>Quantity: {quantity}
                            </button>
                            <button
                                onClick={() => add()}
                                className=' bg-blue-500'>+</button>
                            <button
                                onClick={() => sub()}
                                className=' bg-blue-500'>-</button>
                        </div>
                        <div className="detail-info flex flex-col  text-2xl ">
                            <div className="tab-buttons flex">
                                <h1
                                    className={`w-1/2 text-center ${activeTab === "description" ? "active" : ""}`}
                                    onClick={() => setActiveTab("description")}
                                >
                                    Description:
                                </h1>
                                <h1
                                    className={`w-1/2 text-center ${activeTab === "details" ? "active" : ""}`}
                                    onClick={() => setActiveTab("details")}
                                >
                                    Details:
                                </h1>
                            </div>

                            {activeTab === "description" ? (
                                <div className="description">
                                    <p>{product.productDescription}</p>
                                </div>
                            ) : (
                                <div className="detail">
                                    <div className="subDetail">
                                        <div className="detail-left">
                                            <p>Size: {product.productSize || "N/A"}</p>
                                            
                                            <p>Materials: {product.productMaterial  || "N/A"}</p>
                                            <p>Weight: {product.productWeight  || "N/A"}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="footer">
                            <h1>Total Price <br /> ${total}</h1>

                            <button onClick={() => addToCart(product)} className='bg-blue-500'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductDetail
