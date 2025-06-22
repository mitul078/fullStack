import React from 'react'
import '../styles/cart.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from '../api/axiosConfig'
import Loading from '../mainroutes/Loading'
const Cart = () => {
    const [cart, setcart] = useState([])
    const [load, setloading] = useState(true)
    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        const fetchCart = async () => {
            setloading(true);
            try {
                const { data } = await axios.get(`/users/${user.id}`);
                setcart(data.cart || []);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            } finally {
                setloading(false);
            }
        };
        fetchCart();
    }, []);
    const removeCartItem = async (id) => {
        const newCart = cart.filter((product) => product.id !== id)
        user.cart = newCart;
        localStorage.setItem("user", JSON.stringify(user))
        setcart(newCart)
        await axios.patch(`/users/${user.id}`, {
            cart: newCart
        })
    }
    const subtotal = cart.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);
    const discount = subtotal * 0.1;
    const platformFee = 50;
    const total = subtotal - discount + platformFee;
    if(load) return <Loading/>
    if (cart.length <= 0) {
        return <div className='text-4xl mt-2 capitalize text-center text-blue-400 w-full'>cart is empty</div>
    }


    return (
        <div className='Cart'>
            <div className="boxes">
                <div className="wrapper">
                    <button >Continue</button>
                </div>
                {
                    cart.map((product, i) => (
                        <div key={i} className="box">
                            <img src={product.productImageURL[0]} alt="" />
                            <div className="info">
                                <h1>{product.productName}</h1>
                                <p>{product.productDescription}</p>
                                <h3>Quantity: {product.quantity}</h3>
                                <h2>total Price: {product.totalPrice}</h2>
                                <button onClick={() => removeCartItem(product.id)}>Remove</button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="total">
                <div className="box layer1">
                    <h1>Price Detail</h1>
                </div>
                <div className="box">
                    <h1>Price({cart.length})</h1>
                    <p>{subtotal}</p>
                </div>
                <div className="box">
                    <h1>Discount (10%)</h1>
                    <p>-${discount}</p>
                </div>
                <div className="box">
                    <h1>Platform Fee</h1>
                    <p>{platformFee}</p>
                </div>
                <hr />
                <div className="box">
                    <h1>Total Amount</h1>
                    <p>${total}</p>
                </div>
            </div>
        </div>
    )
}

export default Cart
