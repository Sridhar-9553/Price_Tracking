import React from "react";
import { Container, Typography, Box, IconButton, Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';

function About() {
  const navigate = useNavigate(); // Hook to handle navigation

  const handleBackClick = () => {
    navigate("/"); // Navigate to the home page
  };
  return (
    <div>
    <div>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff", // Text color for contrast
        padding: "40px 20px",
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          background: "rgba(0, 0, 0, 0.8)", // Semi-transparent background for content
          borderRadius: "16px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          padding: "40px",
        }}
      >
        {/* Back Button */}
        <Box display="flex" alignItems="center" sx={{ marginBottom: "24px" }}>
          <IconButton
            onClick={handleBackClick}
            sx={{
              color: "#fff",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.4)" },
              marginRight: "16px",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            About Us
          </Typography>
        </Box>

        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", marginBottom: "24px" }} />

        {/* About Section */}
        <Box sx={{ textAlign: "justify", lineHeight: 1.8 }}>
          <Typography variant="body1" paragraph>
            Welcome to **Price Tracking**, your trusted platform for monitoring product prices across a variety of online stores. 
            Our mission is to provide you with the best tools to compare prices, track trends, and save money effortlessly. 
          </Typography>

          {/* Mission Section */}
          <Typography variant="h5" sx={{ marginTop: "24px", marginBottom: "12px", fontWeight: "bold" }}>
            Our Mission
          </Typography>
          <Typography variant="body1" paragraph>
            To empower shoppers by providing them with transparent and reliable price tracking solutions. 
            With our advanced tools, we aim to help you find the best deals and make informed decisions.
          </Typography>

          {/* Features Section */}
          <Typography variant="h5" sx={{ marginTop: "24px", marginBottom: "12px", fontWeight: "bold" }}>
            Why Choose Us?
          </Typography>
          <Typography variant="body1" component="ul" sx={{ paddingLeft: "20px" }}>
            <li>**Real-Time Price Tracking**: Get accurate price updates instantly.</li>
            <li>**Custom Alerts**: Never miss a price drop with personalized notifications.</li>
            <li>**Multi-Platform Comparisons**: Save time by comparing prices from various stores.</li>
          </Typography>

          {/* Vision Section */}
          <Typography variant="h5" sx={{ marginTop: "24px", marginBottom: "12px", fontWeight: "bold" }}>
            Our Vision
          </Typography>
          <Typography variant="body1" paragraph>
            To become the most user-friendly price tracking platform globally, enabling consumers to make smarter shopping decisions 
            with ease and confidence.
          </Typography>
        </Box>

        {/* Call to Action */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              background: "linear-gradient(90deg, #2196f3, #21cbf3)",
              color: "#fff",
              fontWeight: "bold",
              borderRadius: "8px",
              padding: "12px 24px",
              "&:hover": {
                background: "linear-gradient(90deg, #1e88e5, #1cbcf3)",
              },
            }}
            onClick={() => navigate("/")}
          >
            Start Shopping Now
          </Button>
        </Box>
      </Container>
    </Box>
    </div>
    <Footer/>
    </div>
  );
}

export default About;
