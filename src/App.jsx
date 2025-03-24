import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Home from './Components/Pages/Home';
import ReviewSection from './Components/ProductPage/ReviewSection';
import ProductListingPage from './Components/ProductListingPage/ProductListingPage';
import AboutMe from './Components/AboutMe/AboutMe';
import AdminDashboard from './Components/Admin/AdminDashboard';
import ShoppingCart from './Components/MyCart/ShoppingCart';
import CategoryProductsPage from './Components/ProductListingPage/ProductListingPage';
import UnderPrice from './Components/Pages/UnderPrice';
import CategoryProduct from './Components/Pages/CategoryProduct';
import BestSeller from './Components/Pages/BestSeller';
import ProductPage from './Components/ProductPage/ProductPage';
import Mannu from './Mannu';
import PRCraftsRefined from './Components/Pages/PRCraftsRefined';
// import Login from "./componenets/Auth/login"
// import Register from "./componenets/Auth/Register"


function App() {
 
  return (
    <>
     
        <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/" element={<CategoryPage />} /> */}
            <Route path="/product/:id" element={<ProductPage />} /> 
            {/* <Route path="/" element={<ReviewSection />} />  */}
            <Route path="/undershop/:price" element={<UnderPrice />} />
            <Route path="/category/:name" element={<CategoryProduct />} /> 
            <Route path="/aboutme" element={<AboutMe />} /> 
            <Route path="/admindashboard" element={<AdminDashboard />} /> 
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/bestseller" element={<BestSeller />} />
            <Route path="/mychannel" element={<PRCraftsRefined />} /> 

         
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
