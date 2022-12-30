import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

function App() {
  return (
    <Routes>
      <Route path="auth">
        <Route path="login" element={<Login />} />
        <Route path="register" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
