import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Authenticate = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    if (token) {
      localStorage.setItem('token', token);
      navigate('/dashboard');
    }
  }, [navigate]);

  return <div>Authenticating...</div>;
};

export default Authenticate;
