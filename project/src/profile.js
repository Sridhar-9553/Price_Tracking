import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper, Avatar } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import Footer from './Footer'

export default function Profile() {
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    role: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  

  

  useEffect(() => {
    const storedId = localStorage.getItem('id');
    if (storedId) {
      axios.get(`http://localhost:7000/user/${storedId}`)
        .then((res) => {
          console.log(res);
          setUserDetails({
            name: res.data.username || '',
            email: res.data.Email || '',
            mobile: res.data.Mobile || '',
            role: res.data.Role || '' 
          });
        })
        .catch((err) => {
          Swal.fire('Error', 'Failed to fetch user details', 'error');
        });
    }
  }, []);

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };


  const handleSave = () => {
    const storedId = localStorage.getItem('id');
  
    if (!storedId) {
      Swal.fire('Error', 'User ID not found', 'error');
      return;
    }
  
    let formData = {
      name:userDetails.name,
      email:userDetails.email,
      mobile:userDetails.mobile,
      role:userDetails.role}
    axios.put(`http://localhost:7000/user/${storedId}`,formData)
      .then((res) => {
        Swal.fire('Success', 'Profile updated successfully', 'success');
        setIsEditing(false);
        navigate('/'); 
      })
      .catch((err) => {
        console.error('Error updating profile:', err);
        Swal.fire('Error', 'Failed to update profile', 'error');
      });
  };
  const ret=()=>{
    navigate('/')
  }

  return (
    <div>
    <div className="profile-container">
      <Paper elevation={3} className="profile-paper">
        <Typography variant="h4" align="center" gutterBottom>
          Profile
        </Typography>

        <form>
          <TextField
            label="Name"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
            className="profile-input"
          />
          <TextField
            label="Email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
            className="profile-input"
          />
          <TextField
            label="Mobile"
            name="mobile"
            value={userDetails.mobile}
            onChange={handleChange}
            fullWidth
            margin="normal"
            disabled={!isEditing}
            className="profile-input"
          />
          <TextField
            label="Role"
            name="role"
            value={userDetails.role}
            fullWidth
            margin="normal"
            disabled
            className="profile-input"
          />

          <div className="profile-buttons">
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSave}
                  style={{ marginRight: '10px' }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="contained" onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
              
            )}
            <Button onClick={ret}>return</Button>
          </div>
        </form>
      </Paper>
      </div>
      <Footer/>
    </div>
  );
}
