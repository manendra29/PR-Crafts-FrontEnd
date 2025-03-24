import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ProductListingPage from '../ProductListingPage/ProductListingPage';
import axios from 'axios';


const UnderPrice = () => {
    const {price}=useParams();
    console.log(price);
    const [products, setProducts] = useState([]);
    const categoryName=price==499?"Under ₹499":price==999?"Under ₹999":"Under ₹1999";
    const tagLine="Shop for the best products under "+price;

    useEffect(()=>{
        const fetch = async() => {
            try {
             const response = await axios.get(`http://localhost:4000/api/v1/user/under/${price}`,{
                 withCredentials:true,
                 headers:{
                   "Content-Type":"application/json"
                 }
               }
             );
             setProducts(response.data.posts);
            } catch (error) {
             console.log(error);
            }
           };
           fetch();
    },[])

  return (
    <div>
  <ProductListingPage products={products} categoryName={categoryName} tagLine={tagLine} />
      
    </div>
  )
}

export default UnderPrice;
