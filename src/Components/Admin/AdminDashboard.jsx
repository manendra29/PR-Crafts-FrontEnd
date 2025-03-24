// import React, { useState } from 'react';
// import { Box, Container, Grid, Paper, Typography, useTheme, useMediaQuery } from '@mui/material';
// import Sidebar from './Sidebar';
// import AddCategory from './AddCategory';
// import CategoryList from './CategoryList';
// import AddProduct from './AddProduct';
// import ProductList from './ProductList';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { CssBaseline } from '@mui/material';
// import './AdminDashboard.css';

// // Create a custom theme with paper craft inspired colors
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#7c9c99', // Soft teal/green for paper crafts
//     },
//     secondary: {
//       main: '#d4a373', // Warm craft paper brown
//     },
//     background: {
//       default: '#f8f9fa',
//       paper: '#ffffff',
//     },
//   },
//   typography: {
//     fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
//   },
// });

// const DashboardHome = () => {
//   const theme = useTheme();
  
//   // Mock data for dashboard stats
//   const stats = [
//     { title: 'Total Categories', count: 12, color: '#7c9c99' },
//     { title: 'Total Products', count: 48, color: '#d4a373' },
//     { title: 'Recent Orders', count: 8, color: '#e9c46a' },
//     { title: 'Low Stock Items', count: 5, color: '#f4a261' }
//   ];

//   return (
//     <Container maxWidth="lg" className="dashboard-container">
//       <Typography variant="h4" className="dashboard-welcome">
//         Welcome to PrCrafts Admin
//       </Typography>
//       <Typography variant="body1" className="dashboard-subtitle">
//         Manage your handmade paper crafts inventory and categories
//       </Typography>
      
//       <Grid container spacing={3} className="dashboard-stats">
//         {stats.map((stat, index) => (
//           <Grid item xs={12} sm={6} md={3} key={index}>
//             <Paper 
//               elevation={2} 
//               className="stat-card"
//               sx={{ 
//                 borderTop: `4px solid ${stat.color}`,
//                 height: '100%'
//               }}
//             >
//               <Typography variant="h6" className="stat-title">
//                 {stat.title}
//               </Typography>
//               <Typography variant="h3" className="stat-count" sx={{ color: stat.color }}>
//                 {stat.count}
//               </Typography>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
      
//       <Grid container spacing={3} className="dashboard-quick-actions">
//         <Grid item xs={12}>
//           <Paper elevation={2} className="quick-actions-paper">
//             <Typography variant="h6" className="section-title">
//               Quick Actions
//             </Typography>
//             <Box className="quick-actions-buttons">
//               <button 
//                 className="quick-action-btn" 
//                 onClick={() => window.location.href='/admin/add-category'}
//               >
//                 Add New Category
//               </button>
//               <button 
//                 className="quick-action-btn" 
//                 onClick={() => window.location.href='/admin/add-product'}
//               >
//                 Add New Product
//               </button>
//               <button 
//                 className="quick-action-btn" 
//                 onClick={() => window.location.href='/admin/products'}
//               >
//                 View All Products
//               </button>
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// };

// function AdminDashboard() {
//   const [activeComponent, setActiveComponent] = useState('dashboard');
//   const [mobileOpen, setMobileOpen] = useState(false);
  
//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const renderComponent = () => {
//     switch (activeComponent) {
//       case 'dashboard':
//         return <DashboardHome />;
//       case 'addCategory':
//         return <AddCategory />;
//       case 'categories':
//         return <CategoryList />;
//       case 'addProduct':
//         return <AddProduct />;
//       case 'products':
//         return <ProductList />;
//       default:
//         return <DashboardHome />;
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Box sx={{ display: 'flex', minHeight: '100vh' }}>
//         <Sidebar 
//           activeComponent={activeComponent} 
//           setActiveComponent={setActiveComponent}
//           mobileOpen={mobileOpen}
//           handleDrawerToggle={handleDrawerToggle}
//         />
//         <Box
//           component="main"
//           sx={{ 
//             flexGrow: 1, 
//             p: { xs: 2, md: 3 }, 
//             width: { sm: `calc(100% - 240px)` },
//             marginLeft: { xs: 0 },
//             transition: 'margin 0.2s ease-in-out',
//             backgroundColor: '#f8f9fa'
//           }}
//         >
//           <Box sx={{ height: { xs: '48px', sm: '24px' } }} /> {/* Spacer for fixed mobile menu */}
//           {renderComponent()}
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// export default AdminDashboard;













