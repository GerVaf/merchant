import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  deleteUser,
  unactiveUser,
  getData,
} from "../services/service";

export const useGetUser = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["users", page, limit],
    queryFn: () => getUsers(page, limit),
  });
};

export const useGetAdmin = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["admin", page, limit],
    queryFn: () => getData("users/admins", page, limit),
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser, // Pass the deleteUser function directly
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
export const useUnactiveUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: unactiveUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });
};
