import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";
import HomePage from "@/features/home/pages/HomePage";
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

        {/* Always open on login first */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
