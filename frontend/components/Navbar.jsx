
import '../styles/navbar.css';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate("/login")
    }
    const isLogin = JSON.parse(localStorage.getItem("isLogin"))
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <>

            <ul className='mobile-view'>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/"}><i className="ri-home-6-fill"></i></NavLink>
                <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/products"}><i className="ri-list-indefinite"></i></NavLink>
                {
                    isLogin && <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/cart"}><i className="ri-shopping-cart-2-fill"></i></NavLink>
                }


                {
                    isLogin ? (
                        <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/profile"}><i className="ri-user-follow-line"></i></NavLink>
                    ) : (

                        <button onClick={navigateHandler}><i className="ri-user-line"></i></button>
                    )
                }
            </ul>
            <nav>
                <ul className='window-view'>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/"}>Home</NavLink>
                    <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/products"}>Products</NavLink>
                    {
                        isLogin && <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/cart"}>Cart</NavLink>
                    }


                    {
                        isLogin ? (
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/profile"}>Profile</NavLink>
                        ) : (

                            <button onClick={navigateHandler} className='bg-blue-500'>Login</button>
                        )
                    }
                    {
                        user && user.isAdmin && (
                            <NavLink className={({ isActive }) => (isActive ? "active" : "")} to={"/create-product"}>CreateProduct</NavLink>
                        )
                    }
                </ul>
            </nav>
        </>
    )
}

export default Navbar;
