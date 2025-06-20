import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/useSlice.jsx'
import productReducer from '../features/productSlice.jsx'
import cartReducer from '../features/cartSlice.jsx'
export const store = configureStore({
    reducer: {
        user: userReducer,
        products: productReducer,
        cart: cartReducer,
    },
})