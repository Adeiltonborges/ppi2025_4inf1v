import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "./SessionContext";

export const CartContext = createContext({
  products: [],
  loading: false,
  error: null,
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  addProduct: () => {},
  updateProduct: () => {},
  deleteProduct: () => {},
  refreshProducts: () => {},
});

export function CartProvider({ children }) {
  const { session } = useContext(SessionContext);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔹 Buscar produtos (reutilizável)
  async function fetchProducts() {
    setLoading(true);
    const { data, error } = await supabase.from("product").select();
    if (error) setError(error.message);
    else setProducts(data);
    setLoading(false);
  }

  // 🔹 Carregar produtos na montagem + realtime listener
  useEffect(() => {
    fetchProducts();

    // 🟢 Escuta em tempo real: insert, update e delete na tabela "product"
    const channel = supabase
      .channel("realtime-products")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product" },
        () => {
          fetchProducts(); // Recarrega produtos automaticamente
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // 🔹 Carregar carrinho do usuário autenticado
  useEffect(() => {
    if (!session) {
      setCart([]);
      return;
    }

    async function fetchCart() {
      setLoading(true);
      const { data, error } = await supabase
        .from("cart")
        .select("product_id, quantity, product(*)")
        .eq("user_id", session.user.id);

      if (error) setError(error.message);
      else {
        const formatted = data.map((i) => ({
          ...i.product,
          quantity: i.quantity,
        }));
        setCart(formatted);
      }
      setLoading(false);
    }

    fetchCart();
  }, [session]);

  // 🔹 Adicionar produto ao carrinho
  async function addToCart(product) {
    if (!session) {
      alert("Sign in first!");
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      updateQtyCart(product.id, existing.quantity + 1);
    } else {
      const { error } = await supabase.from("cart").insert({
        user_id: session.user.id,
        product_id: product.id,
        quantity: 1,
      });
      if (!error) setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  // 🔹 Atualizar quantidade no carrinho
  async function updateQtyCart(productId, qty) {
    if (!session) return;
    const { error } = await supabase
      .from("cart")
      .update({ quantity: qty })
      .eq("user_id", session.user.id)
      .eq("product_id", productId);
    if (!error)
      setCart((prev) =>
        prev.map((i) => (i.id === productId ? { ...i, quantity: qty } : i))
      );
  }

  // 🔹 Remover item do carrinho
  async function removeFromCart(productId) {
    if (!session) return;
    await supabase
      .from("cart")
      .delete()
      .eq("user_id", session.user.id)
      .eq("product_id", productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
  }

  // 🔹 Limpar carrinho
  async function clearCart() {
    if (!session) return;
    await supabase.from("cart").delete().eq("user_id", session.user.id);
    setCart([]);
  }

  // 🔹 Admin: adicionar novo produto
  async function addProduct(newProduct) {
    const { error } = await supabase.from("product").insert(newProduct);
    if (error) setError(error.message);
  }

  // 🔹 Admin: atualizar produto existente
  async function updateProduct(id, updates) {
    const { error } = await supabase.from("product").update(updates).eq("id", id);
    if (error) setError(error.message);
  }

  // 🔹 Admin: deletar produto
  async function deleteProduct(id) {
    const { error } = await supabase.from("product").delete().eq("id", id);
    if (error) setError(error.message);
  }

  return (
    <CartContext.Provider
      value={{
        products,
        loading,
        error,
        cart,
        addToCart,
        updateQtyCart,
        removeFromCart,
        clearCart,
        addProduct,
        updateProduct,
        deleteProduct,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
