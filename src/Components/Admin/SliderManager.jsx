// import React, { useState, useEffect } from 'react';
// import { 
//   Box, 
//   Button, 
//   Container, 
//   Grid, 
//   Paper, 
//   Typography, 
//   IconButton,
//   CircularProgress,
//   Alert
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ImageIcon from '@mui/icons-material/Image';
// import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';
// import './SliderManager.css';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const SliderManager = () => {
//   const [images, setImages] = useState([]);
//   const [currentPreview, setCurrentPreview] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
  
//   // For a real implementation, you might fetch existing images
//   useEffect(() => {
//     const fetch=async()=>{
//         try {
//            const response=await axios.get("http://localhost:4000/api/v1/post/slider",{
//             withCredentials:true,
//             headers:{
//                 "Content-Type":"application/json"
//             }
//         });
//         setImages(response.data.sliders);  
//         } catch (error) {
//            console.log(error); 
//         }
//     }
//     fetch();
//   }, []);
  
//   const handleFileSelect = (event) => {
//     if (!event.target.files || event.target.files.length === 0) return;
    
//     if (images.length >= 5) {
//       setError("Maximum 5 images allowed. Please delete some images first.");
//       return;
//     }
    
//     const file = event.target.files[0];
    
//     if (!file.type.match('image.*')) {
//       setError("Please select an image file");
//       return;
//     }
    
