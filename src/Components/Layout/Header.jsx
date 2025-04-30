// import React, { useContext, useEffect, useState } from 'react';
// import { 
//   AppBar, 
//   Toolbar, 
//   IconButton, 
//   Typography, 
//   Button, 
//   Avatar, 
//   Menu, 
//   MenuItem, 
//   Badge,
//   useMediaQuery,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Box
// } from '@mui/material';
// import { 
//   ShoppingCart as ShoppingCartIcon,
//   Menu as MenuIcon,
//   Close as CloseIcon,
//   AdminPanelSettings as AdminIcon,
//   Logout as LogoutIcon
// } from '@mui/icons-material';
// import './Header.css';
// import { useNavigate } from 'react-router-dom';
// import { Context } from '../../main';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import ShoppingCartComponent from '../MyCart/ShoppingCart';

// const Header = () => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [cartSize, setCartSize] = useState(0);
//   const isMobile = useMediaQuery('(max-width:768px)');
//   const navigate = useNavigate();
//   const { isAuthorized, setIsAuthorized, user } = useContext(Context);

//   useEffect(() => {
//     const fetchCartSize = async () => {
//       try {
//         const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/cartsize", {
//           withCredentials: true,
//           headers: { "Content-Type": "application/json" }
//         });
//         setCartSize(response.data.cartLength);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchCartSize();
//   }, []);

//   const isAdmin = user && user.role === 'Admin';
  
//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleLogout = async () => {
//     try {
//       await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/logout", {
//         withCredentials: true,
//         headers: { "Content-Type": "application/json" }
//       });
//       setIsAuthorized(false);
//       toast.success("Logged out successfully");
//       setAnchorEl(null);
//       navigate('/');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const menuItems = [
//     { text: 'Home', link: '/' },
//     { text: 'Shop', link: '/shop' },
//     { text: 'About Us', link: '/aboutme' },
//     { text: 'My Youtube', link: '/mychannel' },
//   ];

//   const drawer = (
//     <div className="drawer-content">
//       <div className="drawer-header">
//         <IconButton onClick={handleDrawerToggle} className="drawer-close">
//           <CloseIcon />
//         </IconButton>
//         <Typography variant="h6" className="drawer-title">PrCrafts</Typography>
//       </div>
      
//       {isAuthorized && (
//         <div className="drawer-profile">
//           <Avatar 
//             className="drawer-avatar" 
//             src="/public/images/noPP.jpg" 
//             alt={user.username || "User"}
//           />
//           <Typography variant="subtitle1" className="drawer-username">
//             {user.username || "User"}
//           </Typography>
//           {isAdmin && <Typography variant="caption" className="admin-badge">Admin</Typography>}
//         </div>
//       )}
      
//       <Divider />
      
//       <List>
//         {menuItems.map((item) => (
//           <ListItem button key={item.text} onClick={() => {
//             navigate(item.link);
//             handleDrawerToggle();
//           }}>
//             <ListItemText primary={item.text} />
//           </ListItem>
//         ))}
        
//         {isAdmin && (
//           <ListItem button onClick={() => {
//             navigate('/admindashboard');
//             handleDrawerToggle();
//           }}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <AdminIcon sx={{ mr: 1 }} />
//               <ListItemText primary="Admin Dashboard" />
//             </Box>
//           </ListItem>
//         )}
        
//         {isAuthorized && (
//           <ListItem button onClick={handleLogout}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <LogoutIcon sx={{ mr: 1 }} />
//               <ListItemText primary="Logout" />
//             </Box>
//           </ListItem>
//         )}
//       </List>
//     </div>
//   );

//   return (
//     <>
//       <AppBar position="static" className="header">
//         <Toolbar className="toolbar">
//           {isMobile && (
//             <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} className="menu-button">
//               <MenuIcon />
//             </IconButton>
//           )}

//           <div className="logo-container">
//             <Typography variant="h6" className="logo" onClick={() => navigate('/')}>
//               PrCrafts
//             </Typography>
//           </div>

