import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken, refreshAccessToken } from "../services/authService";

export default function ProtectedRoute({ children }) {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();

      if (token) {
        setIsAuthenticated(true);
        setIsCheckingAuth(false);
        return;
      }

      try {
        await refreshAccessToken();
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}