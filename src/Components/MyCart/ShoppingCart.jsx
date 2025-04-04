// import React, { useState } from 'react';
// import { 
//   Box,
//   Typography, 
//   Button, 
//   IconButton, 
//   Divider, 
//   Paper, 
//   Grid,
//   TextField,
//   Container,
//   Alert,
//   Snackbar
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import ReceiptIcon from '@mui/icons-material/Receipt';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import "./ShoppingCart.css";

// const ShoppingCart = () => {
//   // Sample cart items data - you would fetch this from your state management or API
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: 'Handmade Paper Flower Bouquet',
//       price: 24.99,
//       quantity: 2,
//       image: 'images/IMG_1427.jpg',
//       color: 'Mixed Colors',
//     },
//     {
//       id: 2,
//       name: 'Origami Bird Mobile',
//       price: 19.99,
//       quantity: 1,
//       image: 'images/IMG_1429.jpg',
//       color: 'Blue',
//     },
//     {
//       id: 3,
//       name: 'Paper Quilled Wall Art',
//       price: 34.99,
//       quantity: 1,
//       image: 'images/IMG_1431.jpg',
//       color: 'Pastel',
//     },
//   ]);

//   const [promoCode, setPromoCode] = useState('');
//   const [promoApplied, setPromoApplied] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');

//   // Calculate subtotal
//   const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
//   // Calculate shipping (free over $50)
//   const shipping = subtotal >= 50 ? 0 : 5.99;
  
//   // Calculate discount
//   const discount = promoApplied ? subtotal * 0.1 : 0;
  
//   // Calculate total
//   const total = subtotal + shipping - discount;

//   // Handle quantity change
//   const handleQuantityChange = (id, change) => {
//     setCartItems(prevItems => 
//       prevItems.map(item => {
//         if (item.id === id) {
//           const newQuantity = Math.max(1, item.quantity + change);
//           return { ...item, quantity: newQuantity };
//         }
//         return item;
//       })
//     );
//   };

//   // Handle item removal
//   const handleRemoveItem = (id) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== id));
//     setSnackbarMessage('Item removed from cart');
//     setSnackbarOpen(true);
//   };

//   // Handle promo code application
//   const handlePromoCode = () => {
//     if (promoCode.toLowerCase() === 'paper10') {
//       setPromoApplied(true);
//       setSnackbarMessage('Promo code applied successfully!');
//     } else {
//       setSnackbarMessage('Invalid promo code');
//     }
//     setSnackbarOpen(true);
//   };

//   return (
//     <Container maxWidth="lg" className="cart-container">
//       <Typography variant="h4" gutterBottom className="cart-heading">
//         <ShoppingCartIcon fontSize="large" className="cart-icon" /> Your Shopping Cart
//       </Typography>
      
//       <Button 
//         startIcon={<ArrowBackIcon />} 
//         className="continue-shopping-btn"
//         variant="outlined"
//       >
//         Continue Shopping
//       </Button>

