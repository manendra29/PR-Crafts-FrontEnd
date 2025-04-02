// import React, { useEffect, useState } from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Card, 
//   CardContent, 
//   Grid, 
//   TextField, 
//   Button, 
//   Rating, 
//   Avatar, 
//   Divider, 
//   FormControl, 
//   FormControlLabel, 
//   Checkbox,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import ThumbUpIcon from '@mui/icons-material/ThumbUp';
// import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
// import CloseIcon from '@mui/icons-material/Close';
// import './ReviewSection.css';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Sample review data
// const sampleReviews = [
//   {
//     id: 1,
//     name: "Emily Johnson",
//     avatar: "https://via.placeholder.com/40",
//     rating: 5,
//     date: "Feb 15, 2025",
//     title: "Absolutely beautiful craftsmanship",
//     content: "The paper flowers I received were even more beautiful than the pictures! Each petal was perfectly crafted, and the colors were vibrant and true to the images online. They make a stunning centerpiece for my dining table, and everyone asks where I got them.",
//     helpful: 24,
//     images: [
//       "images/srk.webp",
//       "images/srk.webp"
//     ],
//     verified: true
//   },
//   {
//     id: 2,
//     name: "Michael Thomas",
//     avatar: "https://via.placeholder.com/40",
//     rating: 4,
//     date: "Jan 28, 2025",
//     title: "Great quality but shipping took longer than expected",
//     content: "The paper craft decorations are absolutely gorgeous and well-made. I'm impressed with the attention to detail and the quality of the materials used. My only complaint is that shipping took almost two weeks when the estimate was one week. Still, the end product was worth the wait.",
//     helpful: 12,
//     images: [],
//     verified: true
//   },
//   {
//     id: 3,
//     name: "Sarah Wilson",
//     avatar: "https://via.placeholder.com/40",
//     rating: 5,
//     date: "Mar 2, 2025",
//     title: "Perfect gift!",
//     content: "I ordered a customized paper sculpture as a gift for my mom's birthday. The team was incredibly responsive to my requests and created exactly what I envisioned. My mom was moved to tears when she opened it. Will definitely order again!",
//     helpful: 35,
//     images: [
//       "images/srk.webp"
//     ],
//     verified: true
//   },
//   {
//     id: 4,
//     name: "David Chen",
//     avatar: "https://via.placeholder.com/40",
//     rating: 5,
//     date: "Mar 5, 2025",
//     title: "Exceptional quality and service",
//     content: "I can't say enough good things about these paper crafts. The attention to detail is remarkable, and the customer service team was extremely helpful when I had questions about customization options. Highly recommend!",
//     helpful: 18,
//     images: [],
//     verified: true
//   },
//   {
//     id: 5,
//     name: "Jessica Martinez",
//     avatar: "https://via.placeholder.com/40",
//     rating: 4,
//     date: "Feb 20, 2025",
//     title: "Beautiful but fragile",
//     content: "The paper flowers look absolutely stunning and exactly as pictured. My only concern is that they seem quite delicate - I accidentally damaged one while arranging them. That said, they make a gorgeous decoration for my living room.",
//     helpful: 9,
//     images: [
//       "images/srk.webp"
//     ],
//     verified: true
//   },
//   {
//     id: 6,
//     name: "Robert Williams",
//     avatar: "https://via.placeholder.com/40",
//     rating: 5,
//     date: "Jan 15, 2025",
//     title: "Exceeded expectations",
//     content: "I purchased these paper crafts as decorations for my daughter's wedding. They were absolutely perfect and received so many compliments from our guests. Worth every penny for such unique and beautiful pieces!",
//     helpful: 27,
//     images: [
//       "images/srk.webp",
//       "images/srk.webp"
//     ],
//     verified: true
//   },
//   {
//     id: 7,
//     name: "Amanda Johnson",
//     avatar: "https://via.placeholder.com/40",
//     rating: 3,
//     date: "Feb 10, 2025",
//     title: "Nice but colors don't match website",
//     content: "The craftsmanship is excellent, but the colors are noticeably different from what was shown on the website. The blues are much darker than expected. Customer service was responsive but couldn't resolve the issue to my satisfaction.",
//     helpful: 14,
//     images: [],
//     verified: true
//   },
//   {
//     id: 8,
//     name: "James Wilson",
//     avatar: "https://via.placeholder.com/40",
//     rating: 5,
//     date: "Mar 8, 2025",
//     title: "Perfect for my office",
//     content: "I bought several paper flower arrangements for my therapy office, and they've really transformed the space. Clients always comment on how beautiful they are, and they're a great conversation starter. Highly recommend!",
//     helpful: 21,
//     images: [
//       "images/srk.webp"
//     ],
//     verified: true
//   }
// ];

