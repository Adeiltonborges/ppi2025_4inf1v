import React from 'react';
import styles from './Product.module.css';

export function Product({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />
      <div className={styles.info}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price}</span>
          <button
            className={styles.button}
            onClick={() => onAddToCart(product)}
          >
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
