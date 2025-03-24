// import React from 'react';
// import { 
//   Container, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardMedia, 
//   CardContent, 
//   CardActions, 
//   Button, 
//   Box, 
//   Chip,
//   Divider
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import './CategoryPage.css';

// // SVG Icon components
// const PaperCraftIcon = () => (
//   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M16 2H8C6.9 2 6 2.9 6 4V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V4C18 2.9 17.1 2 16 2Z" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M9 7H15M9 12H15M9 17H13" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M6 4H18" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// const LeafIcon = () => (
//   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//     <path d="M6 21C6 18 9 15 12 12C15 9 18 6 21 6" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     <path d="M3 3C9 9 7 13 12 18C17 23 21 21 21 21" stroke="#8D6E63" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//   </svg>
// );

// // Styled components
// const CategoryTitle = styled(Typography)(({ theme }) => ({
//   position: 'relative',
//   display: 'inline-block',
//   padding: '0 16px',
//   marginBottom: '2rem',
//   fontFamily: "'Playfair Display', serif",
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     bottom: '-10px',
//     left: '50%',
//     width: '80px',
//     height: '2px',
//     backgroundColor: '#8D6E63',
//     transform: 'translateX(-50%)',
//   },
//   '&::after': {
//     content: '""',
//     position: 'absolute',
//     bottom: '-16px',
//     left: '50%',
//     width: '40px',
//     height: '2px',
//     backgroundColor: '#8D6E63',
//     transform: 'translateX(-50%)',
//   }
// }));

// const ProductCard = styled(Card)(({ theme }) => ({
//   height: '100%',
//   display: 'flex',
//   flexDirection: 'column',
//   transition: 'transform 0.3s, box-shadow 0.3s',
//   backgroundColor: '#f9f7f5',
//   border: '1px solid #e0e0e0',
//   borderRadius: '6px',
//   overflow: 'hidden',
//   boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
//   '&:hover': {
//     transform: 'translateY(-5px)',
//     boxShadow: '0 8px 15px rgba(0,0,0,0.1)',
//   }
// }));

// const PriceChip = styled(Chip)(({ theme }) => ({
//   backgroundColor: '#8D6E63',
//   color: 'white',
//   fontWeight: 'bold',
//   borderRadius: '4px',
// }));

// // Mock products data (in a real app, this would come from an API)
// const products = [
//   {
//     id: 1,
//     name: "Paper Flower Bouquet",
//     price: 499,
//     description: "Handcrafted delicate paper flowers arranged in a beautiful bouquet.",
//     image: "images/srk.webp"
//   },
//   {
//     id: 2,
//     name: "3D Paper Art Frame",
//     price: 899,
//     description: "Layered paper art in a wooden frame, perfect for home decor.",
//     image: "images/srk.webp"
//   },
//   {
//     id: 3,
//     name: "Paper Quilling Cards",
//     price: 299,
//     description: "Set of 5 handmade greeting cards with intricate quilling designs.",
//     image: "images/srk.webp"
//   },
//   {
//     id: 4,
//     name: "Origami Lamp Shade",
//     price: 1299,
//     description: "Elegant lamp shade made with precision-folded origami patterns.",
//     image: "images/srk.webp"
//   },
//   {
//     id: 5,
//     name: "Paper Mache Bowl",
//     price: 799,
//     description: "Eco-friendly decorative bowl handcrafted with recycled paper.",
//     image: "images/srk.webp"
//   },
//   {
//     id: 6,
//     name: "Paper Cut Shadow Box",
//     price: 1499,
//     description: "Intricate paper cutting art displayed in a light-up shadow box.",
//     image: "images/srk.webp"
//   }
// ];

// const CategoryPage = () => {
//   return (
//     <div className="category-page">
//       <Container maxWidth="lg">
//         {/* Category Header */}
//         <Box className="category-header">
//           <Box className="icon-container">
//             <PaperCraftIcon />
//           </Box>
//           <CategoryTitle variant="h3" align="center">
//             Paper Craft Collection
//           </CategoryTitle>
//           <Box className="icon-container" sx={{ transform: 'scaleX(-1)' }}>
//             <LeafIcon />
//           </Box>
//         </Box>

//         {/* Category Description */}
//         <Box className="category-description">
//           <Typography variant="body1" align="center" gutterBottom>
//             Discover the art of paper transformation in our curated collection of handmade paper crafts.
//             Each piece is meticulously created by skilled artisans who turn simple paper into extraordinary art.
//           </Typography>
//           <Divider className="decorative-divider">
//             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 8L7 13H17L12 8Z" fill="#8D6E63"/>
//             </svg>
//           </Divider>
//         </Box>

