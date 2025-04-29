import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  InputAdornment,
  Box,
  Alert,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon, ImagesearchRoller } from '@mui/icons-material';
import './AddProduct.css';
import axios from 'axios';
import toast from "react-hot-toast";

// Stock options based on enum
const stockOptions = ["Active", "Out Of Stocks"];

// Tag options based on enum
const tagOptions = ["New Arrival", "Best Seller", "Limited Edition"];

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, error: null });
  const [state, setState] = useState({
    productData: {
      title: '',
      description: '',
      price: '',
      quantity: '',
      size: '',
      specification: '',
      stock: 'Active',
      tag: 'New Arrival',
      discount:'',
      categoryId: '',
      videoLink: ''
    },
    errors: {},
    imageFiles: [], // Store actual file objects
    imagePreview: []
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/categoryname", {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        });
        setCategories(response.data.categoriesName);
      } catch (error) {
        console.log("Error fetching categories:", error);
      }
    };
    
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      productData: {
        ...prevState.productData,
        [name]: value
      }
    }));
  };
  
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      const newPreviews = files.map(file => URL.createObjectURL(file));
      
      setState(prevState => ({
        ...prevState,
        imageFiles: [...prevState.imageFiles, ...files],
        imagePreview: [...prevState.imagePreview, ...newPreviews]
      }));
    }
  };
  
 




  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
    
  //   try {
  //     // Create a FormData object for multipart/form-data
  //     const formData = new FormData();
      
  //     // Append all product data to the FormData object
  //     formData.append('title', state.productData.title);
  //     formData.append('description', state.productData.description);
  //     formData.append('price', state.productData.price);
  //     formData.append('discount', state.productData.discount);
  //     formData.append('specification', state.productData.specification);
  //     formData.append('quantity', state.productData.quantity);
  //     formData.append('size', state.productData.size);
  //     formData.append('stock', state.productData.stock);
  //     formData.append('tag', state.productData.tag);
  //     if (state.imageFiles && state.imageFiles.length > 0) {
  //       state.imageFiles.forEach((file) => {
  //         formData.append('images', file);
  //       });
  //     }
  //     console.log(formData);
      
  //     const response = await axios.post(
  //       `https://pr-crafts-backend.vercel.app/api/v1/post/createpost/${state.productData.categoryId}`,
  //       formData,
  //       {
  //         withCredentials: true,
  //         headers: {
  //           "Content-Type": "multipart/form-data"
  //         }
  //       }
  //     );
      
  //     setSubmitStatus({ success: true, error: null });
  //     toast.success("Product Added");
  //     console.log("Product created:", response.data);
      
  //     // Reset form after successful submission
  //     setState({
  //       productData: {
  //         title: '',
  //         description: '',
  //         price: '',
  //         quantity: '',
  //         size: '',
  //         specification: '',
  //         stock: 'Active',
  //         tag: 'New Arrival',
  //         discount:'',
  //         categoryId: '',
  //       },
  //       errors: {},
  //       imageFiles: [],
  //       imagePreview: []
  //     });
      
  //   } catch (error) {
  //     console.error("Error creating product:", error);
  //     setSubmitStatus({ 
  //       success: false, 
  //       error: error.response?.data?.message || "Failed to add product" 
  //     });
  //     toast.error("Failed to add product");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Check if image files exist
      if (!state.imageFiles || state.imageFiles.length === 0) {
        toast.error("At least one Post Image is Needed");
        setLoading(false);
        return;
      }
  
      // Validate image formats
      const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
      const invalidImages = state.imageFiles.filter(
        file => !allowedFormats.includes(file.type)
      );
  
      if (invalidImages.length > 0) {
        toast.error("Some image formats are not supported");
        setLoading(false);
        return;
      }
      // Create FormData for multipart upload
      const formData = new FormData();
      
      // Append text fields
      formData.append('title', state.productData.title);
      formData.append('description', state.productData.description);
      formData.append('price', state.productData.price);
      formData.append('size', state.productData.size);
      formData.append('specification', state.productData.specification);
      formData.append('quantity', state.productData.quantity);
      formData.append('tag', state.productData.tag);
      formData.append('stock', state.productData.stock);
      formData.append('discount', state.productData.discount);
      formData.append('videoLink', state.productData.videoLink);
      
      // Append multiple image files
      state.imageFiles.forEach((file, index) => {
        formData.append('postImages', file);
      });
      
      // Send POST request
      const response = await axios.post(
        `https://pr-crafts-backend.vercel.app/api/v1/post/createpost/${state.productData.categoryId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      
      // Success handling
      toast.success("Post created");
      console.log("Product created:", response.data);
      
      // Reset form state
      setState({
        productData: {
          title: '',
          description: '',
          price: '',
          quantity: '',
          size: '',
          specification: '',
          stock: 'Active',
          tag: 'New Arrival',
          discount: '',
          categoryId: '',
        },
        errors: {},
        imageFiles: [],
        imagePreview: []
      });
      
    } catch (error) {
      // Error handling
      console.error("Error creating product:", error);
      const errorMessage = error.response?.data?.message || "Failed to add product";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  









  
  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>
        Add New Product
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3 }}>
        {submitStatus.success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Product created successfully!
          </Alert>
        )}
        
        {submitStatus.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {submitStatus.error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid item xs={12}>
              <TextField
                label="Product Title"
                name="title"
                value={state.productData.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            
            {/* Description */}
            <Grid item xs={12}>
              <TextField
                label="Product Description"
                name="description"
                value={state.productData.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Insta Video Link"
                name="videoLink"
                value={state.productData.videoLink}
                onChange={handleInputChange}
                fullWidth
              />
            </Grid>
            
            {/* Price */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Price"
                name="price"
                value={state.productData.price}
                onChange={handleInputChange}
                fullWidth
                type="number"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                }}
              />
            </Grid>

            {/* Discount */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Discount"
                name="discount"
                value={state.productData.discount}
                onChange={handleInputChange}
                fullWidth
                type="number"
                required
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
              />
            </Grid>






            
            {/* Quantity */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Quantity"
                name="quantity"
                value={state.productData.quantity}
                onChange={handleInputChange}
                fullWidth
                type="number"
                required
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            
            {/* Size */}
            <Grid item xs={12} md={4}>
              <TextField
                label="Size"
                name="size"
                value={state.productData.size}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            
            {/* Specification */}
            <Grid item xs={12}>
              <TextField
                label="Specification"
                name="specification"
                value={state.productData.specification}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={2}
                required
              />
            </Grid>
            
            {/* Stock Status */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Stock Status</InputLabel>
                <Select
                  name="stock"
                  value={state.productData.stock}
                  onChange={handleInputChange}
                  label="Stock Status"
                >
                  {stockOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Tag */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Tag</InputLabel>
                <Select
                  name="tag"
                  value={state.productData.tag}
                  onChange={handleInputChange}
                  label="Tag"
                >
                  {tagOptions.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Category */}
            <Grid item xs={12} md={4}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="categoryId"
                  value={state.productData.categoryId}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.map(category => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            {/* Images */}
            <Grid item xs={12}>
              <input
                accept="image/*"
                id="product-images"
                type="file"
                hidden
                multiple
                onChange={handleImageUpload}
              />
              <label htmlFor="product-images">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload Images
                </Button>
              </label>
              {state.imageFiles.length > 0 && (
                <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                  {state.imageFiles.length} image(s) selected
                </Typography>
              )}
            </Grid>
            
            {/* Image Previews */}
            {state.imagePreview.length > 0 && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {state.imagePreview.map((src, index) => (
                    <Box
                      key={index}
                      component="img"
                      src={src}
                      sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
                    />
                  ))}
                </Box>
              </Grid>
            )}
            
            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add Product'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddProduct;




