import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import PublicPortfolio from "./pages/PublicPortfolio.jsx";

function App() {
  const isLoggedIn = localStorage.getItem("token") ? true : false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/portfolio/:userId" element={<PublicPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
