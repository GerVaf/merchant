// src/store/userStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

const useUserStore = create(
  persist(
    (set) => ({
      userData: null,

      setUserData: (data) => {
        Cookies.set("auth-admin-token", data.token); // Set the auth-admin-token cookie
        set({ userData: data.data }); // Update user data in the store
      },

      clearUserData: () => {
        Cookies.remove("auth-admin-token"); 
        set({ userData: null }); 
      },
    }),
    {
      name: "user-store",
      getStorage: () => localStorage,
    }
  )
);

export default useUserStore;
