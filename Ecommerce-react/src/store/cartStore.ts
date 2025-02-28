import { create } from "zustand";
import { fetchCart, addToCart, updateCart, deleteCart } from "@/api/cart";

interface CartItem {
  productId: number;
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  cartId: number | null;
  fetchUserCart: (userId: number) => Promise<void>;
  addToCart: (userId: number, productId: number) => Promise<void>;
  updateItem: (
    cartId: number,
    productId: number,
    quantity: number
  ) => Promise<void>;
  clearCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  cartId: null,

  fetchUserCart: async (userId) => {
    const cartData = await fetchCart(userId);
    if (cartData.length > 0) {
      set({ cartItems: cartData[0].products, cartId: cartData[0].id });
    }
  },

  addToCart: async (userId, productId) => {
    const newCart = await addToCart(userId, productId, 1);
    if (newCart) {
      set({ cartItems: newCart.products, cartId: newCart.id });
    }
  },

  updateItem: async (cartId, productId, quantity) => {
    if (!cartId) return;

    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      ),
    }));

    await updateCart(cartId, get().cartItems);
  },

  clearCart: async () => {
    const { cartId } = get();
    if (!cartId) return;
    await deleteCart(cartId);
    set({ cartItems: [], cartId: null });
  },
}));
