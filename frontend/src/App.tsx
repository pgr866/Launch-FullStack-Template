import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"
import { Portal } from "@/pages/portal/portal";
import { Home } from "@/pages/home/home";
import { Login } from "@/pages/login";
import { RecoverPassword } from "@/pages/recover-password";
import { Signup } from "@/pages/signup";
import { checkAuth } from "@/api";
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/home") || location.pathname.startsWith("/api")) { return; }
    const fetchAuthStatus = async () => {
      try {
        const response = await checkAuth();
        if (response.status === 200) {
          setIsAuthenticated(response.data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    fetchAuthStatus();
  }, [location]);

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/portal" /> : <Login />} />
        <Route path="/recover-password" element={isAuthenticated ? <Navigate to="/portal" /> : <RecoverPassword />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/portal" /> : <Signup />} />
        <Route path="/portal" element={isAuthenticated ? <Portal /> : <Navigate to="/login" />} />
        <Route path="/api/*" />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
