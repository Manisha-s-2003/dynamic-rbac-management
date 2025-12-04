import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { createRole, getRoleById, updateRole } from "../service/roleService";
import { useParams, useNavigate } from "react-router-dom";

const RoleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [moduleAccess, setModuleAccess] = useState({
    donor: false,
    donation: false,
    npfuaf: false,
    import: false,
    report: false,
    reset: false,
    user: false,
    manageOptions: false,
  });

  const [permissionAccess, setPermissionAccess] = useState({
    donor: { view: false, add: false, edit: false, delete: false, export: false },
    donation: { view: false, add: false, edit: false, delete: false, export: false },
    npfuaf: { view: false, add: false, edit: false, delete: false, export: false },
    import: { import: false },
    report: { generate: false, export: false },
    reset: { reset: false },
    user: { view: false, add: false, edit: false, delete: false },
    manageOptions: { view: false, add: false, edit: false, delete: false },
  });

  useEffect(() => {
    if (id) loadRole();
  }, [id]);

  const loadRole = async () => {
    try {
      const res = await getRoleById(id);
      setRole(res.data.role);
      setModuleAccess(res.data.moduleAccess[0]);
      setPermissionAccess(res.data.permissionAccess[0]);
    } catch (err) {
      setError("Failed to load role");
    }
  };

  const toggleModule = (m) => {
    setModuleAccess({ ...moduleAccess, [m]: !moduleAccess[m] });
  };

  const togglePermission = (mod, perm) => {
    setPermissionAccess({
      ...permissionAccess,
      [mod]: {
        ...permissionAccess[mod],
        [perm]: !permissionAccess[mod][perm],
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        role,
        moduleAccess: [moduleAccess],
        permissionAccess: [permissionAccess],
      };

      if (id) {
        await updateRole(id, payload);
      } else {
        await createRole(payload);
      }

      navigate("/roles");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/roles")}
          >
            Back
          </Button>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            {id ? "Edit Role" : "Create New Role"}
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
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

          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 4 }}>
              <TextField
                fullWidth
                label="Role Name"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                variant="outlined"
              />
            </Box>

            {/* Module Access Section */}
            <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
              Module Access
            </Typography>
            <Grid container spacing={2} sx={{ mb: 4 }}>
              {Object.keys(moduleAccess).map((m) => (
                <Grid item xs={12} sm={6} md={3} key={m}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={moduleAccess[m]}
                        onChange={() => toggleModule(m)}
                      />
                    }
                    label={m.charAt(0).toUpperCase() + m.slice(1)}
                  />
                </Grid>
              ))}
            </Grid>

            {/* Permissions Section */}
            <Typography variant="h6" sx={{ mb: 2, mt: 3, fontWeight: 600 }}>
              Permissions by Module
            </Typography>
            <Grid container spacing={2}>
              {Object.keys(permissionAccess).map((mod) => (
                <Grid item xs={12} key={mod}>
                  <Card
                    sx={{
                      opacity: moduleAccess[mod] ? 1 : 0.6,
                      backgroundColor: moduleAccess[mod] ? "white" : "#f5f5f5",
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          mb: 2,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          color: "primary.main",
                        }}
                      >
                        {mod}
                      </Typography>
                      <FormGroup row>
                        {Object.keys(permissionAccess[mod]).map((perm) => (
                          <FormControlLabel
                            key={perm}
                            control={
                              <Checkbox
                                checked={permissionAccess[mod][perm]}
                                onChange={() => togglePermission(mod, perm)}
                                disabled={!moduleAccess[mod]}
                              />
                            }
                            label={perm.charAt(0).toUpperCase() + perm.slice(1)}
                            sx={{ mr: 2, mb: 1 }}
                          />
                        ))}
                      </FormGroup>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {/* Submit Button */}
            <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading ? "Saving..." : id ? "Update Role" : "Create Role"}
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/roles")}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default RoleForm;
