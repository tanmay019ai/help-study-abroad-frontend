import { create } from "zustand";
import axios from "axios";

type UserState = {
  users: any[];
  total: number;
  loading: boolean;
  fetchUsers: (limit: number, skip: number) => Promise<void>;
  searchUsers: (q: string) => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  users: [],
  total: 0,
  loading: false,

  fetchUsers: async (limit, skip) => {
    set({ loading: true });
    const res = await axios.get(
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}`
    );
    set({ users: res.data.users, total: res.data.total, loading: false });
  },

  searchUsers: async (q) => {
    const res = await axios.get(
      `https://dummyjson.com/users/search?q=${q}`
    );
    set({ users: res.data.users, total: res.data.total });
  },
}));
