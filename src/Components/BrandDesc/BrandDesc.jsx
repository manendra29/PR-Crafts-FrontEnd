// import React from "react";
// import "./BrandDesc.css";
// import { Container, Typography } from "@mui/material";

// const logos = [
//     { id: 1, img: "/images/happyCustomer.webp", text: "Happy Customers" },
//     { id: 2, img: "/images/happyCustomer.webp", text: "Follow us on Instagram" },
//   { id: 3, img: "/images/happyCustomer.webp", text: "Made in India" },
//   { id: 4, img: "/images/happyCustomer.webp", text: "Eco-Friendly Craft" },
//   { id: 5, img: "/images/happyCustomer.webp", text: "100% Handmade" },
//   { id: 6, img: "/images/happyCustomer.webp", text: "Fast Delivery" }
// ];

// const BrandDesc = () => {
//   return (
//     <Container className="brand-logos-container">
//    <svg className="decorative-svg" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
//           <path d="M10 7.5 L20 3 L30 7.5 L40 3 L50 7.5 L60 3 L70 7.5 L80 3 L90 7.5" 
//                 fill="none" stroke="#D7B377" strokeWidth="1" strokeLinecap="round" />
//         </svg>
//       <Typography variant="h4" className="title">
//  ✨Our Promise to You
//       </Typography>
//       <svg className="decorative-svg" viewBox="0 0 100 15" xmlns="http://www.w3.org/2000/svg">
//           <path d="M10 7.5 L20 12 L30 7.5 L40 12 L50 7.5 L60 12 L70 7.5 L80 12 L90 7.5" 
//                 fill="none" stroke="#D7B377" strokeWidth="1" strokeLinecap="round" />
//         </svg>
//       <div className="logos-grid">
//         {logos.map((logo) => (
//           <div key={logo.id} className="logo-card">
//             <img src={logo.img} alt={logo.text} className="logo-image" />
//             <br />
//            {logo.id ==1 && "1000+" } 
//             <Typography className="logo-text" >{logo.text}</Typography>
//             {logo.id !=1 && <br /> } 
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default BrandDesc;


























import React from "react";
import "./BrandDesc.css";
import { Container, Typography } from "@mui/material";

const logos = [
  { id: 1, img: "/images/happy.jpg", text: "Happy Customers", prefix: "1000+" },
  { id: 2, img: "/images/insta.jpg", text: "Follow us on Instagram" },
  { id: 3, img: "/images/madeInIndia.jpg", text: "Made in India" },
  { id: 4, img: "/images/eco.jpg", text: "Eco-Friendly Craft" },
  { id: 5, img: "/images/handmade.jpg", text: "100% Handmade" },
  { id: 6, img: "/images/delivery.jpg", text: "Fast Delivery" }
];

const BrandDesc = () => {
  return (
    <Container className="brand-promise-container">
      <div className="promise-header">
        <div className="decorative-line left"></div>
        <Typography variant="h5" className="promise-title">
          Our Promise to You
        </Typography>
        <div className="decorative-line right"></div>
      </div>
      
      <div className="promise-grid">
        {logos.map((logo) => (
          <div key={logo.id} className="promise-item">
            <div className="promise-image-container">
              <img src={logo.img} alt={logo.text} className="promise-image" />
            </div>
            <div className="promise-text-container">
              {logo.prefix && <span className="promise-prefix">{logo.prefix}</span>}
              <Typography className="promise-text">{logo.text}</Typography>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default BrandDesc;