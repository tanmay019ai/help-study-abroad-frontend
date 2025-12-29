"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../components/ProtectedRoute";

export default function UserDetail({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${params.id}`)
      .then((res) => setUser(res.data));
  }, [params.id]);

  if (!user) return null;

  return (
    <ProtectedRoute>
      <Box p={4}>
        <Button variant="outlined" onClick={() => router.push("/users")}>
          Back to Users
        </Button>

        <Typography variant="h4" mt={2}>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography>Email: {user.email}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
        <Typography>Address: {user.address?.address}</Typography>
      </Box>
    </ProtectedRoute>
  );
}
