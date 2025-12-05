// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import DashboardHome from "./pages/DashboardHome";
import DonorPage from "./pages/DonorPage";
import DonationPage from "./pages/DonationPage";
import ReportsPage from "./pages/ReportsPage";
import RoleList from "./pages/roleList";
import RoleForm from "./pages/roleForm";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#fafafa",
    },
  },
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes with Layout */}
            <Route
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/donors" element={<DonorPage />} />
              <Route path="/donations" element={<DonationPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/add-role" element={<RoleForm />} />
              <Route path="/edit-role/:id" element={<RoleForm />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
