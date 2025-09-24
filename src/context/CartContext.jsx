
import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  // Context to manage the products state
  products: [],
  loading: false,
  error: null,
  // Context to manage the cart state
  cart: [],
  addToCart: () => { },
  updateQtyCart: () => { },
  clearCart: () => { },
  // Context to manage user session
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignup: () => { },
  handleSignin: () => { },
  handleSignout: () => { },
});

export function CartProvider({ children }) {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    async function fetchProductsSupabase() {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        setError(`fetching products failed! ${error.message}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();

    // State to manage products
    // var category = "smartphones";
    // var limit = 10;
    // var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    //   async function fetchProducts() {
    //     try {
    //       const response = await fetch(apiUrl);
    //       const data = await response.json();
    //       setProducts(data.products);
    //     } catch (error) {
    //       setError(error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   fetchProducts();
  }, []);

  // State to manage the cart
  const [cart, setCart] = useState([]);

  function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }
 //  user session management 

 const [session, setSession] = useState(null);
 const [sessionLoading, setSessionLoading] = useState(false);
 const [sessionMessage, setSessionMessage] = useState(null);
 const [sessionError, setSessionError] = useState(null);



 async function handleSignup (email, password, username) {
  setSessionLoading(true);
  setSessionMessage(null);
  setSessionError(null);

  try {
    const {data, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
          admin: false,
        },
        emailRedirectTo: `${window.location.origin}/signin`,
      },
    });

    if (error)  throw error;
    
    if (data.user) {
      setSessionMessage("Signup successful! Please check your email to confirm your account.");
      window.location.href = "/signin";
    }
  }catch (error) {
    setSessionError(error.message);
  } finally {
    setSessionLoading(false);
  }
 }

 async function handleSignin (email, password) {setSessionLoading(true);
  setSessionMessage(null);
  setSessionError(null);

  try {
    const {data, error} = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error)  throw error;

    if (data.session) {
      setSession(data.session);
      setSessionMessage("Signin successful! ");
      window.location.href = "/";
    }
  }catch (error) {
    setSessionError(error.message);
  } finally {
    setSessionLoading(false);
  }
 
 
 async function handleSignout () {setSessionLoading(true);
  setSessionMessage(null);
  setSessionError(null);

  try {
    const {error} = await supabase.auth.signOut();

    if (error)  throw error;
    setSession(null);
    window.location.href = "/";
  }catch (error) {
    setSessionError(error.message);
  } finally {
    setSessionLoading(false);
  }}

  const context = {
    products: products,
    loading: loading,
    error: error,
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    clearCart: clearCart,
    // context for user session
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignup: handleSignup,
    handleSignin: handleSignin,
    handleSignout: handleSignout,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