// // Styled components
// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

// const ReviewSection = ({ productId = '123' }) => {
//   const {id}=useParams();
//   // State for review form
//   const [rating, setRating] = useState(0);
//   const [reviewTitle, setReviewTitle] = useState('');
//   const [reviewContent, setReviewContent] = useState('');
//   const [reviewImages, setReviewImages] = useState([]);
//   const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
//   const [includePhoto, setIncludePhoto] = useState(false);
//   const [formErrors, setFormErrors] = useState({});
//   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
  
//   const [reviews, setReviews] = useState(sampleReviews);
//   const [filterByRating, setFilterByRating] = useState(0);
//   const [showOnlyWithImages, setShowOnlyWithImages] = useState(false);




//   useEffect(()=>{
//     const fetch=async()=>{
//       try {
//           const response=await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/user/reviews/${id}`,{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"application/json"
//         }
//       });
//       setReviews(response.data.reviews);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     fetch();
//   },[])








  
//   // State for pagination
//   const [visibleReviews, setVisibleReviews] = useState(3);
//   const reviewsPerPage = 3;
  
//   // Calculate review statistics
//   const calculateStats = () => {
//     const totalReviews = reviews.length;
//     if (totalReviews === 0) return { average: 0, counts: [0, 0, 0, 0, 0] };
    
//     const counts = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars
//     let sum = 0;
    
//     reviews.forEach(review => {
//       sum += review.rating;
//       counts[5 - review.rating]++;
//     });
    
//     return {
//       average: (sum / totalReviews).toFixed(1),
//       counts: counts,
//       percentages: counts.map(count => (count / totalReviews) * 100)
//     };
//   };
  
//   const stats = calculateStats();
  
//   // Handle image upload
//   const handleImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       setIncludePhoto(true);
      
//       // Limit to maximum 5 images
//       const newFiles = files.slice(0, 5 - reviewImages.length);
//       setReviewImages([...reviewImages, ...newFiles]);
      
//       // Create preview URLs
//       const newImageUrls = newFiles.map(file => URL.createObjectURL(file));
//       setImagePreviewUrls([...imagePreviewUrls, ...newImageUrls]);
//     }
//   };
  
//   // Remove uploaded image
//   const removeImage = (index) => {
//     const newImages = [...reviewImages];
//     const newImageUrls = [...imagePreviewUrls];
    
//     newImages.splice(index, 1);
    
//     // Revoke object URL to avoid memory leaks
//     URL.revokeObjectURL(newImageUrls[index]);
//     newImageUrls.splice(index, 1);
    
//     setReviewImages(newImages);
//     setImagePreviewUrls(newImageUrls);
    
//     if (newImages.length === 0) {
//       setIncludePhoto(false);
//     }
//   };
  
//   // Validate form
//   const validateForm = () => {
//     const errors = {};
//     if (rating === 0) errors.rating = "Please select a rating";
//     if (!reviewTitle.trim()) errors.title = "Please provide a review title";
//     if (!reviewContent.trim()) errors.content = "Please write your review";
//     if (reviewContent.trim().length < 10) errors.content = "Review must be at least 10 characters";
    
//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };
  
