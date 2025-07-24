import { createContext } from "react";

export const CartContext = createContext({ 
    // context to manage the product state
    
    products: [],
    loading: false,
    error: null,
    
    // Context to manage cart state
    
    cart: [],
    addToCart: () => {},
    updateQtyCart: () => {},
    clearCart: () => {},
});

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  
  function addToCart(product) {
    setCart((prevCart) => [...prevCart, product]);
  }

  function updateQtyCart(id, delta) {
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

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQtyCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}