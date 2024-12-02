import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';  
import './App.css';

export default function Login() {
  const [loginData, setLoginData] = useState({
    Email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.Email || !loginData.password) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }
    
    axios.post("http://localhost:7000/login", loginData)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Login successful!',
            showConfirmButton: false,
            timer: 3000
          });
          localStorage.setItem('id', res.data[0].id);
          localStorage.setItem('Email', res.data[0].Email);
          localStorage.setItem('name', res.data[0].username);  
          localStorage.setItem('role', res.data[0].Role);
          navigate('/');
          setTimeout(()=>{
            window.location.reload()
          },500);
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data || "Login failed", "error");
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>LOGIN</h1>
        <TextField
          type="Email"
          name="Email"
          label="Enter Email"
          value={loginData.Email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="password"
          name="password"
          label="Enter Password"
          value={loginData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" onClick={handleLogin} fullWidth>
          Login
        </Button>
        <Link to="/Signup">Signup here</Link>
      </div>
    </div>
  );
}//login