//   // Handle form submission
//   const handleSubmitReview = async(e) => {
//     e.preventDefault();
//     const formData=new FormData();
//     formData.append('title', reviewTitle);
//     formData.append('description', reviewContent);
//     formData.append('star',rating);
//     if (reviewImages && reviewImages.length > 0) {
//       reviewImages.forEach((file) => {
//         formData.append('images', file);
//       });
//     }
//     console.log(formData);
//     try {
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/createreview/${id}`,
//         formData
//       ,{
//         withCredentials:true,
//         headers:{
//           "Content-Type":"multipart/form-data"
//         }
//       });
//       toast.success("Review Submitted");
//     } catch (error) {
//       console.log(error);
//     }
    
   
//   };
  
//   // Load more reviews
//   const loadMoreReviews = () => {
//     setVisibleReviews(prev => prev + reviewsPerPage);
//   };
  
//   // Filter reviews
//   const filteredReviews = reviews.filter(review => {
//     if (filterByRating > 0 && review.rating !== filterByRating) return false;
//     if (showOnlyWithImages && review.images.length === 0) return false;
//     return true;
//   });
  
//   // Get paginated reviews
//   const paginatedReviews = filteredReviews.slice(0, visibleReviews);
  
//   // Check if there are more reviews to load
//   const hasMoreReviews = visibleReviews < filteredReviews.length;
  
//   return (
//     <Container maxWidth="lg" className="review-section-container">
//       <Typography variant="h4" component="h2" className="section-title">
//         Customer Reviews
//       </Typography>
      
//       <Grid container spacing={4}>
//         {/* Review Statistics */}
//         <Grid item xs={12}>
//           <Card className="stats-card">
//             <CardContent>
//               <Grid container>
//                 <Grid item xs={12} md={4} className="average-rating-container">
//                   <Typography variant="h2" component="div" className="average-rating">
//                     {stats.average}
//                   </Typography>
//                   <Box className="star-rating-large">
//                     <Rating 
//                       value={parseFloat(stats.average)} 
//                       precision={0.1} 
//                       readOnly 
//                       size="large"
//                     />
//                   </Box>
//                   <Typography variant="body2" className="review-count">
//                     Based on {reviews.length} reviews
//                   </Typography>
//                 </Grid>
                
//                 <Grid item xs={12} md={8}>
//                   <Box className="rating-bars">
//                     {[5, 4, 3, 2, 1].map((star) => (
//                       <Box key={star} className="rating-bar-container">
//                         <Typography variant="body2" className="star-label">
//                           {star} stars
//                         </Typography>
//                         <Box className="progress-bar-container">
//                           <Box 
//                             className="progress-bar" 
//                             sx={{ width: `${stats.percentages[5 - star]}%` }}
//                           />
//                         </Box>
//                         <Typography variant="body2" className="count-label">
//                           {stats.counts[5 - star]}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         {/* Write Review Section */}
//         <Grid item xs={12}>
//           <Card className="write-review-card">
//             <CardContent>
//               <Typography variant="h5" component="h3" className="review-form-title">
//                 Write a Review
//               </Typography>
              
//               <Box component="form" onSubmit={handleSubmitReview} className="review-form">
//                 <Box className="rating-field">
//                   <Typography variant="body1" className="form-label">
//                     Your Rating*
//                   </Typography>
//                   <Rating
//                     name="rating"
//                     value={rating}
//                     onChange={(event, newValue) => {
//                       setRating(newValue);
//                     }}
//                     size="large"
//                   />
//                   {formErrors.rating && (
//                     <Typography variant="body2" color="error" className="error-message">
//                       {formErrors.rating}
//                     </Typography>
//                   )}
//                 </Box>
                
//                 <TextField
//                   label="Review Title*"
//                   variant="outlined"
//                   fullWidth
//                   className="review-title-field"
//                   value={reviewTitle}
//                   onChange={(e) => setReviewTitle(e.target.value)}
//                   error={!!formErrors.title}
//                   helperText={formErrors.title || ""}
//                 />
                
//                 <TextField
//                   label="Review*"
//                   variant="outlined"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   className="review-content-field"
//                   placeholder="What did you like or dislike about this product? How is the quality? Would you recommend it to others?"
//                   value={reviewContent}
//                   onChange={(e) => setReviewContent(e.target.value)}
//                   error={!!formErrors.content}
//                   helperText={formErrors.content || ""}
//                 />
                
//                 <Box className="photo-upload-section">
//                   <Typography variant="body1" className="form-label">
//                     Add Photos (Optional)
//                   </Typography>
                  
//                   <Box className="image-preview-container">
//                     {imagePreviewUrls.map((url, index) => (
//                       <Box key={index} className="image-preview">
//                         <img src={url} alt={`Preview ${index + 1}`} />
//                         <Button 
//                           className="remove-image-button"
//                           onClick={() => removeImage(index)}
//                         >
//                           <CloseIcon />
//                         </Button>
//                       </Box>
//                     ))}
                    
//                     {imagePreviewUrls.length < 5 && (
//                       <Button
//                         component="label"
//                         variant="outlined"
//                         className="upload-image-button"
//                         startIcon={<InsertPhotoIcon />}
//                       >
//                         Add Photo
//                         <VisuallyHiddenInput 
//                           type="file" 
//                           accept="image/*"
//                           multiple
//                           onChange={handleImageChange}
//                         />
//                       </Button>
//                     )}
//                   </Box>
                  
//                   <Typography variant="body2" className="upload-hint">
//                     You can upload up to 5 images (JPG, PNG)
//                   </Typography>
//                 </Box>
                
//                 <FormControl className="terms-checkbox">
//                   <FormControlLabel
//                     control={
//                       <Checkbox required />
//                     }
//                     label="I confirm this review is based on my own experience and is my genuine opinion. I have no personal or business relationship with this product." 
//                   />
//                 </FormControl>
                
//                 <Box className="submit-button-container">
//                   <Button
//                     type="submit" 
//                     variant="contained" 
//                     color="primary" 
//                     size="large"
//                     className="submit-review-button"
//                   >
//                     Submit Review
//                   </Button>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         {/* Review Filter Section */}
//         <Grid item xs={12}>
//           <Card className="filter-card">
//             <CardContent>
//               <Grid container alignItems="center" spacing={2}>
//                 <Grid item xs={12} sm={6}>
//                   <Typography variant="h6" component="h3" className="filter-title">
//                     Filter Reviews
//                   </Typography>
//                 </Grid>
                
//                 <Grid item xs={12} sm={6}>
//                   <Box className="filter-controls">
//                     <Box className="rating-filter">
//                       <Typography variant="body2" className="filter-label">
//                         Filter by Rating:
//                       </Typography>
//                       <Box className="star-filter-buttons">
//                         {[0, 5, 4, 3, 2, 1].map((star) => (
//                           <Button
//                             key={star}
//                             variant={filterByRating === star ? "contained" : "outlined"}
//                             size="small"
//                             className={`star-filter-button ${filterByRating === star ? 'active' : ''}`}
//                             onClick={() => setFilterByRating(star)}
//                           >
//                             {star === 0 ? "All" : `${star} ★`}
//                           </Button>
//                         ))}
//                       </Box>
//                     </Box>
                    
//                     <FormControlLabel
//                       control={
//                         <Checkbox
//                           checked={showOnlyWithImages}
//                           onChange={(e) => setShowOnlyWithImages(e.target.checked)}
//                         />
//                       }
//                       label="Show only reviews with photos"
//                       className="photo-filter"
//                     />
//                   </Box>
//                 </Grid>
//               </Grid>
//             </CardContent>
//           </Card>
//         </Grid>
        
//         {/* Reviews List */}
//         <Grid item xs={12}>
//           <Box className="reviews-list">
//             {paginatedReviews.length > 0 ? (
//               <>
//                 {paginatedReviews.map((review) => (
//                   <Card key={review._id} className="review-card">
//                     <CardContent>
//                       <Box className="review-header">
//                         <Box className="reviewer-info">
//                           <Avatar src={review.avatar} alt={review.name} className="reviewer-avatar" />
//                           <Box>
//                             <Typography variant="body1" className="reviewer-name">
//                               {review.name}
//                               {review.verified && (
//                                 <span className="verified-badge">Verified Purchase</span>
//                               )}
//                             </Typography>
//                             <Typography variant="body2" className="review-date">
//                               {review.createdAt}
//                             </Typography>
//                           </Box>
//                         </Box>
//                         <Box className="review-rating">
//                           <Rating value={review.star} readOnly size="small" />
//                         </Box>
//                       </Box>
                      
//                       <Typography variant="h6" component="h4" className="review-title">
//                         {review.title}
//                       </Typography>
                      
//                       <Typography variant="body1" className="review-content">
//                         {review.description}
//                       </Typography>
                      
//                       {review.images.length > 0 && (
//                         <Box className="review-images">
//                           {review.images.map((image, index) => (
//                             <img 
//                               key={index} 
//                               src={`https://pr-crafts-backend.vercel.app/${image}`} 
//                               alt={`Review ${review._id} image ${index + 1}`} 
//                               className="review-image"
//                             />
//                           ))}
//                         </Box>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
                
