"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  CardMedia,
} from "@mui/material";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then((res) => setProduct(res.data));
  }, [params.id]);

  if (!product) return null;

  return (
    <ProtectedRoute>
      <Box p={4}>
        <Button variant="outlined" onClick={() => router.push("/products")}>
          Back to Products
        </Button>

        <Typography variant="h4" mt={2} mb={2}>
          {product.title}
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              image={product.thumbnail}
              alt={product.title}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography>{product.description}</Typography>
            <Typography mt={1}>Price: ₹ {product.price}</Typography>
            <Typography>Category: {product.category}</Typography>
            <Typography>Rating: {product.rating}</Typography>
          </Grid>
        </Grid>
      </Box>
    </ProtectedRoute>
  );
}
