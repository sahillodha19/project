import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from'react';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token is stored in sessionStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Redirect to the dashboard if token exists
      navigate('/');
    }
  }, [navigate]);
  const [formData, setFormData] = useState({
    email: '',
    pwd: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          pwd: formData.pwd
        })
      });
      const result = await response.json();
      if(response.status == 200) {
         localStorage.setItem('token', result.token);
         console.log(response.status);
         alert("Login Successful");
         window.location.reload();
      }
      else{
         alert("Login Not Successful");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGithubLogin = () => {
    const currentUrl = new URL(window.location.href);
    window.location.href = `http://localhost:8080/auth/github?redirect=${currentUrl}`;
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          name="pwd"
          type="password"
          value={formData.pwd}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Login
        </Button>
      </form>

      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleGithubLogin}
      >
        Login with GitHub
      </Button>
    </Container>
  );
};

export default Login;