//                 {/* Load More Button */}
//                 {hasMoreReviews && (
//                   <Box className="load-more-container">
//                     <Button 
//                       variant="outlined" 
//                       color="primary" 
//                       onClick={loadMoreReviews}
//                       className="load-more-button"
//                     >
//                       Load More Reviews ({filteredReviews.length - visibleReviews} remaining)
//                     </Button>
//                   </Box>
//                 )}
//               </>
//             ) : (
//               <Box className="no-reviews-message">
//                 <Typography variant="body1" align="center">
//                   No reviews match your current filters. Try different filters or be the first to leave a review!
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         </Grid>
//       </Grid>
      
//       {/* Success Dialog */}
//       <Dialog
//         open={openSuccessDialog}
//         onClose={() => setOpenSuccessDialog(false)}
//       >
//         <DialogTitle>Thank You for Your Review!</DialogTitle>
//         <DialogContent>
//           <DialogContentText>
//             Your review has been submitted successfully and will be published soon after moderation.
//             We truly appreciate your feedback!
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenSuccessDialog(false)} color="primary" autoFocus>
//             Close
//           </Button>
//         </DialogActions>
//       </Dialog>
      
//       {/* Error Snackbar */}
//       <Snackbar
//         open={openErrorSnackbar}
//         autoHideDuration={6000}
//         onClose={() => setOpenErrorSnackbar(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={() => setOpenErrorSnackbar(false)} 
//           severity="error" 
//           variant="filled"
//         >
//           Please correct the errors in the form before submitting.
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default ReviewSection;





















