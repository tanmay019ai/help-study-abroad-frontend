"use client";

import { Typography, Box } from "@mui/material";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Box p={4}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>
    </ProtectedRoute>
  );
}
