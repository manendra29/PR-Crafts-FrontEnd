// import React, { useEffect, useState } from 'react';
// import { 
//   Container, 
//   Typography, 
//   Box, 
//   Paper, 
//   Grid,
//   TextField,
//   InputAdornment,
//   Card,
//   CardMedia,
//   CardContent,
//   Chip,
//   CardActions,
//   Button,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Pagination,
// } from '@mui/material';
// import { 
//   Search as SearchIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
// } from '@mui/icons-material';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 6;

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/categoryname", {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       setCategories(response.data.categoriesName);
//     } catch (error) {
//       console.log("Error fetching categories:", error);
//     }
//   };

//   const fetchPost = async () => {
//     try {
//       const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allproducts", {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       setProducts(response.data.posts);
//     } catch (error) {
//       console.log("Error fetching post:", error);
//     }
//   }

//   useEffect(() => {
//     fetchCategories();
//     fetchPost();
//   }, []);
      
//   // Handler functions
//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };
  
//   const handleCategoryFilterChange = (e) => {
//     setCategoryFilter(e.target.value);
//     setCurrentPage(1);
//   };
  
//   const handlePageChange = (event, value) => {
//     setCurrentPage(value);
//   };
  
//   const handleDeleteProduct = async (productId) => {
//     try {
//       await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/post/deletepost/${productId}`, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json"
//         }
//       });
//       toast.success("Product deleted successfully");
//       fetchPost(); // Refresh the product list after deletion
//     } catch (error) {
//       console.log("Error deleting product:", error);
//       toast.error("Failed to delete product");
//     }
//   };
  
//   const filteredProducts = products.filter(product => {
//     const matchesSearch = searchTerm === '' || 
//       (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
//     // Fixed category filtering - compare IDs directly
//     const matchesCategory = !categoryFilter || product.categoryId === categoryFilter;
    
//     return matchesSearch && matchesCategory;
//   });
  
//   // Pagination
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <Container maxWidth="lg">
//       <Box my={3}>
//         <Typography variant="h5">
//           Products
//         </Typography>
//         <Button 
//           variant="contained" 
//           color="primary"
//           href="/admin/add-product"
//         >
//           Add New Product
//         </Button>
//       </Box>
      
//       <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
//         <Grid container spacing={2}>
//           <Grid item xs={12} md={8}>
//             <TextField
//               fullWidth
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={handleSearch}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
//           <Grid item xs={12} md={4}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={categoryFilter}
//                 onChange={handleCategoryFilterChange}
//                 label="Category"
//               >
//                 <MenuItem value="">All Categories</MenuItem>
//                 {categories.map(category => (
//                   <MenuItem key={category._id} value={category._id}>
//                     {category.title}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Paper>
      
//       <Box mb={2}>
//         <Typography variant="body2" color="textSecondary">
//           Showing {currentProducts.length} of {filteredProducts.length} products
//         </Typography>
//       </Box>
      
//       {currentProducts.length > 0 ? (
//         <Grid container spacing={3}>
//           {currentProducts.map(product => (
//             <Grid item xs={12} sm={6} md={4} key={product._id}>
//               <Card sx={{ height: '100%' }}>
//                 <CardMedia
//                   component="img"
//                   height="160"
//                   image={`https://pr-crafts-backend.vercel.app/${product.postImages}`}
//                   alt={product.title}
//                 />
                
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     {product.title}
//                   </Typography>
                  
//                   <Chip 
//                     label={categories.find(cat => cat._id === product.categoryId)?.title || "Unknown"} 
//                     size="small" 
//                     sx={{ mb: 1 }}
//                   />
                  
//                   <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
//                     <Typography variant="h6" color="primary">
//                       ${product.price ? product.price.toFixed(2) : "0.00"}
//                     </Typography>
//                   </Box>
//                 </CardContent>
                
//                 <CardActions>
//                   <Button 
//                     size="small" 
//                     startIcon={<EditIcon />}
//                     href={`/admin/edit-product/${product._id}`}
//                   >
//                     Edit
//                   </Button>
//                   <Button 
//                     size="small" 
//                     color="error"
//                     startIcon={<DeleteIcon />}
//                     onClick={() => handleDeleteProduct(product._id)}
//                   >
//                     Delete
//                   </Button>
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Paper sx={{ p: 3, textAlign: 'center' }}>
//           <Typography variant="h6">
//             No products found
//           </Typography>
//           <Button 
//             variant="contained" 
//             color="primary"
//             onClick={() => {
//               setSearchTerm('');
//               setCategoryFilter('');
//             }}
//             sx={{ mt: 2 }}
//           >
//             Reset Search
//           </Button>
//         </Paper>
//       )}
      
//       {totalPages > 1 && (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <Pagination 
//             count={totalPages} 
//             page={currentPage} 
//             onChange={handlePageChange}
//             color="primary"
//           />
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default ProductList;






