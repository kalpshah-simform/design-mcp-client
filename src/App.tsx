import { Navigate, Route, Routes } from "react-router-dom";
import AnalyticsDashboard from "./pages/Analytics";
import ProjectManagementPage from "./pages/ProjectManagement";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/projects" replace />} />
      <Route path="/projects" element={<ProjectManagementPage />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
    </Routes>
  );
}
