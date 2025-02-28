import { create } from "zustand";
import { addToCart, fetchUserCart, updateCart, deleteCart } from "@/api/cart";

export type CartItem = {
  productId: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  fetchCart: (userId: number) => Promise<void>;
  addToCart: (
    userId: number,
    productId: number,
    quantity: number
  ) => Promise<void>;
  updateItemQuantity: (cartId: number, products: CartItem[]) => Promise<void>;
  clearCart: (cartId: number) => Promise<void>;
};

export const useCartStore = create<CartState>((set) => ({
  cart: [],

  // ✅ Fetch user's cart
  fetchCart: async (userId) => {
    const cartData = await fetchUserCart(userId);
    set({ cart: cartData[0]?.products || [] });
  },

  // ✅ Add product to cart and update state
  addToCart: async (userId, productId, quantity) => {
    await addToCart(userId, productId, quantity);
    set((state) => ({
      cart: [...state.cart, { productId, quantity }],
    }));
  },

  // ✅ Update cart item quantity
  updateItemQuantity: async (cartId, products) => {
    await updateCart(cartId, products);
    set({ cart: products });
  },

  // ✅ Clear cart
  clearCart: async (cartId) => {
    await deleteCart(cartId);
    set({ cart: [] });
  },
}));
