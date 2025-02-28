import axios from "axios";

const BASE_URL = "https://fakestoreapi.com/carts";

export const fetchUserCart = async (userId: number) => {
  const response = await axios.get(`${BASE_URL}/user/${userId}`);
  return response.data;
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number
) => {
  const response = await axios.post(BASE_URL, {
    userId,
    date: new Date().toISOString(),
    products: [{ productId, quantity }],
  });
  return response.data;
};

export const updateCart = async (
  cartId: number,
  products: { productId: number; quantity: number }[]
) => {
  const response = await axios.put(`${BASE_URL}/${cartId}`, {
    date: new Date().toISOString(),
    products,
  });
  return response.data;
};

export const deleteCart = async (cartId: number) => {
  await axios.delete(`${BASE_URL}/${cartId}`);
};
