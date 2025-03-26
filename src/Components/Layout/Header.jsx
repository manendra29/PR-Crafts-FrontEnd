import React, { useContext, useEffect, useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  Button, 
  Avatar, 
  Menu, 
  MenuItem, 
  Badge,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box
} from '@mui/material';
import { 
  ShoppingCart as ShoppingCartIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  AdminPanelSettings as AdminIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import ShoppingCartComponent from '../MyCart/ShoppingCart';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartSize, setCartSize] = useState(0);
  const isMobile = useMediaQuery('(max-width:768px)');
  const navigate = useNavigate();
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);

  useEffect(() => {
    const fetchCartSize = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/cartsize", {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        });
        setCartSize(response.data.cartLength);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCartSize();
  }, []);

  const isAdmin = user && user.role === 'Admin';
  
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true,
        headers: { "Content-Type": "application/json" }
      });
      setIsAuthorized(false);
      toast.success("Logged out successfully");
      setAnchorEl(null);
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

  const drawer = (
    <div className="drawer-content">
      <div className="drawer-header">
        <IconButton onClick={handleDrawerToggle} className="drawer-close">
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" className="drawer-title">PrCrafts</Typography>
      </div>
      
      {isAuthorized && (
        <div className="drawer-profile">
          <Avatar 
            className="drawer-avatar" 
            src="/public/images/noPP.jpg" 
            alt={user.username || "User"}
          />
          <Typography variant="subtitle1" className="drawer-username">
            {user.username || "User"}
          </Typography>
          {isAdmin && <Typography variant="caption" className="admin-badge">Admin</Typography>}
        </div>
      )}
      
      <Divider />
      
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => {
            navigate(item.link);
            handleDrawerToggle();
          }}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        
        {isAdmin && (
          <ListItem button onClick={() => {
            navigate('/admindashboard');
            handleDrawerToggle();
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AdminIcon sx={{ mr: 1 }} />
              <ListItemText primary="Admin Dashboard" />
            </Box>
          </ListItem>
        )}
        
        {isAuthorized && (
          <ListItem button onClick={handleLogout}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LogoutIcon sx={{ mr: 1 }} />
              <ListItemText primary="Logout" />
            </Box>
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <>
      <AppBar position="static" className="header">
        <Toolbar className="toolbar">
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} className="menu-button">
              <MenuIcon />
            </IconButton>
          )}

          <div className="logo-container">
            <Typography variant="h6" className="logo" onClick={() => navigate('/')}>
              PrCrafts
            </Typography>
          </div>

          {!isMobile && (
            <div className="nav-links">
              {menuItems.map((item) => (
                <Button key={item.text} color="inherit" onClick={() => navigate(item.link)} className="nav-link">
                  {item.text}
                </Button>
              ))}
              
              {isAdmin && (
                <Button 
                  color="inherit" 
                  onClick={() => navigate('/admindashboard')}
                  className="nav-link admin-link"
                  startIcon={<AdminIcon />}
                >
                  Admin
                </Button>
              )}
            </div>
          )}

          <div className="header-actions">
            {/* Shopping Cart Component Correctly Positioned */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ShoppingCartComponent />
            </Box>

            {/* Profile / Login Section */}
            {isAuthorized ? (
              <div className="profile-section">
                {!isMobile && (
                  <Typography variant="body2" className="user-name">
                    {user.username || "User"}
                  </Typography>
                )}
                <IconButton onClick={handleProfileClick} className="profile-button">
                  <Avatar 
                    className="profile-avatar" 
                    src={`http://localhost:4000${user.profilePicture}` || "/default-avatar.png"}
                    alt={user.username || "User"} 
                  />
                </IconButton>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className="profile-menu">
                  <MenuItem onClick={() => { handleClose(); navigate('/profile'); }}>Profile</MenuItem>
                  <MenuItem onClick={() => { handleClose(); navigate('/orders'); }}>My Orders</MenuItem>
                  {isAdmin && (
                    <MenuItem onClick={() => { handleClose(); navigate('/admindashboard'); }}>
                      <AdminIcon fontSize="small" style={{ marginRight: 8 }} />
                      Admin Dashboard
                    </MenuItem>
                  )}
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <LogoutIcon fontSize="small" style={{ marginRight: 8 }} />
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" className="login-button" onClick={() => navigate('/login')}>
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" anchor="left" open={mobileOpen} onClose={handleDrawerToggle} className="mobile-drawer">
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
