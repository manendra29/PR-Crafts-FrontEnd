import React from 'react'
import Footer from '../Layout/Footer';
import BrandDesc from '../BrandDesc/BrandDesc';
import BestsellerProducts from '../BestsellerProducts/BestsellerProducts';
import HomeReview from '../ReviewSection/HomeReview';
import ProductSlider from '../Sliders/ProductSlider';
import PriceCategoryCards from '../PriceCategoryCards/PriceCategoryCards';
import ImageSlider from '../Sliders/ImageSlider';
import Header from '../Layout/Header';
import "./Home.css";
import ShoppingCartComponent from '../MyCart/ShoppingCart';


const Home = () => {
    const craftImages = [
        {
          url: "/images/IMG_1432.jpg",
          alt: "Handmade Paper Flowers",
          title: "Beautiful Paper Flower Bouquets",
          description: "Delicate and long-lasting flowers crafted from specialty paper",
          button: {
            text: "Shop Now",
            action: () => window.location.href = '/shop/paper-flowers'
          }
        },
        {
          url: "/images/IMG_1431.jpg",
          alt: "Origami Art Collection",
          title: "Stunning Origami Art",
          description: "Traditional and modern origami creations for your home",
          button: {
            text: "View Collection",
            action: () => window.location.href = '/shop/origami'
          }
        },
        {
          url: "/images/IMG_1429.jpg",
          alt: "Quilled Paper Art",
          title: "Intricate Quilled Paper Designs",
          description: "Masterfully quilled paper art for unique decorative pieces",
          button: {
            text: "Explore Designs",
            action: () => window.location.href = '/shop/quilled-art'
          }
        },
        {
          url: "/images/IMG_1427.jpg",
          alt: "DIY Paper Craft Kits",
          title: "DIY Paper Craft Kits",
          description: "Create your own paper masterpieces with our premium craft kits",
          button: {
            text: "Get Started",
            action: () => window.location.href = '/shop/diy-kits'
          }
        }
      ];
      const tagLine1="Bestselling Masterpieces – Handcrafted with Love, Adored by All!";
      const tagLine2="Bring Harmony & Elegance Home with Pyramid Craft! 🏡✨";
      const tagLine3="🎉 Make Every Birthday Memorable with Our Beautiful Handcrafted Gifts!";
  return (
    <div>
    <div className="header-container">
    <Header />
    </div>
    <div>
    
    </div>
      <div>
        <ImageSlider images={craftImages} />
     <PriceCategoryCards />
     <ProductSlider />
     <BestsellerProducts productName={"DIY"} tagLine={tagLine1} tag={false} />
     <HomeReview />
     <BestsellerProducts productName={"DIY"} tagLine={tagLine2} tag={false} />
     <BestsellerProducts productName={"DIY"} tagLine={tagLine3} tag={false} />
     <BrandDesc />
     <Footer />
      </div>
     
    </div>
  )
}

export default Home