//         {/* Products Grid */}
//         <Grid container spacing={3} className="products-grid">
//           {products.map((product) => (
//             <Grid item xs={12} sm={6} md={4} key={product.id}>
//               <ProductCard>
//                 <div className="card-media-container">
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={product.image}
//                     alt={product.name}
//                     className="product-image"
//                   />
//                   <div className="price-tag">
//                     <PriceChip label={`₹${product.price}`} size="small" />
//                   </div>
//                 </div>
//                 <CardContent className="product-content">
//                   <Typography variant="h6" component="h3" className="product-title">
//                     {product.name}
//                   </Typography>
//                   <Typography variant="body2" color="text.secondary" className="product-description">
//                     {product.description}
//                   </Typography>
//                 </CardContent>
//                 <CardActions className="product-actions">
//                   <Button size="small" className="view-button">View Details</Button>
//                   <Button size="small" className="cart-button">Add to Cart</Button>
//                 </CardActions>
//               </ProductCard>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// };

// export default CategoryPage;





























import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Box,
  Rating
} from '@mui/material';
import './CategoryPage.css';

// SVG Icons for category header
const PaperCraftIcon = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 3V7C14 7.55228 14.4477 8 15 8H19" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H14L19 8V19C19 20.1046 18.1046 21 17 21Z" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12H15" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 16H15" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ScissorsIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6" r="3" stroke="#7D5A50" strokeWidth="2"/>
    <circle cx="6" cy="18" r="3" stroke="#7D5A50" strokeWidth="2"/>
    <path d="M20 4L8.12 15.88" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.47 14.48L20 20" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8.12 8.12L12 12" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const InfoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px' }}>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16H12.01" stroke="#7D5A50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Sample product data - in a real app this would come from your API/database
const products = [
  {
    id: 1,
    name: "Origami Flower Bouquet",
    price: "$24.99",
    image: "images/srk.webp",
    description: "Handcrafted paper flowers that last forever. Perfect for home decor.",
    rating: 4.8,
    reviewCount: 124
  },
  {
    id: 2,
    name: "Paper Quilling Art Frame",
    price: "$39.99",
    image: "images/srk.webp",
    description: "Intricate paper quilling artwork in a beautiful wooden frame.",
    rating: 4.7,
    reviewCount: 86
  },
  {
    id: 3,
    name: "3D Paper Sculpture",
    price: "$45.99",
    image: "images/srk.webp",
    description: "Complex 3D sculpture made entirely from premium paper.",
    rating: 4.9,
    reviewCount: 57
  },
  {
    id: 4,
    name: "Paper Mache Bowl Set",
    price: "$32.99",
    image: "images/srk.webp",
    description: "Eco-friendly decorative bowls, perfect for small items.",
    rating: 4.5,
    reviewCount: 92
  },
  {
    id: 5,
    name: "Kirigami Greeting Cards",
    price: "$18.99",
    image: "images/srk.webp",
    description: "Set of 5 handmade pop-up cards for special occasions.",
    rating: 4.6,
    reviewCount: 118
  },
  {
    id: 6,
    name: "Paper Lantern Kit",
    price: "$27.99",
    image: "images/srk.webp",
    description: "DIY paper lantern kit with LED lights included.",
    rating: 4.8,
    reviewCount: 75
  }
];

const CategoryPage = ({ categoryName = "Paper Craft Art" }) => {
  return (
    <Container maxWidth="lg" className="category-container">
      {/* Category Header with SVG styling */}
      <Box className="category-header">
        <Box className="header-pattern"></Box>
        <Box className="icon-container">
          <PaperCraftIcon />
          <ScissorsIcon />
        </Box>
        <Typography variant="h3" className="category-title">
          {categoryName}
        </Typography>
        <Box className="title-underline"></Box>
        <Typography variant="subtitle1" className="category-description">
          Discover our collection of handcrafted paper art pieces, each carefully made with precision, 
          creativity, and dedication. Our artisans transform simple paper into extraordinary works of art 
          that bring elegance and charm to any space.
        </Typography>
      </Box>

      {/* Info notes section */}
      {/* <Box className="notes-container">
        <Typography variant="h6" className="notes-title">
          <InfoIcon />
          Why Choose Our Paper Crafts?
        </Typography>
        <Typography variant="body2" className="notes-content">
          Each piece in our collection is handmade using high-quality, acid-free paper and cardstock, 
          ensuring longevity and vibrance. Our sustainable approach means minimal environmental impact 
          while creating beautiful art that lasts for years. Perfect for gifts, home decor, or adding a 
          personal touch to your space.
        </Typography>
      </Box> */}

      {/* Products Grid */}
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={4} key={product.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                image={product.image}
                alt={product.name}
                className="product-image"
              />
              <CardContent className="product-content">
                <Typography variant="h6" className="product-title">
                  {product.name}
                </Typography>
                <Box className="rating-container">
                  <Rating 
                    value={product.rating} 
                    precision={0.1} 
                    readOnly 
                    size="small"
                    className="product-rating"
                  />
                  <Typography variant="body2" className="review-count">
                    ({product.reviewCount})
                  </Typography>
                </Box>
                <Typography variant="body2" className="product-description">
                  {product.description}
                </Typography>
                <Typography variant="h6" className="product-price">
                  {product.price}
                </Typography>
                <Button variant="contained" className="view-button">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoryPage;