import { create } from "zustand";
import axios from "axios";

type ProductState = {
  products: any[];
  total: number;
  categories: string[];
  fetchProducts: (limit: number, skip: number) => Promise<void>;
  searchProducts: (q: string) => Promise<void>;
  fetchByCategory: (category: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
};

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  total: 0,
  categories: [],

  fetchProducts: async (limit, skip) => {
    const res = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    set({ products: res.data.products, total: res.data.total });
  },

  searchProducts: async (q) => {
    const res = await axios.get(
      `https://dummyjson.com/products/search?q=${q}`
    );
    set({ products: res.data.products, total: res.data.total });
  },

  fetchByCategory: async (category) => {
    const res = await axios.get(
      `https://dummyjson.com/products/category/${category}`
    );
    set({ products: res.data.products, total: res.data.total });
  },

  fetchCategories: async () => {
    const res = await axios.get("https://dummyjson.com/products/categories");
    set({ categories: res.data });
  },
}));
