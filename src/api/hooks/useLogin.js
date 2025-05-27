// src/api/hooks/useLogin.js

import { useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "../services/auth_service";
import { getDashboardData } from "../services/service";

// Custom hook for login mutation
export const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error("Login failed:", error);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...options,
  });
};

export const useGetDashboardData = (options = {}) => {
  return useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
    onSuccess: (data) => {
      if (options.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error) => {
      console.error("Fetching dashboard data failed:", error);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...options, // Allow passing additional react-query options
  });
};


