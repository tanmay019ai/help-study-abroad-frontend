"use client";

import { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/userStore";
import ProtectedRoute from "../../components/ProtectedRoute";

const LIMIT = 10;

export default function UsersPage() {
  const router = useRouter();
  const { users, total, fetchUsers, searchUsers } = useUserStore();

  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchUsers(LIMIT, (page - 1) * LIMIT);
  }, [page]);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value) {
      searchUsers(value);
    } else {
      setPage(1);
      fetchUsers(LIMIT, 0);
    }
  };

  return (
    <ProtectedRoute>
      <Box p={4}>
        <Typography variant="h5" mb={2}>
          Users
        </Typography>

        <TextField
          fullWidth
          placeholder="Search users"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map((u) => (
              <TableRow
                key={u.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/users/${u.id}`)}
              >
                <TableCell>
                  {u.firstName} {u.lastName}
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.gender}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.company?.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Box mt={3} display="flex" justifyContent="center">
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