//       {cartItems.length === 0 ? (
//         <Paper elevation={2} className="empty-cart-paper">
//           <Typography variant="h6" align="center" className="empty-cart-message">
//             Your cart is empty
//           </Typography>
//           <Box display="flex" justifyContent="center" mt={2}>
//             <Button 
//               variant="contained" 
//               color="primary"
//               className="shop-now-btn"
//             >
//               Shop Now
//             </Button>
//           </Box>
//         </Paper>
//       ) : (
//         <Grid container spacing={3} className="cart-grid-container">
//           <Grid item xs={12} md={8}>
//             <Paper elevation={2} className="cart-items-container">
//               {/* Cart items */}
//               {cartItems.map((item) => (
//                 <Box key={item.id} className="cart-item">
//                   <Grid container spacing={2} alignItems="center">
//                     <Grid item xs={3} sm={2}>
//                       <img 
//                         src={item.image} 
//                         alt={item.name} 
//                         className="item-image" 
//                       />
//                     </Grid>
//                     <Grid item xs={9} sm={4}>
//                       <Typography variant="h6" className="item-name">{item.name}</Typography>
//                       <Typography variant="body2" color="textSecondary" className="item-color">
//                         Color: {item.color}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={6} sm={3}>
//                       <Box className="quantity-control">
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleQuantityChange(item.id, -1)}
//                           className="quantity-btn"
//                         >
//                           <RemoveIcon />
//                         </IconButton>
//                         <Typography className="quantity-display">
//                           {item.quantity}
//                         </Typography>
//                         <IconButton 
//                           size="small"
//                           onClick={() => handleQuantityChange(item.id, 1)}
//                           className="quantity-btn"
//                         >
//                           <AddIcon />
//                         </IconButton>
//                       </Box>
//                     </Grid>
//                     <Grid item xs={4} sm={2}>
//                       <Typography variant="h6" className="item-price">
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={2} sm={1}>
//                       <IconButton 
//                         color="error"
//                         onClick={() => handleRemoveItem(item.id)}
//                         className="remove-btn"
//                       >
//                         <DeleteIcon />
//                       </IconButton>
//                     </Grid>
//                   </Grid>
//                   <Divider className="item-divider" />
//                 </Box>
//               ))}
//             </Paper>
//           </Grid>
          
//           <Grid item xs={12} md={4}>
//             <Paper elevation={2} className="order-summary">
//               <Typography variant="h6" gutterBottom className="summary-heading">
//                 Order Summary
//               </Typography>
//               <Divider />
              
//               <Box className="summary-row">
//                 <Typography>Subtotal ({cartItems.reduce((total, item) => total + item.quantity, 0)} items)</Typography>
//                 <Typography>${subtotal.toFixed(2)}</Typography>
//               </Box>
              
//               <Box className="summary-row">
//                 <Typography>Shipping</Typography>
//                 <Typography>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Typography>
//               </Box>
              
//               {promoApplied && (
//                 <Box className="summary-row discount-row">
//                   <Typography>Discount (10%)</Typography>
//                   <Typography>-${discount.toFixed(2)}</Typography>
//                 </Box>
//               )}
              
//               <Divider className="total-divider" />
              
//               <Box className="summary-row total-row">
//                 <Typography variant="h6">Total</Typography>
//                 <Typography variant="h6">${total.toFixed(2)}</Typography>
//               </Box>
              
//               <Box className="promo-code-section">
//                 <TextField
//                   fullWidth
//                   size="small"
//                   label="Promo Code"
//                   variant="outlined"
//                   value={promoCode}
//                   onChange={(e) => setPromoCode(e.target.value)}
//                   className="promo-input"
//                   placeholder="Try PAPER10"
//                 />
//                 <Button 
//                   variant="outlined" 
//                   onClick={handlePromoCode}
//                   disabled={!promoCode}
//                   className="apply-btn"
//                 >
//                   Apply
//                 </Button>
//               </Box>
              
//               <Button 
//                 variant="contained" 
//                 color="primary" 
//                 fullWidth
//                 size="large"
//                 className="checkout-btn"
//               >
//                 Proceed to Checkout
//               </Button>
              
//               <Box className="shipping-info">
//                 <Box display="flex" alignItems="center" mb={1}>
//                   <LocalShippingIcon className="info-icon" />
//                   <Typography variant="body2">Free shipping on orders over $50</Typography>
//                 </Box>
//                 <Box display="flex" alignItems="center">
//                   <ReceiptIcon className="info-icon" />
//                   <Typography variant="body2">Handmade with love, ships within 3-5 days</Typography>
//                 </Box>
//               </Box>
//             </Paper>
//           </Grid>
//         </Grid>
//       )}
      
