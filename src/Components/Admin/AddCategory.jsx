import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Box,
  Grid,
  FormHelperText
} from '@mui/material';
import {useNavigate} from "react-router-dom";
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import './AddCategory.css';
import axios from 'axios';
import toast from "react-hot-toast"

const AddCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
    image: null
  });
  const navigateTo=useNavigate();
  const [imagePreview, setImagePreview] = useState('');
  const [errors, setErrors] = useState({});

  const handleNameChange = (e) => {
    setCategory({
      ...category,
      name: e.target.value
    });
    
    if (errors.name) {
      setErrors({
        ...errors,
        name: ''
      });
    }
  };

  const handleDescriptionChange = (e) => {
    setCategory({
      ...category,
      description: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({
        ...category,
        image: file
      });
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Clear error when image is selected
      if (errors.image) {
        setErrors({
          ...errors,
          image: ''
        });
      }
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(category);
    console.log(category.image);
    try {
      await axios.post("http://localhost:4000/api/v1/post/addcategory",{
         title:category.name,
         description:category.description,
         image:category.image
      },{
        withCredentials:true,
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });
      console.log("Yaha tak");
      toast.success("Category Added");
      navigateTo("/admindashboard");
    } catch (error) {
      console.log(error);
      toast.error("Category not added");
    }
  };

  return (
    <Container maxWidth="md" className="add-category-container">
      <Paper elevation={3} className="form-paper">
        <Typography variant="h5" className="form-title">
          Add New Category
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                label="Category Name"
                variant="outlined"
                fullWidth
                value={category.name}
                onChange={handleNameChange}
                error={!!errors.name}
                helperText={errors.name}
                className="form-input"
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Category Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={category.description}
                onChange={handleDescriptionChange}
                placeholder="Enter a detailed description of the category"
                className="form-input description-field"
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box className="image-upload-container">
                <input
                  accept="image/*"
                  id="category-image-upload"
                  type="file"
                  hidden
                  onChange={handleImageChange}
                />
                <label htmlFor="category-image-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    className="upload-button"
                  >
                    Upload Category Image
                  </Button>
                </label>
                
                {errors.image && (
                  <FormHelperText error>{errors.image}</FormHelperText>
                )}
                
                {imagePreview && (
                  <Box className="image-preview-container">
                    <Typography variant="subtitle2" className="preview-text">
                      Image Preview:
                    </Typography>
                    <img 
                      src={imagePreview} 
                      alt="Category preview" 
                      className="image-preview" 
                    />
                  </Box>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12} className="form-actions">
              <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                className="submit-button"
              >
                Add Category
              </Button>
              <Button 
                variant="outlined" 
                className="reset-button"
                onClick={() => {
                  setCategory({
                    name: '',
                    description: '',
                    image: null
                  });
                  setImagePreview('');
                  setErrors({});
                }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default AddCategory;