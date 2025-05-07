// Simulated API call (replace later with real API)
import axiosInstance from "../api/axiosInstance";

// 1. Register a new user
export const registerUser = async (data: any) => {
  const response = await axiosInstance.post("create", data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axiosInstance.post("login", data);
  return response.data;
};

export const getAdminById = async (id: string) => {
  const response = await axiosInstance.get(`getById/${id}`);
  return response.data;
};

export const updateAdmin = async (data: {
  id: string;
  email?: string;
  password?: string;
}) => {
  const response = await axiosInstance.put("update", {
    id: data.id,
    email: data.email,
    password: data.password,
  });
  return response.data;
};
