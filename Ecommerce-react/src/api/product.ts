import axios from "axios";
import { IProduct } from "../types/product";

const base_url = "https://fakestoreapi.com/products";
type Sort = "desc" | "asc";

export const fetchProducts = async (): Promise<IProduct[]> => {
  const response = await axios.get<IProduct[]>(base_url);
  return response.data;
};

export const fetchProductById = async (id: number): Promise<IProduct> => {
  const response = await axios.get<IProduct>(`${base_url}/${id}`);
  return response.data;
};

export const limitProducts = async (limit: number) => {
  const response = await axios.get(`${base_url}?limit=${limit}`);
  return response.data;
};

export const sortProducts = async (sort: Sort) => {
  const response = await axios.get(`${base_url}?limit=${sort}`);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get(`${base_url}/categories`);
  return response.data;
};

export const fetchByCategories = async (category: string) => {
  const response = await axios.get(`${base_url}/categories/${category}`);
  return response.data;
};

export const addProduct = async (product: IProduct): Promise<IProduct> => {
  const response = await axios.post<IProduct>(base_url, product);
  return response.data;
};

export const updateProduct = async (
  id: number,
  updatedProduct: Partial<IProduct>
): Promise<IProduct> => {
  const response = await axios.put(`${base_url}/${id}`, updatedProduct);
  return response.data;
};

export const patchProduct = async (
  id: number,
  updatedProduct: Partial<IProduct>
): Promise<IProduct> => {
  const response = await axios.patch(`${base_url}/${id}`, updatedProduct);
  return response.data;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axios.delete(`${base_url}/${id}`);
};
