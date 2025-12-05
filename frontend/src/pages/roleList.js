import React, { useEffect, useState } from "react";
import {
  Paper,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { getRoles, deleteRole } from "../service/roleService";
import { Link as RouterLink } from "react-router-dom";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      const res = await getRoles();
      setRoles(res.data);
      setError("");
    } catch (err) {
      setError("Failed to load roles");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedRoleId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteRole(selectedRoleId);
      setOpenDialog(false);
      setSelectedRoleId(null);
      fetchRoles();
    } catch (err) {
      setError("Failed to delete role");
      setOpenDialog(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRoleId(null);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Role Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            component={RouterLink}
            to="/add-role"
          >
            Add New Role
          </Button>
        </Box>
      </Paper>

      <Box>
        {error && (
          <Box
            sx={{
              p: 2,
              mb: 2,
              bgcolor: "#ffebee",
              color: "#c62828",
              borderRadius: 1,
            }}
          >
            {error}
          </Box>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        ) : roles.length > 0 ? (
          <TableContainer component={Paper} elevation={3}>
            <Table>
              <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Role Name</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((r) => (
                  <TableRow
                    key={r._id}
                    sx={{
                      "&:hover": { backgroundColor: "#fafafa" },
                      transition: "background-color 0.2s",
                    }}
                  >
                    <TableCell>{r.role}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        component={RouterLink}
                        to={`/edit-role/${r._id}`}
                        size="small"
                        color="primary"
                        title="Edit role"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteClick(r._id)}
                        title="Delete role"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper
            sx={{
              p: 4,
              textAlign: "center",
              backgroundColor: "#fafafa",
            }}
          >
            <Typography variant="h6" color="textSecondary" sx={{ mb: 2 }}>
              No roles found
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              component={RouterLink}
              to="/add-role"
            >
              Create First Role
            </Button>
          </Paper>
        )}
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Role</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this role? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RoleList;
