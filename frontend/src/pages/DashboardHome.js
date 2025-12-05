import { useContext } from "react";
import {
  Grid,
  Card,
  CardContent,
  Box,
  Typography,
  Paper,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { AuthContext } from "../context/AuthContext";
import { can } from "../utils/checkAccess";
import { useNavigate } from "react-router-dom";

export default function DashboardHome() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const statsCards = [
    {
      title: "Total Donors",
      value: "0",
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#2196F3",
      show: can(user, "donor", "view"),
      path: "/donors",
    },
    {
      title: "Total Donations",
      value: "0",
      icon: <VolunteerActivismIcon sx={{ fontSize: 40 }} />,
      color: "#4CAF50",
      show: can(user, "donation", "view"),
      path: "/donations",
    },
    {
      title: "Reports Generated",
      value: "0",
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: "#FF9800",
      show: can(user, "report", "generate"),
      path: "/reports",
    },
    {
      title: "Active Roles",
      value: "0",
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
      color: "#9C27B0",
      show: can(user, "user", "view") || user?.role === "Admin",
      path: "/roles",
    },
  ];

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight={600}>
          Welcome back, {user?.name || "User"}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Role: <strong>{user?.role || "N/A"}</strong>
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {statsCards
          .filter((card) => card.show)
          .map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
                  },
                }}
                onClick={() => navigate(card.path)}
              >
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: card.color,
                        color: "white",
                        borderRadius: 2,
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Box>
                  <Typography variant="h4" fontWeight={600} gutterBottom>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {statsCards.filter((card) => card.show).length === 0 && (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            You don't have access to any modules yet.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Please contact your administrator for access.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}