import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Search, Edit, Delete, Close } from '@mui/icons-material';


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingProduct, setEditingProduct] = useState(null);
  const productsPerPage = 6;

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

  const fetchPost = async () => {
    try {
      const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/post/allproducts", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      setProducts(response.data.posts);
    } catch (error) {
      console.log("Error fetching post:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchPost();
  }, []);
      
  // Handler functions
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1);
  };
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`https://pr-crafts-backend.vercel.app/api/v1/post/deletepost/${productId}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("Product deleted successfully");
      fetchPost(); // Refresh the product list after deletion
    } catch (error) {
      console.log("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct({
      ...product,
      // Make a copy to avoid direct state mutation
    });
  };

  const handleEditCancel = () => {
    setEditingProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct(prev => ({
      ...prev,
      [name]: ['price', 'quantity', 'discount'].includes(name) ? parseFloat(value) : value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://pr-crafts-backend.vercel.app/api/v1/post/updatepost/${editingProduct._id}`, editingProduct, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });
      toast.success("Product updated successfully");
      fetchPost(); // Refresh the product list after update
      setEditingProduct(null); // Close the edit form
    } catch (error) {
      console.log("Error updating product:", error);
      toast.error("Failed to update product");
    }
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = !categoryFilter || product.categoryId === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Products</h1>
        <a 
          href="/admin/add-product"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
        >
          Add New Product
        </a>
      </div>
      
      {/* Search and Filter Section */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search products..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
          <div>
            <select
              value={categoryFilter}
              onChange={handleCategoryFilterChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 py-2 px-3"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Product Count */}
      <div className="mb-4">
        <p className="text-sm text-gray-500">
          Showing {currentProducts.length} of {filteredProducts.length} products
        </p>
      </div>
      
      {/* Edit Form Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 my-8">
            <div className="flex justify-between items-center border-b p-4">
              <h2 className="text-lg font-medium">Edit Product</h2>
              <button 
                onClick={handleEditCancel}
                className="text-gray-400 hover:text-gray-500"
              >
                <Close className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-screen p-4">
              <form onSubmit={handleEditSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Basic Information Section */}
                  <div className="md:col-span-2">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Basic Information</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Product Title*
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={editingProduct.title || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Price ($)*
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editingProduct.price || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category*
                    </label>
                    <select
                      name="categoryId"
                      value={editingProduct.categoryId || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Size
                    </label>
                    <input
                      type="text"
                      name="size"
                      value={editingProduct.size || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  {/* Inventory Information */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Inventory Information</h3>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={editingProduct.quantity || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Stock Status
                    </label>
                    <select
                      name="stock"
                      value={editingProduct.stock || 'Active'}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Out Of Stocks">Out Of Stock</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      value={editingProduct.discount || ''}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      max="100"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tag
                    </label>
                    <select
                      name="tag"
                      value={editingProduct.tag || 'New Arrival'}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="New Arrival">New Arrival</option>
                      <option value="BestSeller">Best Seller</option>
                      <option value="Limited Edition">Limited Edition</option>
                    </select>
                  </div>
                  
                  {/* Product Details */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Product Details</h3>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={editingProduct.description || ''}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Specification
                    </label>
                    <textarea
                      name="specification"
                      value={editingProduct.specification || ''}
                      onChange={handleEditChange}
                      rows="3"
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>
                  
                  {/* Images section - Read-only because we can't edit images directly in this form */}
                  <div className="md:col-span-2 mt-4">
                    <h3 className="text-md font-medium text-gray-800 mb-2">Product Images</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {editingProduct.postImages?.length || 0} image(s) uploaded. To change images, please use the dedicated image upload feature.
                    </p>
                    
                    {editingProduct.postImages && editingProduct.postImages.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {Array.isArray(editingProduct.postImages) 
                          ? editingProduct.postImages.map((img, index) => (
                              <div key={index} className="relative h-24 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={`https://pr-crafts-backend.vercel.app/${img}`} 
                                  alt={`Product ${index + 1}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ))
                          : (
                              <div className="relative h-24 bg-gray-100 rounded overflow-hidden">
                                <img 
                                  src={`https://pr-crafts-backend.vercel.app/${editingProduct.postImages}`} 
                                  alt="Product"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )
                        }
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleEditCancel}
                    className="bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Product Cards */}
      {currentProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentProducts.map(product => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full transition-transform hover:scale-102 hover:shadow-lg">
              <div className="h-48 overflow-hidden">
                <img
                  src={product.postImages[0]?.url}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              <div className="p-4 flex-grow">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                  {product.title}
                </h2>
                
                <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-3">
                  {categories.find(cat => cat._id === product.categoryId)?.title || "Unknown"}
                </span>
                
                <p className="text-xl font-bold text-blue-600">
                  ${product.price ? product.price.toFixed(2) : "0.00"}
                </p>
              </div>
              
              <div className="border-t px-4 py-3 bg-gray-50 flex justify-between">
                <button 
                  onClick={() => handleEditClick(product)}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteProduct(product._id)}
                  className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                >
                  <Delete className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            No products found
          </h2>
          <button 
            onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
          >
            Reset Search
          </button>
        </div>
      )}
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <button
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              &laquo;
            </button>
            
            {[...Array(totalPages).keys()].map(number => (
              <button
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`px-3 py-1 rounded-md ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                {number + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              &raquo;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;