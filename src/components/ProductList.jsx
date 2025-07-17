// ProductList.jsx
import React, { useEffect, useState } from 'react';
import styles from './ProductList.module.css';
import { CircularProgress } from '@mui/material';
import { Product } from './Product';

export function ProductList() {
  const category = 'smartphones';
  const limit = 10;
  const apiUrl =
    `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
    console.log('Carrinho:', [...cart, product]);
  };

  return (
    <div className={styles.container}>
      <h1>TJA Megastore</h1>

      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: '2rem auto', display: 'block' }}
            sx={{ color: '#001111' }}
          />
          <p>Loading products...</p>
        </div>
      )}

      {error && <p>Error loading products: {error.message}</p>}

      <div className={styles.grid}>
        {products.map(product => (
          <Product
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}