//       {/* Related items / Recently viewed */}
//       <Box mt={6} className="suggestions-section">
//         <Typography variant="h5" gutterBottom>You Might Also Like</Typography>
//         <Grid container spacing={2}>
//           {[1, 2, 3, 4].map((item) => (
//             <Grid item xs={6} sm={3} key={item}>
//               <Paper elevation={1} className="suggestion-item">
//                 <img src="/api/placeholder/150/150" alt={`Suggestion ${item}`} className="suggestion-image" />
//                 <Box p={1}>
//                   <Typography variant="body1" className="suggestion-name">Paper Craft Item {item}</Typography>
//                   <Typography variant="body2" color="primary" className="suggestion-price">$19.99</Typography>
//                   <Button 
//                     variant="outlined" 
//                     size="small" 
//                     fullWidth 
//                     className="add-to-cart-btn"
//                   >
//                     Add to Cart
//                   </Button>
//                 </Box>
//               </Paper>
//             </Grid>
//           ))}
//         </Grid>
//       </Box>
      
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert 
//           onClose={() => setSnackbarOpen(false)} 
//           severity={promoApplied || snackbarMessage === 'Item removed from cart' ? "success" : "error"}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ShoppingCart;


























// import React, { useState, useEffect } from 'react';
// import { ShoppingCart, Trash2, Minus, Plus, X, ChevronLeft, CreditCard } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ShoppingCartComponent = () => {
//   const [cart, setCart] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isOpen, setIsOpen] = useState(false);

//   // Fetch cart data when component mounts
//   useEffect(() => {
//     const fetchCart = async () => {
//       setIsLoading(true);
//       try {
//        const response=await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/mycart",{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//        });
//        console.log(response.data.cart);
//         setCart(response.data.cart);
//         setIsLoading(false);
//       } catch (err) {
//         setError("Failed to load your cart. Please try again.");
//         setIsLoading(false);
//       }
//     };
//     fetchCart();
//   }, [isOpen]);

//   const updateQuantity = (id, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     setCart(cart.map(item => 
//       item._id === id ? { ...item, quantity: newQuantity } : item
//     ));
//   };
  
//   const removeItem = async(id) => {
//     try {
//       await axios.delete( `https://pr-crafts-backend.vercel.app/api/v1/user/deletecart/${id}`,{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       })
//       toast.success("Item removed from cart");
//       setCart(cart.filter(item => item._id !== id));
//     } catch (error) {
//       console.log(error);
//     }
//   };
  
//   const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   const total = subtotal;

//   return (
//     <div className="font-sans bg-white">
//       {/* Cart toggle button */}
//       <button 
//   onClick={() => setIsOpen(true)}
//   className="fixed md:top-6 md:right-40 top-3.5 right-20 bg-gray-400 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
//   aria-label="Open cart"
// >
//   <ShoppingCart size={12} />
//   {cart.length > 0 && (
//     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
//       {cart.length}
//     </span>
//   )}
// </button>
      
//       {/* Cart sidebar */}
//       <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50 flex flex-col`}>
//         {/* Cart header */}
//         <div className="flex items-center justify-between px-4 py-6 border-b">
//           <div className="flex items-center">
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="mr-3 text-gray-500 hover:text-gray-700"
//               aria-label="Close cart"
//             >
//               <ChevronLeft size={24} />
//             </button>
//             <h2 className="text-xl font-semibold">Your Cart</h2>
//             <span className="ml-2 text-gray-600">
//               ({cart.length} items)
//             </span>
//           </div>
//           <button 
//             onClick={() => setIsOpen(false)}
//             className="text-gray-500 hover:text-gray-700"
//             aria-label="Close cart"
//           >
//             <X size={12} />
//           </button>
//         </div>
        
//         {/* Cart content */}
//         <div className="flex-grow bg-white overflow-y-auto p-4 pb-20 min-h-[300px]">

