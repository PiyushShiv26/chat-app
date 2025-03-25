import {create} from "zustand";
import {axiosInstance} from "../lib/axios.js";
import axios from "axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      const data = await res.json();
      if (res.ok) {
        set({ authUser: data.user });
      } else {
        set({ authUser: null });
      }
    } catch (err) {
      console.error(err);
    }
    set({ isCheckingAuth: false });
  },
}));