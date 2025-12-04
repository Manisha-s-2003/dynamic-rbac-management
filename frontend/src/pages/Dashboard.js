import { useContext } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import { AuthContext } from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import { can } from "../utils/checkAccess";

export default function Dashboard() {
  const { role, logout, user } = useContext(AuthContext);

  const dashboardCards = [];

  if (can(role, "donor", "view")) {
    dashboardCards.push({
      title: "Manage Donors",
      description: "View and manage donor information",
      path: "/donor",
      color: "#2196F3",
    });
  }

  if (can(role, "donation", "view")) {
    dashboardCards.push({
      title: "Manage Donations",
      description: "View and manage donation records",
      path: "/donation",
      color: "#4CAF50",
    });
  }

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <DashboardIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {user?.name || "User"}
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome, {user?.name || "User"}!
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Role: <strong>{role?.role || "N/A"}</strong>
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  },
                  borderTop: `5px solid ${card.color}`,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={RouterLink}
                    to={card.path}
                    variant="contained"
                    fullWidth
                  >
                    Open
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {dashboardCards.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="textSecondary">
              You don't have access to any modules yet.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