// import React, { useState, useEffect } from 'react';
// import { Star, StarHalf, User } from 'lucide-react';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useParams } from 'react-router-dom';

// const ReviewSection = () => {
//   const { id } = useParams();
//   const [reviews, setReviews] = useState([]);
//   const [averageRating, setAverageRating] = useState(0);
//   const [newReview, setNewReview] = useState({
//     title: '',
//     description: '',
//     rating: 0,
//     images: []
//   });
//   const [previewImages, setPreviewImages] = useState([]);
//   const [userId, setUserId] = useState('');
//   const [visibleReviews, setVisibleReviews] = useState(4); // Show 4 reviews initially

//   // Fetch reviews and user info
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Get reviews
//         const reviewsRes = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/user/reviews/${id}`, {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" }
//         });
        
//         setReviews(reviewsRes.data.reviews);
        
//         // Calculate average rating
//         const avgRating = reviewsRes.data.reviews.reduce((sum, review) => sum + review.star, 0) / reviewsRes.data.reviews.length;
//         setAverageRating(avgRating || 0);
        
//         // Get current user ID
//         const userRes = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/me", {
//           withCredentials: true
//         });
//         setUserId(userRes.data.user._id);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewReview(prev => ({ ...prev, [name]: value }));
//   };

//   const handleRatingChange = (rating) => {
//     setNewReview(prev => ({ ...prev, rating }));
//   };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 3) {
//       toast.error('You can only upload up to 3 images');
//       return;
//     }

//     setNewReview(prev => ({ ...prev, images: files.slice(0, 3) }));
//     setPreviewImages(files.map(file => URL.createObjectURL(file)));
//   };

//   const removeImage = (index) => {
//     const updatedImages = [...newReview.images];
//     updatedImages.splice(index, 1);
    
//     const updatedPreviews = [...previewImages];
//     URL.revokeObjectURL(updatedPreviews[index]);
//     updatedPreviews.splice(index, 1);
    
//     setNewReview(prev => ({ ...prev, images: updatedImages }));
//     setPreviewImages(updatedPreviews);
//   };

//   const submitReview = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append('title', newReview.title);
//       formData.append('description', newReview.description);
//       formData.append('star', newReview.rating);
//       console.log(newReview.images);
//       newReview.images.forEach(image => formData.append('images', image));
      
//       await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/createreview/${id}`, formData, {
//         withCredentials: true,
//         headers: { "Content-Type": "multipart/form-data" }
//       });
      
//       toast.success("Review Submitted");
      
//       // Refresh reviews after submission
//       const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/user/reviews/${id}`, {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" }
//       });
      
//       setReviews(response.data.reviews);
//       const avgRating = response.data.reviews.reduce((sum, review) => sum + review.star, 0) / response.data.reviews.length;
//       setAverageRating(avgRating || 0);
      
//       // Reset form
//       setNewReview({ title: '', description: '', rating: 0, images: [] });
//       setPreviewImages([]);
//     } catch (error) {
//       toast.error("Error submitting review");
//       console.error('Error submitting review:', error);
//     }
//   };

//   const deleteReview = async (reviewId) => {
//     try {
//       await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/user/deletereview/${reviewId}`, {
//         withCredentials: true
//       });
      
//       toast.success("Review deleted");
      
//       // Update reviews list
//       const updatedReviews = reviews.filter(review => review._id !== reviewId);
//       setReviews(updatedReviews);
      
//       // Recalculate average
//       const avgRating = updatedReviews.length 
//         ? updatedReviews.reduce((sum, review) => sum + review.star, 0) / updatedReviews.length 
//         : 0;
//       setAverageRating(avgRating);
//     } catch (error) {
//       toast.error("Error deleting review");
//       console.error('Error deleting review:', error);
//     }
//   };

//   // Load more reviews
//   const loadMoreReviews = () => {
//     setVisibleReviews(prev => prev + 4); // Add 4 more reviews
//   };

