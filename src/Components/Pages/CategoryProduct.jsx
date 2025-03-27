import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductListingPage from '../ProductListingPage/ProductListingPage';

const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const {name}=useParams();
    useEffect(()=>{
        const fetch=async(req,res,next)=>{
            try {
                const response=await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/post/category/${name}`,{
                withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            });
            setProducts(response.data.posts);
            
            } catch (error) {
                console.log(error);
            }
        }
        fetch();
    },[])
  return (
    <div>
      <ProductListingPage tagLine={"Your Vision , Our Mission"} categoryName={name} products={products}/>
    </div>
  )
}

export default CategoryProduct
