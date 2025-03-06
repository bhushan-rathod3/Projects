import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  setToken: (token: string | null, isAdmin?: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      isAdmin: false,

      setToken: (token, isAdmin = false) => {
        set({ token, isAuthenticated: !!token, isAdmin });
      },

      logout: () => {
        set({ token: null, isAuthenticated: false, isAdmin: false });
        useAuthStore.persist.clearStorage();
      },
    }),
    { name: "auth-storage" }
  )
);
