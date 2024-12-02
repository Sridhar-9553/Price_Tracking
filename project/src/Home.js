import React, { useState, useEffect } from "react";
import {
  Container,
  Dialog, 
  DialogContent,
  Box,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import PostAddIcon from "@mui/icons-material/PostAdd";
import Swal from "sweetalert2";
import axios from "axios";
import Footer from './Footer';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [openImageDialog, setOpenImageDialog] = useState(false); 
  //const [selectedProductImage, setSelectedProductImage] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
  });
  const [selectedCity, setSelectedCity] = useState('');
  const [category, setCategory] = useState("");
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [postData, setPostData] = useState({
    Product_Name: "",
    Category: "",
    Product_Details: "",
    City:"",
    Product_Cost: "",
    Image: "",
  });

  const navigate = useNavigate(); 

  
  useEffect(() => {
    const token = localStorage.getItem("id");
    if (token) {
      setIsLoggedIn(true);
      const storedUserDetails = {
        name: localStorage.getItem("name") || "",
        email: localStorage.getItem("Email") || "",
        phone: localStorage.getItem("Mobile") || "",
        role: localStorage.getItem("role") || "",
      };
      setUserDetails(storedUserDetails); 
    }

  
    fetch("http://localhost:7000/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
};
useEffect(() => {
  const fetchProducts = async () => {
    setLoading(true);
    const queryParams = [];
    if (selectedCity) queryParams.push(`city=${selectedCity}`);
    if (category) queryParams.push(`category=${category}`);
    const url = `http://localhost:7000/products${queryParams.length ? '?' + queryParams.join('&') : ''}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };
  fetchProducts();
}, [selectedCity, category]);
  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  
  const handlePostAddClick = () => {
    setPostDialogOpen(true);
  };

  const handleDialogClose = () => {
    setPostDialogOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    setPostData({
      ...postData,
      Image: file,
    });
  };

  const handlePostDataChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitPost = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Product_Name", postData.Product_Name);
    formData.append("Category", postData.Category);
    formData.append("Product_Details", postData.Product_Details);
    formData.append("City",postData.City);
    formData.append("Product_Cost", postData.Product_Cost);
    if (selectedImage) {
      formData.append("Image", selectedImage);
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Please select an image.",
        showConfirmButton: false,
        timer: 1500,
      });
      return; 
    }

   
    axios
      .post("http://localhost:7000/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Data Added Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setPostDialogOpen(false); 
        }
      })
      .catch((err) => {
        console.error("Error uploading post:", err);
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error adding post",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  
  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift"))
      return;
    setDrawerOpen(open);
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const handleImageClick = (product) => {
    setSelectedProduct(product); 
    setOpenImageDialog(true);
  };
  const handleCloseImageDialog = () => {
    setOpenImageDialog(false);
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ backgroundColor: "#1976d2" }}>
          {isLoggedIn && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ marginRight: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            PriceTracker
          </Typography>

          {isLoggedIn ? (
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>

      {isLoggedIn && (
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to="/">Home</Link>} />
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary={<Link to="/profile" style={{textDecoration:"none"}}>Profile</Link>} />
            </ListItem> 

            {userDetails.role === "Market Team" && (
              <ListItem button onClick={handlePostAddClick}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Post" />
              </ListItem>
            )}

            {userDetails.role !== "Market Team" && (
              <ListItem>
                <FormControl  sx={{
    width: 200,
    marginRight: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none", 
      },
    },
  }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={handleCategoryChange} label="Category">
                    <MenuItem value="Electronic Gadgets">Electronic Gadgets</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Mens Wear">Mens Wear</MenuItem>
                    <MenuItem value="Womens Wear">Womens Wear</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
            )}
            {userDetails.role !== "Market Team" && (
              <ListItem>
              <FormControl sx={{
    width: 200,
    marginRight: 2,
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
    },
  }}>
              <InputLabel sx={{border:null}}>City</InputLabel>
              <Select value={selectedCity} onChange={handleCityChange} label="City">
                  <MenuItem value="">All Cities</MenuItem>
                  <MenuItem value="Srikakulam">Srikakulam</MenuItem>
                  <MenuItem value="Rajam">Rajam</MenuItem>
                  <MenuItem value="VishakaPatnam">VishakaPatnam</MenuItem>
                  <MenuItem value="Vizainagaram">Vizainagaram</MenuItem>
                  
              </Select>
          </FormControl>
          </ListItem> 
            )}
          </List>
          <ListItem>
              <ListItemIcon>
                <InfoIcon/>
              </ListItemIcon>
              <ListItemText primary={<Link to="/About" style={{textDecoration:"none", marginLeft:"none"}}>About</Link>} />
            </ListItem>
        </Drawer>
      )}

      
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: isLoggedIn && drawerOpen ? "240px" : 0, 
            paddingTop: "64px",
            transition: "margin-left 0.3s ease",
          }}
        >
          <Box sx={{ marginTop: "80px" }}>
            {!isLoggedIn && (
              <Box
                sx={{
                  background: "linear-gradient(135deg, #f5f5f5, #ffffff)",
                  padding: "80px 0",
                  textAlign: "center",
                }}
              >
                <Typography variant="h3" sx={{ marginBottom: "16px", fontWeight: "bold" }}>
                  Track Prices. Save Money.
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: "32px" }}>
                  Compare prices across multiple platforms and get notified of price drops.
                </Typography>

                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Button variant="contained" color="primary" size="large">
                    Log In to Track Prices
                  </Button>
                </Link>
              </Box>
            )}

            {isLoggedIn && (
              <Container sx={{ paddingY: "60px" }}>
                <Typography variant="h5" align="center" sx={{ marginBottom: "40px" }}>
                  Featured Products
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ maxWidth: 345 }}>
                          <CardMedia
                            component="img"
                            alt={product.Product_Name}
                            height="200"
                            image={`http://localhost:7000${product.Image}`} 
                            onClick={() => handleImageClick(product)}
                            sx={{ cursor: "pointer" }}
                          />
                          <CardContent>
                            <Typography variant="h6">{product.Product_Name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                              {product.Product_Details}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: "bold", marginTop: "8px" }}>
                              Rs{product.Product_Cost}/-
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  ) : (
                    <Typography>No products available.</Typography>
                  )}
                </Grid>
              </Container>
            )}
          </Box>
        </Box>
        <Dialog open={openImageDialog} onClose={handleCloseImageDialog} maxWidth="md">
  <DialogContent sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    {selectedProduct && (
      <>
        <img
          src={`http://localhost:7000${selectedProduct.Image}`}
          alt={selectedProduct.Product_Name}
          style={{ width: "100%", maxHeight: "400px", objectFit: "contain", marginBottom: "16px" }}
        />
        <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
          {selectedProduct.Product_Name}
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: "8px" }}>
          {selectedProduct.Product_Details}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "primary.main" }}>
          Rs {selectedProduct.Product_Cost}/-
        </Typography>
      </>
    )}
  </DialogContent>
