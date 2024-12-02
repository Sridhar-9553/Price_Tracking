import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormLabel, FormControl } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [data, setData] = useState({
    name: '',
    Email: '',
    password: '',
    mobile: '',
    role: 'User',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setData({
      ...data,
      role: e.target.value, 
    });
  };

  const handleSubmit = () => {
    if (!data.name || !data.Email || !data.password || !data.mobile) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    axios.post("http://localhost:7000/signup", data)
      .then((res) => {
        if (res.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "User Added Successfully",
            showConfirmButton: false,
            timer: 3000,
          });
          navigate('/login');
        }
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data || "User already exists", "error");
      });
  };

  return (
    <div className="sign-div1">
      <div className="sign-div2">
        <h1>SIGN UP</h1>
        <TextField
          type="text"
          name="name"
          label="Enter Username"
          value={data.name}
          autoComplete="off"
          onChange={handleChange}
        /><br/>
        <TextField
          type="email"
          name="Email"
          label="Enter Email"
          value={data.Email}
          autoComplete="off"
          onChange={handleChange}
        /><br/>
        <TextField
          type="password"
          name="password"
          label="Enter Password"
          value={data.password}
          autoComplete="off"
          onChange={handleChange}
        /><br/>
        <TextField
          type="tel"
          name="mobile"
          label="Enter Mobile Number"
          value={data.mobile}
          autoComplete="off"
          onChange={handleChange}
        /><br/>
        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Role</FormLabel>
          <RadioGroup name="role" value={data.role} onChange={handleRoleChange}>
            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
            <FormControlLabel value="User" control={<Radio />} label="User" />
            <FormControlLabel value="Market Team" control={<Radio />} label="Market Team" />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" onClick={handleSubmit} fullWidth>
          Sign Up
        </Button><br/>
        <Link to='/login'>Already have an account? Login here</Link>
      </div>
    </div>
  );
}