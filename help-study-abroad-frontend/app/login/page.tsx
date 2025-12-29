"use client";

import { useState } from "react";
import { Box, Button, TextField, Paper, Typography } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://dummyjson.com/auth/login", {
        username,
        password,
      });

      login(res.data, res.data.token);
      router.push("/dashboard");
    } catch {
      alert("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" mb={2}>
          Admin Login
        </Typography>

        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          disabled={loading}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Box>
  );
}