//           {isLoading ? (
//             <div className="flex flex-col items-center justify-center h-full">
//               <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
//               <p className="mt-4 text-gray-600">Loading your cart...</p>
//             </div>
//           ) : error ? (
//             <div className="flex flex-col items-center justify-center h-full text-center">
//               <div className="text-red-500 mb-4">
//                 <X size={48} />
//               </div>
//               <p className="text-gray-600">{error}</p>
//               <button 
//                 onClick={() => window.location.reload()}
//                 className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           ) : cart.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center">
//               <div className="text-gray-400 mb-4">
//                 <ShoppingCart size={64} />
//               </div>
//               <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
//               <p className="mt-2 text-gray-500">Looks like you haven't added any items to your cart yet.</p>
//               <button 
//                 onClick={() => setIsOpen(false)}
//                 className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
//               >
//                 Continue Shopping
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-12">
//             {console.log(cart)}
//               {cart.map((item) => (
                
//                 <div key={item._id} className="flex items-start space-x-4 py-4 border-b">
//                   <img 
//                     src={item.Image?.url}
//                     alt={item.title} 
//                     className="w-20 h-20 object-cover rounded-md"
//                   />
//                   <div className="flex-grow">
//                     <h3 className="text-gray-800 font-medium">{item.title}</h3>
//                     <p className="text-indigo-600 font-semibold mt-1">${item.price.toFixed(2)}</p>
                    
//                     <div className="flex items-center mt-2">
//                       <button 
//                         onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                         className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l text-gray-600 hover:bg-gray-200"
//                         aria-label="Decrease quantity"
//                       >
//                         <Minus size={16} />
//                       </button>
//                       <span className="w-10 text-center bg-gray-100 py-1 text-gray-700">
//                         {item.quantity}
//                       </span>
//                       <button 
//                         onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                         className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r text-gray-600 hover:bg-gray-200"
//                         aria-label="Increase quantity"
//                       >
//                         <Plus size={16} />
//                       </button>
//                     </div>
//                   </div>
//                   <button 
//                     onClick={() => removeItem(item._id)}
//                     className="text-gray-500 hover:text-red-600 transition-colors"
//                     aria-label="Remove item"
//                   >
//                     <Trash2 size={20} />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
        
//         {/* Cart footer with summary and checkout */}
//         {cart.length > 0 && (
//           <div className="border-t bg-gray-50 p-4">
//             <div className="space-y-2 mb-4">
//               <div className="flex justify-between text-gray-600">
//                 <span>Total</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>
//               {/* <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//                 <span>Total</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div> */}
//             </div>
//             <button className="w-full py-3 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
//               <CreditCard size={20} className="mr-2" />
//               Proceed to Checkout
//             </button>
//           </div>
//         )}
//       </div>
      
//       {/* Background overlay */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={() => setIsOpen(false)}
//         ></div>
//       )}
//     </div>
//   );
// };

// export default ShoppingCartComponent;










