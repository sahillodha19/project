import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, IconButton, SvgIcon } from '@mui/material';

const GitHubIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M12 0.296c-6.63 0-12 5.372-12 12 0 5.303 3.438 9.8 8.207 11.387 0.6 0.111 0.793-0.261 0.793-0.577 0-0.285-0.011-1.04-0.017-2.041-3.338 0.726-4.042-1.609-4.042-1.609-0.546-1.387-1.333-1.756-1.333-1.756-1.089-0.744 0.083-0.729 0.083-0.729 1.205 0.084 1.838 1.238 1.838 1.238 1.07 1.834 2.807 1.304 3.492 0.997 0.108-0.775 0.418-1.305 0.761-1.605-2.665-0.303-5.466-1.334-5.466-5.931 0-1.311 0.467-2.381 1.236-3.22-0.124-0.303-0.536-1.521 0.117-3.169 0 0 1.008-0.322 3.3 1.23 0.957-0.267 1.983-0.399 3.003-0.404 1.02 0.005 2.047 0.137 3.006 0.404 2.291-1.552 3.296-1.23 3.296-1.23 0.655 1.648 0.243 2.866 0.119 3.169 0.77 0.839 1.235 1.909 1.235 3.22 0 4.609-2.807 5.624-5.479 5.921 0.43 0.37 0.823 1.103 0.823 2.222 0 1.606-0.014 2.896-0.014 3.293 0 0.319 0.192 0.694 0.801 0.576 4.769-1.589 8.203-6.085 8.203-11.385 0-6.628-5.373-12-12-12z" />
  </SvgIcon>
);

const GoogleIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M21.35 11.1h-9.36v2.82h5.4c-0.24 1.28-0.93 2.36-1.97 3.07v2.56h3.18c1.86-1.71 2.95-4.24 2.95-7.15 0-0.58-0.07-1.14-0.2-1.69z" fill="#4285F4" />
    <path d="M11.99 22c2.7 0 4.96-0.89 6.62-2.42l-3.18-2.56c-0.8 0.54-1.82 0.87-3.44 0.87-2.64 0-4.87-1.78-5.66-4.15H3.01v2.61c1.68 3.31 5.12 5.65 8.98 5.65z" fill="#34A853" />
    <path d="M6.34 13.73c-0.19-0.58-0.31-1.2-0.31-1.83s0.12-1.25 0.31-1.83v-2.61h-3.34c-0.68 1.37-1.07 2.91-1.07 4.44s0.39 3.06 1.07 4.44l3.34-2.61z" fill="#FBBC05" />
    <path d="M11.99 4.61c1.5 0 2.79 0.52 3.82 1.55l2.85-2.85c-1.69-1.58" fill="#EA4335" />
  </SvgIcon>
);

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    pwd: '',
    confirmPassword: '',
    phone: '',
    address: ''
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

    // Check if passwords match
    if (formData.pwd !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          pwd: formData.pwd,
          phone: formData.phone,
          address: formData.address
        })
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleGithubRegister = () => {
    window.location.href = 'http://localhost:8080/auth/github';
  };

  const handleGoogleRegister = () => {
    window.location.href = 'http://localhost:8080/auth/google';
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', mt: 5 }}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Password" name="pwd" type="password" value={formData.pwd} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Confirm Password" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Phone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" required />
          <TextField label="Address" name="address" value={formData.address} onChange={handleChange} fullWidth margin="normal" required />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>Register</Button>
        </form>

        <Typography variant="body1" sx={{ mt: 3, mb: 2 }}>Or sign up with</Typography>

        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton color="primary" onClick={handleGithubRegister} size="large">
            <GitHubIcon />
          </IconButton>
          <IconButton color="error" onClick={handleGoogleRegister} size="large">
            <GoogleIcon />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
