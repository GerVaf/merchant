// src/services/auth_service.js

import axiosInstance from "../../utils/axios_instance";

// Function to login user
export const loginUser = async (credentials) => {
  try {
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error; // Ensure the error is propagated correctly
  }
};