//           {!isMobile && (
//             <div className="nav-links">
//               {menuItems.map((item) => (
//                 <Button key={item.text} color="inherit" onClick={() => navigate(item.link)} className="nav-link">
//                   {item.text}
//                 </Button>
//               ))}
              
//               {isAdmin && (
//                 <Button 
//                   color="inherit" 
//                   onClick={() => navigate('/admindashboard')}
//                   className="nav-link admin-link"
//                   startIcon={<AdminIcon />}
//                 >
//                   Admin
//                 </Button>
//               )}
//             </div>
//           )}

//           <div className="header-actions">
//             {/* Shopping Cart Component Correctly Positioned */}
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <ShoppingCartComponent />
//             </Box>

//             {/* Profile / Login Section */}
//             {isAuthorized ? (
//               <div className="profile-section">
//                 {!isMobile && (
//                   <Typography variant="body2" className="user-name">
//                     {user.username || "User"}
//                   </Typography>
//                 )}
//                 <IconButton onClick={handleProfileClick} className="profile-button">
//                   <Avatar 
//                     className="profile-avatar" 
//                     src={`https://pr-crafts-backend.vercel.app${user.profilePicture}` || "/default-avatar.png"}
//                     alt={user.username || "User"} 
//                   />
//                 </IconButton>
//                 <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="profile-menu">
//                   <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
//                   <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>My Orders</MenuItem>
//                   {isAdmin && (
//                     <MenuItem onClick={() => { handleClose(); navigate('/admindashboard'); }}>
//                       <AdminIcon fontSize="small" style={{ marginRight: 8 }} />
//                       Admin Dashboard
//                     </MenuItem>
//                   )}
//                   <Divider />
//                   <MenuItem onClick={handleLogout}>
//                     <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
//                     Logout
//                   </MenuItem>
//                 </Menu>
//               </div>
//             ) : (
//               <Button color="inherit" className="login-button" onClick={() => navigate('/login')}>
//                 Login
//               </Button>
//             )}
//           </div>
//         </Toolbar>
//       </AppBar>

//       <Drawer variant="temporary" anchor="left" open={mobileOpen} onClose={handleDrawerToggle} className="mobile-drawer">
//         {drawer}
//       </Drawer>
//     </>
//   );
// };

// export default Header;

















import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingCartComponent from '../MyCart/ShoppingCart';

