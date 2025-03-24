import React, { useEffect, useState } from 'react'
import ProductListingPage from '../ProductListingPage/ProductListingPage';

const BestSeller = () => {
    const [bestsellerProducts, setBestsellerProducts] = useState([]);
    useEffect(()=>{
        const BestSellerFetch=async()=>{
            try {
              const response=await axios.get("http://localhost:4000/api/v1/user/bytag/BestSeller",{
              withCredentials:true,
              headers:{
                "Content-Type":"application/json"
              }
            });
            setBestsellerProducts(response.data.posts);
            } catch (error) {
              console.log(error);
            }
            
          }
          BestSellerFetch();
    })
  return (
    <div>
      <ProductListingPage products={bestsellerProducts} categoryName={"BestSeller"} tagLine={"Best Seller Products"} />
    </div>
  )
}

export default BestSeller
