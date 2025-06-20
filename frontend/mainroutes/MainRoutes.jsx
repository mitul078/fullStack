import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom'
import Loading from '../mainroutes/Loading'

const Register = lazy(() => import("../pages/Register"))
const Home = lazy(() => import('../pages/Home'))
const Products = lazy(() => import('../pages/Products'))
const Login = lazy(() => import('../pages/Login'))
const Cart = lazy(() => import('../pages/Cart'))
const CreateProduct = lazy(() => import('../pages/CreateProduct'))
const Profile = lazy(() => import('../pages/Profile.jsx'))
const ProductDetail = lazy(() => import("../pages/ProductDetail.jsx"))

const MainRoutes = () => {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path={"/"} element={<Home />} />
                    <Route path={"/products"} element={<Products />} />
                    <Route path={"/products/:id"} element={
                        <Suspense fallback={<Loading />}>
                            <ProductDetail />
                        </Suspense>
                    }
                    />
                    <Route path={"/login"} element={<Login />} />
                    <Route path={"/register"} element={<Register />} />
                    <Route path={"/cart"} element={<Cart />} />
                    <Route path={"/profile"} element={<Profile />} />
                    <Route path={"/create-product"} element={<CreateProduct />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default MainRoutes
