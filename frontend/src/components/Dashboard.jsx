import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddToCart from './AddToCart/AddToCart';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location = "/login";
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data.products);
        setLoading(false);
      } catch (err) {
        setError('Error fetching products');
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* <header style={styles.header}>
        <h1 style={styles.dashboardTitle}>Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
      </header> */}

      <main style={styles.main}>
        <h2 style={styles.heading}>Our Products</h2>
        {loading ? (
          <p style={styles.message}>Loading...</p>
        ) : error ? (
          <p style={styles.message}>{error}</p>
        ) : (
          <div style={styles.grid}>
            {products.map((product) => (
              <div key={product._id} style={styles.card}>
                <img src={product.image} alt={product.name} style={styles.image} />
                <h3 style={styles.productTitle}>{product.name}</h3>
                <p style={styles.description}>{product.description}</p>
                <p style={styles.price}>${product.price}</p>
                <p style={styles.stock}>
                  {product.stock_quantity > 0 ? `In stock: ${product.stock_quantity}` : 'Out of stock'}
                </p>
                <Link to={`/product/${product._id}`}>View Details</Link><br/>
                <AddToCart product={product} />
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#333',
    color: '#fff',
  },
  dashboardTitle: {
    fontSize: '1.5rem',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  main: {
    maxWidth: '1200px',
    margin: '20px auto',
    padding: '20px',
  },
  heading: {
    fontSize: '2rem',
    textAlign: 'center',
    marginBottom: '20px',
  },
  message: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  productTitle: {
    fontSize: '1.5rem',
    margin: '16px 0',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
  },
  price: {
    fontSize: '1.25rem',
    color: '#333',
    fontWeight: 'bold',
  },
  stock: {
    fontSize: '1rem',
    color: '#28a745',
  },
};

export default Dashboard;
