import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import BrandDesc from '../BrandDesc/BrandDesc';

const AboutMe = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  // Social media links
  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon />, color: "#E1306C" },
    { name: "Facebook", icon: <FacebookIcon />, color: "#4267B2" },
    { name: "YouTube", icon: <YouTubeIcon />, color: "#FF0000" },
    { name: "WhatsApp", icon: <WhatsAppIcon />, color: "#25D366" },
    { name: "Email", icon: <EmailIcon />, color: "#D44638" },
  ];

  return (
    <>
    <div className="header-section2">
    <Header />
    </div>
       
   
    <Container maxWidth="lg" sx={{ py: 6, marginTop:"20px" }}>
      {/* Hero Section with Animated Paper-Craft SVG */}
      <Box 
        sx={{ 
          position: 'relative',
          height: { xs: '300px', md: '550px' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          borderRadius: '16px',
          mb: 6,
          background: 'linear-gradient(135deg, #f8f1e6 0%, #e6ccb2 100%)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
        }}
      >
        <svg
          viewBox="0 0 800 400"
          width="100%"
          height="100%"
          style={{ position: 'absolute', opacity: 0.4 }}
        >
          {/* Animated paper craft themed SVG background */}
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a18262" />
              <stop offset="100%" stopColor="#d7ccc8" />
            </linearGradient>
          </defs>
          <g fill="url(#gradient1)">
            <path d="M100,100 L150,50 L200,100 L150,150 Z">
              <animate attributeName="opacity" values="0.3;0.8;0.3" dur="8s" repeatCount="indefinite" />
            </path>
            <path d="M300,150 L350,100 L400,150 L350,200 Z">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="7s" repeatCount="indefinite" />
            </path>
            <path d="M500,100 L550,50 L600,100 L550,150 Z">
              <animate attributeName="opacity" values="0.4;0.7;0.4" dur="9s" repeatCount="indefinite" />
            </path>
            <path d="M700,150 L750,100 L800,150 L750,200 Z">
              <animate attributeName="opacity" values="0.6;0.9;0.6" dur="10s" repeatCount="indefinite" />
            </path>
          </g>
        </svg>

        <Box sx={{ 
          position: 'relative', 
          textAlign: 'center', 
          p: 4, 
          zIndex: 2,
          background: 'rgba(255,255,255,0.7)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(31, 38, 135, 0.2)',
          backdropFilter: 'blur(4px)',
          border: '1px solid rgba(255,255,255,0.3)',
          maxWidth: '90%'
        }}>
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#5d4037',
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
            }}
          >
            PR Crafts
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              fontStyle: 'italic',
              color: '#795548',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' }
            }}
          >
            Crafting beauty from simple sheets of paper
          </Typography>
        </Box>
      </Box>

      {/* About Me Section with Floating Paper Effect */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: 'relative' }}>
            <Box 
              component="img"
              src="/images/logo.png"
              alt="Artisan working on paper craft"
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: '16px',
                boxShadow: '0 15px 30px rgba(0,0,0,0.15)',
                transform: 'rotate(-2deg)',
                transition: 'transform 0.5s ease',
                '&:hover': {
                  transform: 'rotate(0deg) scale(1.02)',
                }
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: { xs: -15, md: -25 },
                right: { xs: -15, md: -25 },
                width: { xs: 80, md: 120 },
                height: { xs: 80, md: 120 },
                borderRadius: '50%',
                backgroundColor: '#e57373',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                zIndex: 2,
                transform: 'rotate(15deg)',
              }}
            >
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: { xs: '0.8rem', md: '1.1rem' }
                }}
              >
                Since 2019
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" sx={{ 
            mb: 3, 
            color: '#5d4037', 
            position: 'relative',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-8px',
              left: '0',
              width: '60px',
              height: '3px',
              backgroundColor: '#a18262',
            }
          }}>
            The Artist Behind The Paper
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            Welcome to my world of paper artistry! I'm Emma Chen, a passionate paper craft artist with over 15 years of experience transforming simple sheets of paper into intricate works of art. My journey began as a child when I was captivated by the versatility of paper - how a flat, ordinary material could be folded, cut, and assembled into something extraordinary.
          </Typography>
          <Typography paragraph sx={{ mb: 3 }}>
            Each creation in my studio is handcrafted with meticulous attention to detail, using sustainable and high-quality paper sourced from responsible suppliers. I believe in the beauty of imperfection that comes with handmade items - the slight variations that make each piece unique and tell a story.
          </Typography>
          <Typography paragraph>
            My work combines traditional techniques from around the world - from Japanese origami and Chinese paper cutting to European quilling and modern paper engineering. I find joy in exploring the boundaries of what paper can do, often experimenting with mixed media to bring fresh perspectives to this ancient art form.
          </Typography>
          
        </Grid>
      </Grid>

      {/* Enhanced Contact Section with Social Media Links - Moved up after About section */}
      <Box 
        sx={{ 
          p: { xs: 3, md: 5 },
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #efebe9 0%, #d7ccc8 100%)',
          boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
          position: 'relative',
          overflow: 'hidden',
          mb: 8
        }}
      >
        <svg 
          viewBox="0 0 100 100" 
          width="100%" 
          height="100%" 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            opacity: 0.1 
          }}
        >
          <pattern id="pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#a18262" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h4" component="h2" sx={{ 
            mb: 4, 
            color: '#5d4037', 
            textAlign: 'center',
            position: 'relative',
            display: 'inline-block',
            marginLeft: '50%',
            transform: 'translateX(-50%)',
            '&:after': {
              content: '""',
              position: 'absolute',
              bottom: '-10px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '80px',
              height: '3px',
              backgroundColor: '#a18262',
            }
          }}>
            Let's Connect
          </Typography>
          
          <Typography paragraph sx={{ textAlign: 'center', mb: 4 }}>
            Have questions about my craft, custom orders, or workshop inquiries? I'd love to hear from you!
          </Typography>
          
          <Grid container spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            {socialLinks.map((link, index) => (
              <Grid item key={index} xs={6} sm={4} md={2}>
                <Box 
                  sx={{ 
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }
                  }}
                >
                  <IconButton 
                    aria-label={link.name}
                    sx={{ 
                      backgroundColor: link.color,
                      color: 'white',
                      width: { xs: 50, md: 60 },
                      height: { xs: 50, md: 60 },
                      mb: 1,
                      '&:hover': {
                        backgroundColor: link.color,
                        filter: 'brightness(1.1)'
                      }
                    }}
                  >
                    {link.icon}
                  </IconButton>
                  <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                    {link.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    
    </Container>
    <BrandDesc />
    <Footer />
    </>
  );
};

export default AboutMe;