</Dialog>

      </Box>

      {userDetails.role === "Market Team" && (
        <Dialog open={postDialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Add New Post</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="Product_Name"
              label="Product Name"
              fullWidth
              variant="outlined"
              onChange={handlePostDataChange}
            />
            <FormControl sx={{ width: 200, marginRight: 2 }}>
                  <InputLabel>Category</InputLabel>
                  <Select value={category} onChange={handleCategoryChange} label="Category">
                    <MenuItem value="Electronic Gadgets">Electronic Gadgets</MenuItem>
                    <MenuItem value="Gold">Gold</MenuItem>
                    <MenuItem value="Mens Wear">Mens Wear</MenuItem>
                    <MenuItem value="Womens Wear">Womens Wear</MenuItem>
                  </Select>
                </FormControl>
            <TextField
              margin="dense"
              name="Product_Details"
              label="Product Details"
              fullWidth
              variant="outlined"
              onChange={handlePostDataChange}
            />
             <TextField
              margin="dense"
              name="City"
              label="City"
              fullWidth
              variant="outlined"
              onChange={handlePostDataChange}
            />
            <TextField
              margin="dense"
              name="Product_Cost"
              label="Product Cost"
              fullWidth
              variant="outlined"
              onChange={handlePostDataChange}
            />
            <input
              accept="image/*"
              type="file"
              onChange={handleImageUpload}
              style={{ marginTop: '16px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmitPost} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {isLoggedIn && <Footer />}
    </div>
  );
}

export default Home;