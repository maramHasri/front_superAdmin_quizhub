import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/home/pages/HomePage";
import UsersPage from "@/features/users/pages/UsersPage";
import UserDetailsPage from "@/features/users/pages/UserDetailsPage";
import AnalyticsPage from "@/features/analytics/pages/AnalyticsPage";
import ReportsPage from "@/features/reports/pages/ReportsPage";
import ReportDetailsPage from "@/features/reports/pages/ReportDetailsPage";
import InstitutionDetailsPage from "@/features/institutions/pages/InstitutionDetailsPage";
import ProtectedRoute from "@/components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <AnalyticsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/:userId"
          element={
            <ProtectedRoute>
              <UserDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <ReportsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports/:reportId"
          element={
            <ProtectedRoute>
              <ReportDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/institutions/:institutionId"
          element={
            <ProtectedRoute>
              <InstitutionDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
