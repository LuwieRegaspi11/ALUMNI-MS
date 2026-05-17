import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import AdminDashboard from "./components/AdminDashboard";
import AlumniDashboard from "./components/AlumniDashboard";
import UserDashboard from "./components/UserDashboard";
import RepresentativeDashboard from "./components/RepresentativeDashboard";
import {
  AuthProvider,
  useAuth,
} from "./components/AuthContext";

function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={<RegistrationPage />}
          />
          <Route
            path="/unauthorized"
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-4xl mb-4">
                    Unauthorized Access
                  </h1>
                  <p className="text-gray-600">
                    You don't have permission to access this
                    page.
                  </p>
                </div>
              </div>
            }
          />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/alumni/*"
            element={
              <ProtectedRoute allowedRoles={["alumni"]}>
                <AlumniDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/*"
            element={
              <ProtectedRoute allowedRoles={["faculty"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/representative/*"
            element={
              <ProtectedRoute allowedRoles={["representative"]}>
                <RepresentativeDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={<LandingPage />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}