// Icons imported from heroicons (compatible with Tailwind)
import { 
  ShoppingCartIcon, 
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const Header = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartSize, setCartSize] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchCartSize = async () => {
      try {
        const response = await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/cartsize", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        });
        setCartSize(response.data.cartLength);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartSize();

    // Add scroll listener for header animation
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isAdmin = user && user.role === 'Admin';
  
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("https://pr-crafts-backend.vercel.app/api/v1/user/logout", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      setIsAuthorized(false);
      toast.success("Logged out successfully");
      setProfileMenuOpen(false);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Shop', link: '/shop' },
    { text: 'About Us', link: '/aboutme' },
    { text: 'My Youtube', link: '/mychannel' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md py-4' : 'bg-white/90 backdrop-blur-sm py-4'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <div className="block lg:hidden">
              <button 
                onClick={toggleMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
              >
                <Bars3Icon className="h-6 w-6 text-gray-800" />
              </button>
            </div>

            {/* Logo */}
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 
                className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent cursor-pointer"
                onClick={() => navigate('/')}
              >
                PrCrafts
              </h1>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.text}
                  className="px-4 py-2 text-gray-700 hover:text-purple-600 font-medium rounded-lg hover:bg-gray-100 transition-all"
                  onClick={() => navigate(item.link)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.text}
                </motion.button>
              ))}
              
              {isAdmin && (
                <motion.button
                  className="flex items-center px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/admindashboard')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                >
                  <ShieldCheckIcon className="h-5 w-5 mr-2" />
                  Admin
                </motion.button>
              )}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Shopping Cart */}
              {isAuthorized && <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ShoppingCartComponent />
              </motion.div> }

              {/* Login/Profile */}
              {isAuthorized ? (
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.username || "User"}
                    </span>
                    <motion.button
                      onClick={toggleProfileMenu}
                      className="relative focus:outline-none"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-purple-500 hover:border-blue-500 transition-all duration-300">
                        <img
                          src={`https://pr-crafts-backend.vercel.app${user.profilePicture}` || "/default-avatar.png"}
                          alt={user.username || "User"}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/noPP.jpg";
                          }}
                        />
                      </div>
                      {isAdmin && (
                        <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs px-1 rounded-full">
                          Admin
                        </span>
                      )}
                    </motion.button>
                  </div>

                  {/* Profile Dropdown */}
                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{user.username || "User"}</p>
                        </div>
                        
                        <button 
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => { setProfileMenuOpen(false); navigate('/profile'); }}
                        >
                          <UserCircleIcon className="h-4 w-4 mr-2" />
                          Profile
                        </button>
                        
                        <button 
                          className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => { setProfileMenuOpen(false); navigate('/orders'); }}
                        >
                          <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                          </svg>
                          My Orders
                        </button>
                        
                        {isAdmin && (
                          <button 
                            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => { setProfileMenuOpen(false); navigate('/admindashboard'); }}
                          >
                            <ShieldCheckIcon className="h-4 w-4 mr-2" />
                            Admin Dashboard
                          </button>
                        )}
                        
                        <div className="border-t border-gray-100 mt-1">
                          <button 
                            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            onClick={handleLogout}
                          >
                            <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                            Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.button
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={() => navigate('/login')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Login
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-72 bg-white z-50 shadow-xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                  PrCrafts
                </h2>
                <button 
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-800" />
                </button>
              </div>

              {isAuthorized && (
                <div className="p-4 border-b flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500">
                    <img
                      src={`https://pr-crafts-backend.vercel.app${user.profilePicture}` || "/default-avatar.png"}
                      alt={user.username || "User"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/noPP.jpg";
                      }}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {user.username || "User"}
                    </p>
                    {isAdmin && (
                      <span className="text-xs font-medium text-purple-600">
                        Admin
                      </span>
                    )}
                  </div>
                </div>
              )}

              <nav className="py-2">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={item.text}
                    className="flex w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      navigate(item.link);
                      toggleMobileMenu();
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.text}
                  </motion.button>
                ))}

                {isAuthorized && (
                  <>
                    <motion.button
                      className="flex w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        navigate('/profile');
                        toggleMobileMenu();
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: menuItems.length * 0.1 }}
                    >
                      <UserCircleIcon className="h-5 w-5 mr-3" />
                      Profile
                    </motion.button>

                    <motion.button
                      className="flex w-full px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => {
                        navigate('/orders');
                        toggleMobileMenu();
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: (menuItems.length + 1) * 0.1 }}
                    >
                      <svg className="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                      </svg>
                      My Orders
                    </motion.button>

                    {isAdmin && (
                      <motion.button
                        className="flex w-full px-4 py-3 text-purple-600 hover:bg-gray-100 transition-colors"
                        onClick={() => {
                          navigate('/admindashboard');
                          toggleMobileMenu();
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (menuItems.length + 2) * 0.1 }}
                      >
                        <ShieldCheckIcon className="h-5 w-5 mr-3" />
                        Admin Dashboard
                      </motion.button>
                    )}
                  </>
                )}

                {isAuthorized ? (
                  <motion.button
                    className="flex w-full px-4 py-3 text-red-600 hover:bg-gray-100 transition-colors mt-2 border-t"
                    onClick={handleLogout}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + 3) * 0.1 }}
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" />
                    Logout
                  </motion.button>
                ) : (
                  <motion.button
                    className="mx-4 mt-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg text-center w-calc(100%-2rem)"
                    onClick={() => {
                      navigate('/login');
                      toggleMobileMenu();
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: menuItems.length * 0.1 }}
                  >
                    Login
                  </motion.button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className={`${scrolled ? 'h-16' : 'h-20'} transition-all duration-300`}></div>
    </>
  );
};

export default Header;