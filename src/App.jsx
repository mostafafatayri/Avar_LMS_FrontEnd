import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./Pages/Home/Home";
import EmployeesList from "./Pages/Employees/EmployeesList";
import DepartmentsList from "./Pages/Departments/DepartmentsList";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
  path="/departments"
  element={
    <ProtectedRoute>
      <DepartmentsList />
    </ProtectedRoute>
  }
/>

        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <EmployeesList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;