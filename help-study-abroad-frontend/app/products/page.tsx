"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  Pagination,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useProductStore } from "../../store/productStore";
import ProductCard from "../../components/ProductCard";
import ProtectedRoute from "../../components/ProtectedRoute";

const LIMIT = 10;

export default function ProductsPage() {
  const router = useRouter();
  const {
    products,
    total,
    categories,
    fetchProducts,
    searchProducts,
    fetchByCategory,
    fetchCategories,
  } = useProductStore();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchProducts(LIMIT, (page - 1) * LIMIT);
    fetchCategories();
  }, [page]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      searchProducts(value);
    } else {
      setPage(1);
      fetchProducts(LIMIT, 0);
    }
  };

  const handleCategory = (value: string) => {
    setCategory(value);
    if (value) {
      fetchByCategory(value);
    } else {
      fetchProducts(LIMIT, 0);
    }
  };

  return (
    <ProtectedRoute>
      <Box p={4}>
        <Typography variant="h5" mb={2}>
          Products
        </Typography>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search products"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Select
              fullWidth
              value={category}
              displayEmpty
              onChange={(e) => handleCategory(e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c} value={c}>
                  {c}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProductCard
                product={p}
                onClick={() => router.push(`/products/${p.id}`)}
              />
            </Grid>
          ))}
        </Grid>

        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(total / LIMIT)}
            page={page}
            onChange={(_, v) => setPage(v)}
          />
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
