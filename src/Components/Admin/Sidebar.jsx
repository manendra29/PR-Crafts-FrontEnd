import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InventoryIcon from '@mui/icons-material/Inventory';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image'; // Import image icon

function Sidebar({ activeComponent, setActiveComponent, mobileOpen, handleDrawerToggle }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerWidth = 240;

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, component: 'dashboard' },
    { text: 'Categories', icon: <CategoryIcon />, component: 'categories' },
    { text: 'Add Category', icon: <AddCircleOutlineIcon />, component: 'addCategory' },
    { text: 'Products', icon: <InventoryIcon />, component: 'products' },
    { text: 'Add Product', icon: <AddCircleOutlineIcon />, component: 'addProduct' },
    { text: 'Manage Slider', icon: <ImageIcon />, component: 'slider' } // Add this new menu item
  ];

  const drawer = (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      backgroundColor: '#ffffff'
    }}>
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)'
      }}>
        <Typography variant="h6" component="div" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
          PrCrafts Admin
        </Typography>
        {isMobile && (
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        )}
      </Box>
      <List sx={{ flexGrow: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text}
            onClick={() => {
              setActiveComponent(item.component);
              if (isMobile) handleDrawerToggle();
            }}
            sx={{ 
              mb: 0.5,
              backgroundColor: activeComponent === item.component ? 
                'rgba(124, 156, 153, 0.1)' : 'transparent',
              borderRight: activeComponent === item.component ? 
                `3px solid ${theme.palette.primary.main}` : 'none',
              '&:hover': {
                backgroundColor: 'rgba(124, 156, 153, 0.05)',
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: activeComponent === item.component ? 
                theme.palette.primary.main : 'rgba(0, 0, 0, 0.54)' 
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} sx={{ 
              '& .MuiListItemText-primary': {
                fontWeight: activeComponent === item.component ? 500 : 400,
                color: activeComponent === item.component ? 
                  theme.palette.primary.main : 'inherit'
              }
            }} />
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0, 0, 0, 0.08)' }}>
        <Typography variant="body2" color="textSecondary" align="center">
          © 2025 PrCrafts Admin
        </Typography>
      </Box>
    </Box>
  );

  return (
    <>
      {isMobile && (
        <Box sx={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          height: 56, 
          backgroundColor: '#fff', 
          zIndex: 1100,
          display: 'flex',
          alignItems: 'center',
          px: 2,
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ color: theme.palette.primary.main, fontWeight: 600 }}>
            PrCrafts Admin
          </Typography>
        </Box>
      )}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth,
              border: 'none',
              boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
}

export default Sidebar;