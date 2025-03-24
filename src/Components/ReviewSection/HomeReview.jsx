import React from 'react';
import Slider from 'react-slick';
import { Card, CardContent, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HomeReview.css';

const reviews = [
  { name: "Aarohi Sharma", review: "Absolutely loved the handmade crafts! The quality is top-notch, and the owner is super talented." },
  { name: "Riya Patel", review: "These paper crafts are beautifully crafted and make perfect gifts! Highly recommended." },
  { name: "Sneha Kapoor", review: "The detailing in each craft is amazing. You can tell how much effort goes into making them." },
  { name: "Neha Verma", review: "I ordered a customized paper bouquet, and it was stunning! So creative and unique." },
  { name: "Ananya Sen", review: "Such beautiful and delicate work! The owner is really skilled and passionate about her work." },
  { name: "Megha Das", review: "I have never seen such creative handmade crafts before. The owner is truly an artist." },
  { name: "Priya Nair", review: "Every craft is made with love and care. I will definitely purchase again!" },
  { name: "Sanya Mishra", review: "Very professional and talented. The crafts are well-made and look even better in person!" },
];

const HomeReview = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    pauseOnHover: false,
  };

  return (
    <div className="review-section">
      {/* Header Section */}
      <div className="review-header">
        <h2 className="review-title">
          ⭐️ Hear What Our Happy Customers Say – <br />
          Crafted with Love, Cherished Forever! 💖
        </h2>
      </div>

      {/* Slider */}
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Card key={index} className="review-card">
            <CardContent>
              <Typography variant="h6" className="review-name">{review.name}</Typography>
              <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="star-icon" />
                ))}
              </div>
              <Typography variant="body1" className="review-text">"{review.review}"</Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default HomeReview;
