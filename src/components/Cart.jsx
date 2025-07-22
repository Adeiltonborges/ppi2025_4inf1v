import styles from "./Cart.module.css";
import { useState } from "react";

export function Cart({ cart, setCart }) {
  const grouped = cart.reduce((acc, product) => {
    acc[product.id] = acc[product.id] || { ...product, quantity: 0 };
    acc[product.id].quantity += 1;
    return acc;
  }, {});

  const products = Object.values(grouped);

  function updateQuantity(id, delta) {
    setCart((prev) => {
      const newCart = [...prev];
      const idx = newCart.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      if (delta > 0) {
        return [...newCart, newCart[idx]];
      } else {
        const removeIdx = newCart.findIndex((p) => p.id === id);
        if (removeIdx !== -1) newCart.splice(removeIdx, 1);
        return newCart;
      }
    });
  }

  function removeAll() {
    setCart([]);
  }

  const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className={styles.cart}>
      <h2>Carrinho de Compras</h2>
      {products.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <button
            onClick={removeAll}
            style={{
              marginBottom: "2rem",
              background: "#fff",
              color: "#d00",
              border: "2px solid #d00",
              borderRadius: "1rem",
              padding: "1rem 2rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            REMOVER TODOS OS PRODUTOS
          </button>
          <ul
            style={{
              width: "100%",
              listStyle: "none",
              padding: 0,
            }}
          >
            {products.map((product) => (
              <li
                key={product.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #eee",
                  padding: "1rem 0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "2rem",
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "8rem",
                      borderRadius: "1rem",
                    }}
                  />
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: "2rem",
                      }}
                    >
                      {product.title}
                    </h3>
                    <p
                      style={{
                        margin: 0,
                        color: "#888",
                      }}
                    >
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    style={{
                      fontSize: "2rem",
                      width: "3rem",
                      height: "3rem",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontSize: "2rem",
                    }}
                  >
                    {product.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    style={{
                      fontSize: "2rem",
                      width: "3rem",
                      height: "3rem",
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    setCart((prev) => prev.filter((p) => p.id !== product.id))
                  }
                  style={{
                    color: "#d00",
                    background: "none",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                  }}
                >
                  REMOVER
                </button>
              </li>
            ))}
          </ul>
          <div
            style={{
              marginTop: "2rem",
              textAlign: "right",
            }}
          >
            <h3>Total: R$ {total.toFixed(2)}</h3>
          </div>
        </>
      )}
    </div>
  );
}