import React, { useEffect, useState } from 'react'
import '../styles/product.css'
import axios from '../api/axiosConfig'
import { useNavigate } from 'react-router-dom'
import Loading from '../mainroutes/Loading'
import InfiniteScroll from 'react-infinite-scroll-component';
import {motion} from 'motion/react'
const Products = () => {
    const [products, setProduct] = useState([])

    const [visibleProducts, setVisibleProducts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const ITEMS_PER_LOAD = 3;
    const fetchMoreData = () => {
        const currentLength = visibleProducts.length;
        const nextProducts = products.slice(currentLength, currentLength + ITEMS_PER_LOAD);

        if (nextProducts.length === 0) {
            setHasMore(false);
            return;
        }

        setVisibleProducts(prev => [...prev, ...nextProducts]);
    };


    useEffect(() => {
        const getProduct = async () => {
            try {
                const { data } = await axios.get("/products")
                setProduct(data)
                setVisibleProducts(products.slice(0, ITEMS_PER_LOAD));
            } catch (error) {
                console.log(error)
            }
        }
        getProduct()
    }, [])

    const isLogin = localStorage.getItem("isLogin")


    const navigate = useNavigate();
    const navigateHandler = (id) => {
        navigate(`/products/${id}`)
    }
    const loginHandler = () => {
        navigate("/login")
    }

    const getShortDescription = (desc) => {
        return desc.split(" ").slice(0, 15).join(" ") + "...";
    };

    const [likedProducts, setLikedProducts] = useState([]);
    const toggleLike = (id) => {
        setLikedProducts((prev) =>
            prev.includes(id)
                ? prev.filter(pid => pid !== id)
                : [...prev, id]
        );
    };


    if (products.length == 0) return <Loading />
    return (
        <div className='Product'>
            <section className='category' >
                <h1>Category:</h1>
                <div className="category-box">
                    <div className="box">Category 1</div>
                    <div className="box">Category 2</div>
                    <div className="box">Category 3</div>
                    <div className="box">Category 4</div>
                </div>
            </section>
            <section className='products' >
                <div className="header">
                    <h1>Explore Products:</h1>
                </div>
                <InfiniteScroll
                    dataLength={visibleProducts.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<Loading />}

                >
                    <div className="product-container  ">
                        {
                            visibleProducts.map((product) => (
                                <motion.div key={product.id} 
                                    transition={{
                                        duration:.5
                                    }}
                                    whileHover={{
                                        scale:.96
                                    }}
                                className="box">
                                    <motion.img 
                                    src={product.productImageURL?.[0]} alt={product.productName} />
                                    <h1>{product.productName}</h1>
                                    <h2>${product.productPrice}</h2>
                                    <h3>{getShortDescription(product.productDescription)}</h3>

                                    {
                                        isLogin ? (
                                            <button onClick={() => navigateHandler(product.id)} className='bg-blue-500'>See more</button>
                                        ) : (
                                            <button onClick={loginHandler} className='bg-blue-500'>Login To See Detail</button>
                                        )
                                    }

                                    <div onClick={() => toggleLike(product.id)} className="like">
                                        {likedProducts.includes(product.id)
                                            ? <i className="ri-heart-fill"></i>
                                            : <i className="ri-heart-3-line"></i>}
                                    </div>
                                </motion.div>
                            ))
                        }
                    </div>
                </InfiniteScroll>
            </section>
        </div>
    )
}

export default Products
