import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import MainRoutes from '../mainroutes/MainRoutes'
import Navbar from '../components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <MainRoutes />
    <ToastContainer position="top-center" autoClose={2000} />
    </div>

    

  )
}

export default App