//     setLoading(true);
    
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const newImage = {
//         id: Date.now(),
//         file: file,
//         preview: e.target.result,
//         name: file.name
//       };
      
//       setImages(prevImages => [...prevImages, newImage]);
//       setCurrentPreview(images.length);
//       setLoading(false);
//       setError(null);
//     };
    
//     reader.onerror = () => {
//       setLoading(false);
//       setError("Error reading file");
//     };
    
//     reader.readAsDataURL(file);
//   };
  
//   const handleDeleteImage = (id) => {
//     setImages(prevImages => {
//       const newImages = prevImages.filter(image => image.id !== id);
      
//       if (currentPreview >= newImages.length) {
//         setCurrentPreview(Math.max(0, newImages.length - 1));
//       }
      
//       return newImages;
//     });
    
//     setSuccess("Image deleted successfully");
//     setTimeout(() => setSuccess(null), 3000);
//   };
  
//   const handleSaveSlider = async (e) => {
//     e.preventDefault();
//     try {
//       if (!images || images.length === 0) {
//         toast.error("No images to upload");
//         return;
//       }
  
//       const formData = new FormData();
//       images.forEach((image) => {
//         if (image.file) {
//           formData.append("images", image.file); // Append only the file
//         }
//       });
  
//       setLoading(true);
  
//       const response = await axios.post(
//         "http://localhost:4000/api/v1/post/addslider",
//         formData,
//         {
//           withCredentials: true,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       toast.success("Slider Uploaded Successfully");
//     } catch (error) {
//       console.log(error);
//       toast.error("Failed to upload images");
//     } finally {
//       setLoading(false);
//     }
//   };
  
  
//   const handleNextPreview = () => {
//     setCurrentPreview(prev => (prev + 1) % images.length);
//   };
  
//   const handlePrevPreview = () => {
//     setCurrentPreview(prev => (prev - 1 + images.length) % images.length);
//   };

//   return (
//     <Container maxWidth="lg" className="slider-manager-container">
//       <Typography variant="h4" gutterBottom>
//         Slider Manager
//       </Typography>
//       <Typography variant="body1" color="textSecondary" paragraph>
//         Upload and manage images for your homepage slider. Maximum 5 images allowed.
//       </Typography>
      
//       {error && (
//         <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
//           {error}
//         </Alert>
//       )}
      
//       {success && (
//         <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
//           {success}
//         </Alert>
//       )}
      
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={7}>
//           <Paper elevation={3} className="preview-container">
//             <Typography variant="h6" gutterBottom className="section-title">
//               Slider Preview
//             </Typography>
//             {console.log(images)}
//             <Box className="slider-preview">
//               {images.length > 0 ? (
//                 <>
//                   <Box className="slider-image-wrapper">
//                     <img 
//                       src={`http://localhost:4000/${images[currentPreview].images}`} 
//                       alt="Slider preview" 
//                       className="preview-image"
//                     />
                    
//                     {images.length > 1 && (
//                       <>
//                         <IconButton 
//                           className="nav-button prev-button"
//                           onClick={handlePrevPreview}
//                         >
//                           <NavigateBeforeIcon />
//                         </IconButton>
                        
//                         <IconButton 
//                           className="nav-button next-button"
//                           onClick={handleNextPreview}
//                         >
//                           <NavigateNextIcon />
//                         </IconButton>
//                       </>
//                     )}
//                   </Box>
                  
//                   <Box className="preview-indicator">
//                     {images.map((_, index) => (
//                       <Box 
//                         key={index}
//                         className={`indicator-dot ${index === currentPreview ? 'active' : ''}`}
//                         onClick={() => setCurrentPreview(index)}
//                       />
//                     ))}
//                   </Box>
//                 </>
//               ) : (
//                 <Box className="empty-preview">
//                   <ImageIcon sx={{ fontSize: 60, color: '#d4a373', opacity: 0.5 }} />
//                   <Typography variant="body1" color="textSecondary">
//                     No images uploaded yet
//                   </Typography>
//                 </Box>
//               )}
//             </Box>
//           </Paper>
//         </Grid>
        
//         <Grid item xs={12} md={5}>
//           <Paper elevation={3} className="upload-container">
//             <Typography variant="h6" gutterBottom className="section-title">
//               Upload Images
//             </Typography>
            
//             <Box className="upload-area">
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="slider-image-upload"
//                 style={{ display: 'none' }}
//                 onChange={handleFileSelect}
//               />
//               <label htmlFor="slider-image-upload">
//                 <Button 
//                   variant="contained" 
//                   component="span"
//                   disabled={images.length >= 5 || loading}
//                   startIcon={<ImageIcon />}
//                   className="upload-button"
//                   sx={{ bgcolor: '#7c9c99', '&:hover': { bgcolor: '#6b8b88' } }}
//                 >
//                   Select Image
//                 </Button>
//               </label>
              
//               <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
//                 {images.length}/5 images uploaded
//               </Typography>
//             </Box>
            
//             <Box className="images-list" sx={{ mt: 2 }}>
//               <Typography variant="subtitle1" gutterBottom>
//                 Uploaded Images
//               </Typography>
              
//               {images.length === 0 ? (
//                 <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
//                   No images uploaded yet
//                 </Typography>
//               ) : (
//                 <Grid container spacing={1}>
//                   {images.map((image, index) => (
//                     <Grid item xs={6} key={image._id}>
//                       <Paper elevation={1} className="image-item">
//                         <Box className="image-thumbnail">
//                         {console.log(image.images[index])}
//                         {console.log(index)}
//                           <img src={`http://localhost:4000$/{image.images[index]}`} alt={`Thumbnail ${index}`} />
//                         </Box>
//                         <Box className="image-info">
//                           <Typography variant="body2" noWrap title={image.name}>
//                             Image {currentPreview}
//                           </Typography>
//                           <IconButton 
//                             size="small" 
//                             color="error"
//                             onClick={() => handleDeleteImage(image._id)}
//                             className="delete-button"
//                           >
//                             <DeleteIcon fontSize="small" />
//                           </IconButton>
//                         </Box>
//                       </Paper>
//                     </Grid>
//                   ))}
//                 </Grid>
//               )}
//             </Box>
            
//             <Button 
//               variant="contained" 
//               color="secondary"
//               fullWidth
//               sx={{ mt: 3, bgcolor: '#d4a373', '&:hover': { bgcolor: '#c39363' } }}
//               onClick={handleSaveSlider}
//               disabled={images.length === 0 || loading}
//             >
//               {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Slider Images'}
//             </Button>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// export default SliderManager;















import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  IconButton,
  CircularProgress,
  Alert,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import './SliderManager.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const SliderManager = () => {
  // State for existing images from the server
  const [serverImages, setServerImages] = useState([]);
  // State for newly uploaded images
  const [newImages, setNewImages] = useState([]);
  const [currentPreview, setCurrentPreview] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [imageTitle, setImageTitle] = useState('');
  
  // Fetch existing images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/post/slider", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setServerImages(response.data.sliders);
      } catch (error) {
        console.log(error);
        setError("Failed to load existing images");
      }
    };
    fetchImages();
  }, []);
  
  // Combined images for display (server images + new uploads)
  const allImages = [...serverImages, ...newImages];
  
  const handleFileSelect = (event) => {
    if (!event.target.files || event.target.files.length === 0) return;
    
    if (allImages.length >= 5) {
      setError("Maximum 5 images allowed. Please delete some images first.");
      return;
    }
    
    const file = event.target.files[0];
    
    if (!file.type.match('image.*')) {
      setError("Please select an image file");
      return;
    }
    
    setLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const newImage = {
        id: Date.now(),
        file: file,
        preview: e.target.result,
        name: file.name,
        title: imageTitle || 'Untitled Image', // Use the title or default
        isNew: true // Flag to identify newly uploaded images
      };
      
      setNewImages(prevImages => [...prevImages, newImage]);
      setCurrentPreview(allImages.length);
      setLoading(false);
      setError(null);
      setImageTitle(''); // Reset title field
    };
    
    reader.onerror = () => {
      setLoading(false);
      setError("Error reading file");
    };
    
    reader.readAsDataURL(file);
  };
  
  const handleDeleteImage = async (image, index) => {
    if (image.isNew) {
      // For new uploads, just remove from state
      setNewImages(prevImages => prevImages.filter(img => img.id !== image.id));
    } else {
      // For server images, make API call to delete
      try {
        await axios.delete(`http://localhost:4000/api/v1/post/deleteslider/${image._id}`, {
          withCredentials: true
        });
        
        setServerImages(prevImages => prevImages.filter(img => img._id !== image._id));
      } catch (error) {
        console.log(error);
        setError("Failed to delete image");
        return;
      }
    }
    
    // Adjust current preview if needed
    if (currentPreview >= allImages.length - 1) {
      setCurrentPreview(Math.max(0, allImages.length - 2));
    }
    
    setSuccess("Image deleted successfully");
    setTimeout(() => setSuccess(null), 3000);
  };
  
  const handleSaveSlider = async (e) => {
    e.preventDefault();
    try {
      if (newImages.length === 0) {
        toast.error("No new images to upload");
        return;
      }
  
      const formData = new FormData();
      newImages.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
          formData.append("title", image.title); // Add titles to formData
        }
      });
  
      setLoading(true);
  
      const response = await axios.post(
        "http://localhost:4000/api/v1/post/addslider",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Slider Uploaded")
      // After successful upload, move images from new to server
      setServerImages(prev => [...prev,response.data.slider]);
      setNewImages([]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload images");
    } finally {
      setLoading(false);
    }
  };
  
  const handleNextPreview = () => {
    setCurrentPreview(prev => (prev + 1) % allImages.length);
  };
  
  const handlePrevPreview = () => {
    setCurrentPreview(prev => (prev - 1 + allImages.length) % allImages.length);
  };

  // Get the correct image source based on whether it's a new or server image
  const getImageSource = (image) => {
    if (image.isNew) {
      return image.preview;
    } else {
      return `http://localhost:4000/${image.images}`;
    }
  };

  return (
    <Container maxWidth="lg" className="slider-manager-container">
      <Typography variant="h4" gutterBottom>
        Slider Manager
      </Typography>
      <Typography variant="body1" color="textSecondary" paragraph>
        Upload and manage images for your homepage slider. Maximum 5 images allowed.
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper elevation={3} className="preview-container">
            <Typography variant="h6" gutterBottom className="section-title">
              Slider Preview
            </Typography>
            <Box className="slider-preview">
              {allImages.length > 0 ? (
                <>
                  <Box className="slider-image-wrapper">
                    <img 
                      src={getImageSource(allImages[currentPreview])}
                      alt="Slider preview" 
                      className="preview-image"
                    />
                    
                    {/* Title display */}
                    <Box className="image-title-overlay" sx={{
                      position: 'absolute',
                      bottom: '20px',
                      left: '0',
                      right: '0',
                      textAlign: 'center',
                      background: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      padding: '8px'
                    }}>
                      <Typography variant="subtitle1">
                        {allImages[currentPreview].title || 'Untitled Image'}
                      </Typography>
                    </Box>
                    
                    {/* Delete button in the preview */}
                    <IconButton 
                      className="delete-preview-button"
                      color="error"
                      onClick={() => handleDeleteImage(allImages[currentPreview], currentPreview)}
                      sx={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        bgcolor: 'rgba(255,255,255,0.7)',
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    
                    {allImages.length > 1 && (
                      <>
                        <IconButton 
                          className="nav-button prev-button"
                          onClick={handlePrevPreview}
                        >
                          <NavigateBeforeIcon />
                        </IconButton>
                        
                        <IconButton 
                          className="nav-button next-button"
                          onClick={handleNextPreview}
                        >
                          <NavigateNextIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                  
                  <Box className="preview-indicator">
                    {allImages.map((_, index) => (
                      <Box 
                        key={index}
                        className={`indicator-dot ${index === currentPreview ? 'active' : ''}`}
                        onClick={() => setCurrentPreview(index)}
                      />
                    ))}
                  </Box>
                </>
              ) : (
                <Box className="empty-preview">
                  <ImageIcon sx={{ fontSize: 60, color: '#d4a373', opacity: 0.5 }} />
                  <Typography variant="body1" color="textSecondary">
                    No images uploaded yet
                  </Typography>
                </Box>
              )}
            </Box>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={5}>
          <Paper elevation={3} className="upload-container">
            <Typography variant="h6" gutterBottom className="section-title">
              Upload Images
            </Typography>
            
            <Box className="upload-area">
              {/* Title input field */}
              <TextField
                label="Image Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={imageTitle}
                onChange={(e) => setImageTitle(e.target.value)}
                placeholder="Enter a title for your image"
                sx={{ mb: 2 }}
              />
              
              <input
                type="file"
                accept="image/*"
                id="slider-image-upload"
                style={{ display: 'none' }}
                onChange={handleFileSelect}
              />
              <label htmlFor="slider-image-upload">
                <Button 
                  variant="contained" 
                  component="span"
                  disabled={allImages.length >= 5 || loading}
                  startIcon={<ImageIcon />}
                  className="upload-button"
                  sx={{ bgcolor: '#7c9c99', '&:hover': { bgcolor: '#6b8b88' } }}
                >
                  Select Image
                </Button>
              </label>
              
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {allImages.length}/5 images uploaded
              </Typography>
            </Box>
            
            <Box className="images-list" sx={{ mt: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Uploaded Images
              </Typography>
              
              {allImages.length === 0 ? (
                <Typography variant="body2" color="textSecondary" sx={{ fontStyle: 'italic' }}>
                  No images uploaded yet
                </Typography>
              ) : (
                <Grid container spacing={1}>
                  {allImages.map((image, index) => (
                    <Grid item xs={6} key={image.isNew ? image.id : image._id}>
                      <Paper elevation={1} className="image-item">
                        <Box className="image-thumbnail">
                          <img 
                            src={getImageSource(image)} 
                            alt={`Thumbnail ${index}`} 
                          />
                        </Box>
                        <Box className="image-info">
                          <Typography variant="body2" noWrap title={image.title || `Image ${index + 1}`}>
                            {image.title || `Image ${index + 1}`}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDeleteImage(image, index)}
                            className="delete-button"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
            
            <Button 
              variant="contained" 
              color="secondary"
              fullWidth
              sx={{ mt: 3, bgcolor: '#d4a373', '&:hover': { bgcolor: '#c39363' } }}
              onClick={handleSaveSlider}
              disabled={newImages.length === 0 || loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Slider Images'}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SliderManager;