import React, { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, Minus, Plus, X, ChevronLeft, CreditCard } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const ShoppingCartComponent = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch cart data when component mounts
  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/mycart", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        console.log(response.data.cart);
        setCart(response.data.cart);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load your cart. Please try again.");
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [isOpen]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(cart.map(item => 
      item._id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = async(id) => {
    try {
      await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/user/deletecart/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("Item removed from cart");
      setCart(cart.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const total = subtotal;

  return (
    <div className="font-sans bg-white">
      {/* Cart toggle button with animation */}
      <motion.button 
        onClick={() => setIsOpen(true)}
        className="fixed md:top-6 md:right-40 top-3.5 right-20 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all z-40"
        aria-label="Open cart"
        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 15,
          delay: 0.2
        }}
      >
        <ShoppingCart size={16} />
        {cart.length > 0 && (
          <motion.span 
            className="absolute -top-2 -right-2 bg-white border border-black text-black text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 10 }}
          >
            {cart.length}
          </motion.span>
        )}
      </motion.button>
      
      {/* Cart sidebar with animation */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Background overlay with animation */}
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              transition={{ duration: 0.3 }}
            />

            {/* Cart panel with animation */}
            <motion.div 
              className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
            >
              {/* Cart header */}
              <motion.div 
                className="flex items-center justify-between px-6 py-6 border-b border-gray-200"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center">
                  <motion.button 
                    onClick={() => setIsOpen(false)}
                    className="mr-3 text-gray-800 hover:text-black"
                    aria-label="Close cart"
                    whileHover={{ x: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ChevronLeft size={24} />
                  </motion.button>
                  <h2 className="text-xl font-semibold tracking-tight text-gray-900">Your Cart</h2>
                  <motion.span 
                    className="ml-2 text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full text-sm"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {cart.length} items
                  </motion.span>
                </div>
                <motion.button 
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Close cart"
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
              
              {/* Cart content */}
              <div className="flex-grow bg-white overflow-y-auto p-6 pb-24 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {isLoading ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div 
                      className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.p 
                      className="mt-6 text-gray-600 font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      Loading your cart...
                    </motion.p>
                  </motion.div>
                ) : error ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="text-red-500 mb-4"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, delay: 0.2 }}
                    >
                      <X size={48} strokeWidth={1.5} />
                    </motion.div>
                    <motion.p 
                      className="text-gray-600 mb-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {error}
                    </motion.p>
                    <motion.button 
                      onClick={() => window.location.reload()}
                      className="px-6 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium tracking-wide"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Try Again
                    </motion.button>
                  </motion.div>
                ) : cart.length === 0 ? (
                  <motion.div 
                    className="flex flex-col items-center justify-center h-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div 
                      className="text-gray-400 mb-6"
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                    >
                      <ShoppingCart size={72} strokeWidth={1.5} />
                    </motion.div>
                    <motion.h3 
                      className="text-2xl font-medium text-gray-900"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      Your cart is empty
                    </motion.h3>
                    <motion.p 
                      className="mt-3 text-gray-500 max-w-xs"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      Looks like you haven't added any items to your cart yet.
                    </motion.p>
                    <motion.button 
                      onClick={() => setIsOpen(false)}
                      className="mt-8 px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-colors font-medium tracking-wide"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Continue Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {console.log(cart)}
                    {cart.map((item, index) => (
                      <motion.div 
                        key={item._id} 
                        className="flex items-start space-x-4 py-6 border-b border-gray-100 last:border-b-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index, duration: 0.3 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        layout
                      >
                        <motion.div 
                          className="relative w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                        >
                          <motion.img 
                            src={item.Image?.url}
                            alt={item.title} 
                            className="w-full h-full object-cover rounded-lg shadow-sm"
                            initial={{ scale: 1.2, filter: "blur(10px)" }}
                            animate={{ scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <div className="flex-grow">
                          <h3 className="text-gray-900 font-medium text-base">{item.title}</h3>
                          <p className="text-gray-800 font-semibold mt-1">${item.price.toFixed(2)}</p>
                          
                          <div className="flex items-center mt-3">
                            <motion.button 
                              onClick={() => updateQuantity(item._id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-l border border-gray-200 text-gray-600 hover:bg-gray-200"
                              aria-label="Decrease quantity"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus size={14} />
                            </motion.button>
                            <span className="w-10 text-center border-t border-b border-gray-200 py-1 text-gray-800 font-medium">
                              {item.quantity}
                            </span>
                            <motion.button 
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-r border border-gray-200 text-gray-600 hover:bg-gray-200"
                              aria-label="Increase quantity"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus size={14} />
                            </motion.button>
                          </div>
                        </div>
                        <motion.button 
                          onClick={() => removeItem(item._id)}
                          className="text-gray-400 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                          whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </div>
              
              {/* Cart footer with summary and checkout */}
              {cart.length > 0 && (
                <motion.div 
                  className="border-t border-gray-200 bg-gray-50 p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-800 font-medium">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <motion.div 
                      className="flex justify-between font-semibold text-xl pt-4 border-t border-gray-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </motion.div>
                  </div>
                  <motion.button 
                    className="w-full py-4 bg-black text-white rounded-md font-medium hover:bg-gray-800 transition-all flex items-center justify-center shadow-md"
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <CreditCard size={20} className="mr-2" />
                    Proceed to Checkout
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShoppingCartComponent;





