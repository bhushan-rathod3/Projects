import axios from "axios";

const API_URL = "https://fakestoreapi.com/carts";

export const fetchCart = async (userId: number) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const response = await axios.post(API_URL, {
    userId,
    date: new Date().toISOString().split("T")[0],
    products: [{ productId, quantity }],
  });
  return response.data;
};

export const updateCart = async (
  cartId: number,
  products: { productId: number; quantity: number }[]
) => {
  const response = await axios.put(`${API_URL}/${cartId}`, {
    date: new Date().toISOString().split("T")[0],
    products,
  });
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  await axios.delete(`${API_URL}/${cartId}`);
};
