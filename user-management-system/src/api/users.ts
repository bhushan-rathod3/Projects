import axios from "axios";
import { User } from "../types";

const API_URL = "https://reqres.in/api/users";

export const getUsers = async (page: number) => {
  const response = await axios.get(`${API_URL}?page=${page}&per_page=6`);
  return response.data;
};

export const getUserById = async (id: number) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data.data;
};

export const createUser = async (user: Omit<User, "id">) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export const updateUser = async (id: number, user: Partial<User>) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

export const deleteUser = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getDelayedResponse = async () => {
  const response = await axios.get("/delayed-response");
  return response.data;
};