import React, { useState } from 'react';
import { Box, Container, Grid, Paper, Typography, useTheme, useMediaQuery, Button } from '@mui/material';
import Sidebar from './Sidebar';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';
import AddProduct from './AddProduct';
import ProductList from './ProductList';
import SliderManager from './SliderManager'; // Import the new component
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import './AdminDashboard.css';
import Header from '../Layout/Header';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

// Create a custom theme with paper craft inspired colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#7c9c99', // Soft teal/green for paper crafts
    },
    secondary: {
      main: '#d4a373', // Warm craft paper brown
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

const DashboardHome = () => {
  const theme = useTheme();
  
  // Mock data for dashboard stats
  const stats = [
    { title: 'Total Categories', count: 12, color: '#7c9c99' },
    { title: 'Total Products', count: 48, color: '#d4a373' },
    { title: 'Recent Orders', count: 8, color: '#e9c46a' },
    { title: 'Low Stock Items', count: 5, color: '#f4a261' }
  ];

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Typography variant="h4" className="dashboard-welcome">
        Welcome to PrCrafts Admin
      </Typography>
      <Typography variant="body1" className="dashboard-subtitle">
        Manage your handmade paper crafts inventory and categories
      </Typography>
      
      <Grid container spacing={3} className="dashboard-stats">
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={2} 
              className="stat-card"
              sx={{ 
                borderTop: `4px solid ${stat.color}`,
                height: '100%'
              }}
            >
              <Typography variant="h6" className="stat-title">
                {stat.title}
              </Typography>
              <Typography variant="h3" className="stat-count" sx={{ color: stat.color }}>
                {stat.count}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
      
      <Grid container spacing={3} className="dashboard-quick-actions">
        <Grid item xs={12}>
          <Paper elevation={2} className="quick-actions-paper">
            <Typography variant="h6" className="section-title">
              Quick Actions
            </Typography>
            <Box className="quick-actions-buttons">
              <button 
                className="quick-action-btn" 
                onClick={() => window.location.href='/admin/add-category'}
              >
                Add New Category
              </button>
              <button 
                className="quick-action-btn" 
                onClick={() => window.location.href='/admin/add-product'}
              >
                Add New Product
              </button>
              <button 
                className="quick-action-btn" 
                onClick={() => window.location.href='/admin/products'}
              >
                View All Products
              </button>
              <button 
                className="quick-action-btn" 
                onClick={() => window.location.href='/admin/slider'}
              >
                Manage Slider
              </button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

function AdminDashboard() {
  const navigateTo=useNavigate();
  const [activeComponent, setActiveComponent] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardHome />;
      case 'addCategory':
        return <AddCategory />;
      case 'categories':
        return <CategoryList />;
      case 'addProduct':
        return <AddProduct />;
      case 'products':
        return <ProductList />;
      case 'slider':
        return <SliderManager />; // Add the new component here
      default:
        return <DashboardHome />;
    }
  };

  return (
    <>
    <div className="flex justify-center items-center w-full my-6 mb--8" >
      <button 
        onClick={() => navigateTo('/')}
        className="flex items-center justify-center bg-[#7c9c99] hover:bg-[#6b8b88] text-white font-medium py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 active:translate-y-0 mt-10 "
      >
        <HomeIcon className="mr-2" /> Back To Home Page
      </button>
    </div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar 
          activeComponent={activeComponent} 
          setActiveComponent={setActiveComponent}
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
        <Box
          component="main"
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, md: 3 }, 
            width: { sm: `calc(100% - 240px)` },
            marginLeft: { xs: 0 },
            transition: 'margin 0.2s ease-in-out',
            backgroundColor: '#f8f9fa'
          }}
        >
          <Box sx={{ height: { xs: '48px', sm: '24px' } }} /> {/* Spacer for fixed mobile menu */}
          {renderComponent()}
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}

export default AdminDashboard;