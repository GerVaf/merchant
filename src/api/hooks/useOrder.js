// src/api/hooks/useOrder.js

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteData, editData, getData, updateLandingPaymentTypes } from "../services/service";

export const useGetOrders = () => {
  return useQuery({
    queryKey: ["order"],
    queryFn: () => getData("orders"),
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderId) => deleteData("orders", orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, orderData }) =>
      editData("orders", orderId, orderData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order"] });
    },
  });
};

export const useUpdateLandingPaymentTypes = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentTypes) => updateLandingPaymentTypes(paymentTypes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-landing"] }); 
    },
  });
};

