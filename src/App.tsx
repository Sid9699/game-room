import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Route>
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default App;
