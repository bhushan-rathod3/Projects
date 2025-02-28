import { useEffect, useState } from "react";
import { useProduct } from "../context/ProductContext";
import { addToCart, updateCart, deleteCart } from "../api/cart";
import { IProduct } from "../types/product";

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
}

const CartPage = () => {
  const { fetchProductById } = useProduct();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<{ [key: number]: IProduct }>({});

  useEffect(() => {
    const loadProducts = async () => {
      const productData: { [key: number]: IProduct } = {};
      for (const item of cartItems) {
        const product = await fetchProductById(item.productId);
        if (product) {
          productData[item.productId] = product;
        }
      }
      setProducts(productData);
    };

    if (cartItems.length > 0) {
      loadProducts();
    }
  }, [cartItems]);

  const handleQuantityChange = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleUpdateCart = async () => {
    const userId = 1;
    await updateCart(
      userId,
      cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }))
    );
  };

  const handleClearCart = async () => {
    const userId = 1;
    await deleteCart(userId);
    setCartItems([]);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item.id}>
            <p>{products[item.productId]?.title || "Loading..."}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleQuantityChange(item.id, parseInt(e.target.value))
              }
            />
          </div>
        ))
      )}
      <button onClick={handleUpdateCart}>Update Cart</button>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default CartPage;
