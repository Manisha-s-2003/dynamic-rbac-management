// src/context/AuthContext.js
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load auth data from localStorage on app startup
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      try {
        const data = JSON.parse(storedAuth);
        setUser(data.user);
        setRole(data.role || data.user?.role);
        setToken(data.token);
      } catch (err) {
        console.error("Failed to load auth data", err);
        localStorage.removeItem("auth");
      }
    }
    setLoading(false);
  }, []);

  const login = (data) => {
    // Handle both formats: { user, role, token } or { user: { role }, token }
    const userData = data.user || data;
    const userRole = data.role || userData?.role;
    const authToken = data.token;

    setUser(userData);
    setRole(userRole);
    setToken(authToken);

    localStorage.setItem("auth", JSON.stringify({
      user: userData,
      role: userRole,
      token: authToken,
    }));
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, role, token, login, logout, loading, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};