//   // Renders stars with half star support
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 >= 0.5;
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(
//           <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//         );
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(
//           <StarHalf key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
//         );
//       } else {
//         stars.push(
//           <Star key={i} className="h-4 w-4 text-gray-300" />
//         );
//       }
//     }
    
//     return stars;
//   };

//   // Get visible reviews for pagination
//   const displayedReviews = reviews.slice(0, visibleReviews);
//   const hasMoreReviews = reviews.length > visibleReviews;

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
      
//       {/* Rating Summary */}
//       <div className="flex items-center mb-6 bg-gray-50 p-3 rounded">
//         <div className="mr-4">
//           <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
//           <div className="flex">
//             {renderStars(averageRating)}
//           </div>
//           <span className="text-sm text-gray-500">{reviews.length} reviews</span>
//         </div>
//       </div>

//       {/* Add Review Form */}
//       <div className="mb-6 p-4 border rounded">
//         <h3 className="font-semibold mb-3">Write a Review</h3>
//         <form onSubmit={submitReview}>
//           <div className="mb-3">
//             <label className="block text-sm mb-1">Rating*</label>
//             <div className="flex">
//               {[1, 2, 3, 4, 5].map(star => (
//                 <button 
//                   key={star} 
//                   type="button"
//                   onClick={() => handleRatingChange(star)}
//                   className="mr-1"
//                 >
//                   <Star 
//                     className={`h-6 w-6 ${newReview.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>
          
//           <div className="mb-3">
//             <label className="block text-sm mb-1">Title*</label>
//             <input
//               type="text"
//               name="title"
//               value={newReview.title}
//               onChange={handleInputChange}
//               className="w-full px-2 py-1 border rounded"
//               required
//             />
//           </div>
          
//           <div className="mb-3">
//             <label className="block text-sm mb-1">Review*</label>
//             <textarea
//               name="description"
//               value={newReview.description}
//               onChange={handleInputChange}
//               rows="3"
//               className="w-full px-2 py-1 border rounded"
//               required
//             ></textarea>
//           </div>
          
//           <div className="mb-3">
//             <label className="block text-sm mb-1">Images (up to 3)</label>
//             <input 
//               type="file" 
//               multiple 
//               accept="image/*"
//               onChange={handleImageUpload}
//               className="mb-2"
//             />
            
//             {previewImages.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {previewImages.map((src, index) => (
//                   <div key={index} className="relative">
//                     <img src={src} alt="Preview" className="w-16 h-16 object-cover border rounded" />
//                     <button 
//                       type="button" 
//                       onClick={() => removeImage(index)}
//                       className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 text-xs"
//                     >
//                       ×
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
          
//           <button 
//             type="submit" 
//             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//           >
//             Submit Review
//           </button>
//         </form>
//       </div>

//       {/* Review List */}
//       <div>
//         {displayedReviews.map(review => (
//           <div key={review._id} className="mb-4 pb-4 border-b">
//             <div className="flex items-start justify-between">
//               <div className="flex items-center mb-2">
//                 {/* User Profile */}
//                 <div className="mr-3">
//                   {review.userImage ? (
//                     <img 
//                       src={`https://pr-crafts-backend.vercel.app/${review.userImage}`} 
//                       alt="User profile" 
//                       className="w-10 h-10 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
//                       <User className="h-6 w-6 text-gray-500" />
//                     </div>
//                   )}
//                 </div>
                
//                 {/* User Info and Rating */}
//                 <div>
//                   <div className="font-medium">{review.userName || "Anonymous User"}</div>
//                   <div className="flex">
//                     {renderStars(review.star)}
//                     <span className="text-sm text-gray-500 ml-2">
//                       {new Date(review.createdAt).toLocaleDateString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Delete Button */}
//               {review.userId === userId && (
//                 <button
//                   onClick={() => deleteReview(review._id)}
//                   className="text-white bg-red-500 px-2 py-1 text-sm rounded hover:bg-red-600"
//                 >
//                   Delete
//                 </button>
//               )}
//             </div>
            
//             {/* Review Content */}
//             <div className="ml-12">
//               <div className="font-medium mb-1">{review.title}</div>
//               <p className="text-gray-700 text-sm mb-2">{review.description}</p>
              
//               {/* Review Images */}
//               {review.images && review.images.length > 0 && (
//                 <div className="flex gap-2 mt-2">
//                   {review.images.map((image, index) => (
//                     <img 
//                       key={image.public_id} 
//                       src={image?.url}
//                       alt={`Review ${index + 1}`} 
//                       className="w-16 h-16 object-cover border rounded" 
//                     />
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
        
//         {/* Load More Button */}
//         {hasMoreReviews && (
//           <div className="text-center mt-4">
//             <button 
//               onClick={loadMoreReviews}
//               className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded"
//             >
//               Show More Reviews ({reviews.length - visibleReviews} remaining)
//             </button>
//           </div>
//         )}
        
//         {/* No Reviews Message */}
//         {reviews.length === 0 && (
//           <div className="text-center py-6 text-gray-500">
//             No reviews yet. Be the first to leave a review!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ReviewSection;















import React, { useState, useEffect } from 'react';
import { Star, StarHalf, User, X, Camera, Send } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ReviewSection = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    rating: 0,
    images: []
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [userId, setUserId] = useState('');
  const [visibleReviews, setVisibleReviews] = useState(4);
  const [isFormVisible, setIsFormVisible] = useState(false);

  // Fetch reviews and user info
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get reviews
        const reviewsRes = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/user/reviews/${id}`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        });
        
        setReviews(reviewsRes.data.reviews);
        
        // Calculate average rating
        const avgRating = reviewsRes.data.reviews.reduce((sum, review) => sum + review.star, 0) / reviewsRes.data.reviews.length;
        setAverageRating(avgRating || 0);
        
        // Get current user ID
        const userRes = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/me", {
          withCredentials: true
        });
        setUserId(userRes.data.user._id);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) {
      toast.error('You can only upload up to 3 images');
      return;
    }

    setNewReview(prev => ({ ...prev, images: files.slice(0, 3) }));
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    const updatedImages = [...newReview.images];
    updatedImages.splice(index, 1);
    
    const updatedPreviews = [...previewImages];
    URL.revokeObjectURL(updatedPreviews[index]);
    updatedPreviews.splice(index, 1);
    
    setNewReview(prev => ({ ...prev, images: updatedImages }));
    setPreviewImages(updatedPreviews);
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newReview.title);
      formData.append('description', newReview.description);
      formData.append('star', newReview.rating);
      newReview.images.forEach(image => formData.append('images', image));
      
      await axios.post(`https://pr-crafts-backend.vercel.app/api/v1/user/createreview/${id}`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      toast.success("Review Submitted");
      
      // Refresh reviews after submission
      const response = await axios.get(`https://pr-crafts-backend.vercel.app/api/v1/user/reviews/${id}`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      
      setReviews(response.data.reviews);
      const avgRating = response.data.reviews.reduce((sum, review) => sum + review.star, 0) / response.data.reviews.length;
      setAverageRating(avgRating || 0);
      
      // Reset form
      setNewReview({ title: '', description: '', rating: 0, images: [] });
      setPreviewImages([]);
      setIsFormVisible(false);
    } catch (error) {
      toast.error("Error submitting review");
      console.error('Error submitting review:', error);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/user/deletereview/${reviewId}`, {
        withCredentials: true
      });
      
      toast.success("Review deleted");
      
      // Update reviews list
      const updatedReviews = reviews.filter(review => review._id !== reviewId);
      setReviews(updatedReviews);
      
      // Recalculate average
      const avgRating = updatedReviews.length 
        ? updatedReviews.reduce((sum, review) => sum + review.star, 0) / updatedReviews.length 
        : 0;
      setAverageRating(avgRating);
    } catch (error) {
      toast.error("Error deleting review");
      console.error('Error deleting review:', error);
    }
  };

  // Load more reviews
  const loadMoreReviews = () => {
    setVisibleReviews(prev => prev + 4);
  };

  // Renders stars with half star support
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <StarHalf key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    
    return stars;
  };

  // Get visible reviews for pagination
  const displayedReviews = reviews.slice(0, visibleReviews);
  const hasMoreReviews = reviews.length > visibleReviews;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-black border-b pb-3 tracking-tight">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Customer Reviews
        </motion.span>
      </h2>
      
      {/* Rating Summary */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center mb-8 bg-gray-50 p-5 rounded-lg shadow-sm"
      >
        <div className="mr-6">
          <motion.span 
            initial={{ scale: 0.7 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5, type: "spring" }}
            className="text-4xl font-bold text-black"
          >
            {averageRating.toFixed(1)}
          </motion.span>
          <motion.div 
            className="flex mt-1"
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {renderStars(averageRating)}
          </motion.div>
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-sm text-gray-500 mt-1 block"
          >
            Based on {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
          </motion.span>
        </div>
      </motion.div>

      {/* Add Review Button */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <button 
          onClick={() => setIsFormVisible(!isFormVisible)}
          className="w-full py-3 mb-6 bg-black text-white font-medium rounded-md shadow hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
        >
          {isFormVisible ? 'Cancel Review' : 'Write a Review'}
          <Send className="ml-2 h-4 w-4" />
        </button>
      </motion.div>

      {/* Add Review Form */}
      <AnimatePresence>
        {isFormVisible && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-8 p-6 border border-gray-200 rounded-lg shadow-sm bg-white"
            >
              <h3 className="font-semibold mb-4 text-lg">Share Your Experience</h3>
              <form onSubmit={submitReview}>
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Rating*</label>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map(star => (
                      <motion.button 
                        key={star} 
                        type="button"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRatingChange(star)}
                        className="mr-1"
                      >
                        <Star 
                          className={`h-8 w-8 ${newReview.rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                                    transition-colors duration-200`} 
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Title*</label>
                  <input
                    type="text"
                    name="title"
                    value={newReview.title}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                    placeholder="Summarize your experience"
                    required
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Review*</label>
                  <textarea
                    name="description"
                    value={newReview.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200"
                    placeholder="Share the details of your experience"
                    required
                  ></textarea>
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium mb-2 text-gray-700">Images (up to 3)</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      id="file-upload"
                      multiple 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      aria-label="Upload images"
                    />
                    <div className="px-4 py-3 border border-dashed border-gray-300 rounded-md text-center flex items-center justify-center bg-gray-50 hover:bg-gray-100 transition-all duration-200">
                      <Camera className="h-5 w-5 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">Upload Photos</span>
                    </div>
                  </div>
                  
                  {previewImages.length > 0 && (
                    <motion.div 
                      className="flex flex-wrap gap-3 mt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {previewImages.map((src, index) => (
                        <motion.div 
                          key={index} 
                          className="relative"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1, duration: 0.3 }}
                        >
                          <img src={src} alt="Preview" className="w-20 h-20 object-cover border rounded-md shadow-sm" />
                          <motion.button 
                            type="button" 
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors duration-200"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X className="h-3 w-3" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </div>
                
                <motion.button 
                  type="submit" 
                  className="w-full px-4 py-3 bg-black text-white font-medium rounded-md shadow hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Review
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Review List */}
      <div className="space-y-6">
        <AnimatePresence>
          {displayedReviews.map((review, idx) => (
            <motion.div 
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="mb-6 p-5 border border-gray-100 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center mb-3">
                  {/* User Profile */}
                  <motion.div 
                    className="mr-4"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {review.userImage ? (
                      <img 
                        src={`https://pr-crafts-backend.vercel.app/${review.userImage}`} 
                        alt="User profile" 
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                    )}
                  </motion.div>
                  
                  {/* User Info and Rating */}
                  <div>
                    <div className="font-medium text-black">{review.userName || "Anonymous User"}</div>
                    <div className="flex items-center">
                      <div className="flex mr-2">
                        {renderStars(review.star)}
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Delete Button */}
                {review.userId === userId && (
                  <motion.button
                    onClick={() => deleteReview(review._id)}
                    className="text-white bg-black px-3 py-1 text-xs rounded-full hover:bg-red-600 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Delete
                  </motion.button>
                )}
              </div>
              
              {/* Review Content */}
              <div className="ml-16">
                <div className="font-medium text-black mb-2">{review.title}</div>
                <p className="text-gray-700 text-sm mb-3 leading-relaxed">{review.description}</p>
                
                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <motion.div 
                    className="flex gap-3 mt-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {review.images.map((image, index) => (
                      <motion.img 
                        key={image.public_id}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ duration: 0.2 }}
                        src={image?.url}
                        alt={`Review ${index + 1}`} 
                        className="w-20 h-20 object-cover border rounded-md shadow-sm cursor-pointer" 
                      />
                    ))}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {/* Load More Button */}
        {hasMoreReviews && (
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.button 
              onClick={loadMoreReviews}
              className="px-6 py-3 bg-white border border-gray-300 hover:border-black text-gray-800 rounded-md shadow-sm transition-all duration-300"
              whileHover={{ scale: 1.03, backgroundColor: "#f9f9f9" }}
              whileTap={{ scale: 0.97 }}
            >
              Load More Reviews ({reviews.length - visibleReviews} remaining)
            </motion.button>
          </motion.div>
        )}
        
        {/* No Reviews Message */}
        {reviews.length === 0 && (
          <motion.div 
            className="text-center py-16 text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="mb-4">
              <Star className="h-16 w-16 mx-auto text-gray-200" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No reviews yet</h3>
            <p className="text-gray-500">Be the first to share your experience!</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ReviewSection;