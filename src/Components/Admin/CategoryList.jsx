import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  IconButton,
  useTheme,
  useMediaQuery,
  Paper
} from '@mui/material';
import { 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import './CategoryList.css';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigateTo = useNavigate();
  const [categories, setCategories] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name:'',
    description:'',
    image:null
  });
  const [imagePreview, setImagePreview] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allcategory", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openDeleteDialog = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setSelectedCategory(null);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/post/deletecategory/${selectedCategory._id}`, {
        withCredentials: true
      });
      toast.success("Category deleted successfully");
      fetchCategories();
      closeDeleteDialog();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete category");
    }
  };

  const openEditDialog = (category) => {
    setSelectedCategory(category);
    setEditedCategory({
      name: category.title,
      description: category.description || '',
      image:category.image
    });
    setImagePreview(`https://pr-crafts-backend.vercel.app${category.image}`);
    setEditDialogOpen(true);
  };

  const closeEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedCategory(null);
    setEditedCategory({
      name: '',
      description: '',
      image: null,
      _id: null,
      hasImageChanged: false
    });
    setImagePreview('');
  };

  const handleEditNameChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      name: e.target.value
    });
  };

  const handleEditDescriptionChange = (e) => {
    setEditedCategory({
      ...editedCategory,
      description: e.target.value
    });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedCategory({
        ...editedCategory,
        image: file,
        hasImageChanged: true
      });
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSave = async (id) => {
    try {
      console.log(editedCategory);
      console.log(id);
      await axios.put(`https://pr-crafts-backend.vercel.app/api/v1/post/updatecategory/${id}`, {
        title:editedCategory.name,
        description:editedCategory.description,
        image:editedCategory.image
      }, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      
      toast.success("Category Updated");
      closeEditDialog();
      fetchCategories();
    } catch (error) {
      toast.error("Failed to update category");
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" className="category-list-container">
      <Box className="page-header">
        <Typography variant="h5" className="page-title">
          Category Management
        </Typography>
      </Box>
      
      <Grid container spacing={3} className="category-grid">
        {categories.length > 0 ? (
          categories.map(category => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card className="category-card">
                <CardMedia
                  component="img"
                  height={isMobile ? 140 : 180}
                  image={`https://pr-crafts-backend.vercel.app${category.image}`}
                  alt={category.title}
                  className="category-image"
                />

                <CardContent>
                  <Typography variant="h6" className="category-name">
                    {category.title}
                  </Typography>
                  {category.description && (
                    <Typography variant="body2" color="text.secondary" className="category-description">
                      {category.description}
                    </Typography>
                  )}
                </CardContent>
                <CardActions className="card-actions">
                  <IconButton 
                    aria-label="edit" 
                    className="edit-button"
                    onClick={() => openEditDialog(category)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    aria-label="delete" 
                    className="delete-button"
                    onClick={() => openDeleteDialog(category)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper className="no-results">
              <Typography variant="h6">
                No categories found
              </Typography>
              <Typography variant="body2">
                Add a new category to get started.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
      >
        <DialogTitle>
          {"Delete Category"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the category "{selectedCategory?.title}"? 
            This will also remove all associated products.
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog
        open={editDialogOpen}
        onClose={closeEditDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {"Edit Category"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Category Name"
            type="text"
            fullWidth
            value={editedCategory.name}
            onChange={handleEditNameChange}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={editedCategory.description}
            onChange={handleEditDescriptionChange}
            variant="outlined"
            sx={{ mb: 3 }}
          />
          
          <Box className="image-upload-container">
            <input
              accept="image/*"
              id="edit-category-image"
              type="file"
              hidden
              onChange={handleEditImageChange}
            />
            <label htmlFor="edit-category-image">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                className="upload-button"
              >
                Change Image
              </Button>
            </label>
            
            {imagePreview && (
              <Box className="edit-image-preview">
                <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>
                  Image Preview:
                </Typography>
                <img 
                  src={imagePreview} 
                  alt="Category preview" 
                  className="preview-image" 
                />
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog}>
            Cancel
          </Button>
          <Button onClick={() => handleEditSave(selectedCategory._id)} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryList;