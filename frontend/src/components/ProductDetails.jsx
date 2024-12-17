import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddToCart from './AddToCart/AddToCart';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/products/${id}`);
        setProduct(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading product details...</p>;

  return (
    <div style={styles.productDetailsContainer}>
      <div style={styles.productImageSection}>
        <img src={product.image} alt={product.name} style={styles.productImage} />
      </div>
      <div style={styles.productInfoSection}>
        <h2 style={styles.productName}>{product.name}</h2>
        <p style={styles.productPrice}>Price: ₹{product.price}</p>
        <p style={styles.productDescription}>{product.description}</p>
        <button onClick={() => window.history.back()} style={styles.backButton}>
          Back to Dashboard
        </button>
        <AddToCart product={product}/>
      </div>
    </div>
  );
};

// Inline CSS styles
const styles = {
  productDetailsContainer: {
    display: 'flex',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: 'auto',
    gap: '20px',
  },
  productImageSection: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  productImage: {
    width: '100%',
    maxWidth: '300px',
    borderRadius: '8px',
  },
  productInfoSection: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  productName: {
    fontSize: '1.8em',
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: '1.4em',
    color: '#28a745',
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: '1.1em',
    color: '#555',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#ff6200',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  backButtonHover: {
    backgroundColor: '#ff8533',
  },
};

export default ProductDetails;
