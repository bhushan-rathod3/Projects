import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUsers, createUser, updateUser, deleteUser } from "../api/users";
import { User } from "../types";
import { message } from "antd";

export const useUsers = (page: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", page],
    queryFn: () => getUsers(page),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
  });


  const createUserMutation = useMutation({
    mutationFn: (user: Omit<User, "id">) => createUser(user),
    onSuccess: () => {
      console.log("✅ User created successfully! Showing message...");

      message.success("User created successfully!");

      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      console.error("❌ User creation failed");

      message.error("Failed to create user. Please try again.");
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, user }: { id: number; user: Partial<User> }) =>
      updateUser(id, user),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["users", page], (oldData: any) => ({
        ...oldData,
        data: oldData?.data.map((user: User) =>
          user.id === updatedUser.id ? updatedUser : user
        ),
      }));
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_: unknown, id: number) => {
      queryClient.setQueryData(["users", page], (oldData: any) => ({
        ...oldData,
        data: oldData?.data.filter((user: User) => user.id !== id),
      }));
    },
  });

  return {
    data,
    isLoading,
    isError,
    createUserMutation,
    updateUserMutation,
    deleteUserMutation,
  };
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, { id: number; user: Partial<User> }>({
    mutationFn: async ({ id, user }) => {
      const response = await updateUser(id, user);
      return response.data;
    },
    onSuccess: (_: User, { id }: { id: number }) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user", id] });
    },
  });
};
