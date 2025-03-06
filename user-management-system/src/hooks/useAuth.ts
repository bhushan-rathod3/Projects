import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth";
import { useAuthStore } from "../store/authStore";

export const useAuth = () => {
  const setToken = useAuthStore((state) => state.setToken);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    onSuccess: (data) => setToken(data.token),
  });

  const registerMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      register(email, password),
    onSuccess: (data) => setToken(data.token),
  });

  return { loginMutation, registerMutation };
};
