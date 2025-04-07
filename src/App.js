import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Inventory from "./Inventory";



const isAuthenticated = localStorage.getItem("user");

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/magazzino"
          element={isAuthenticated ? <Inventory /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
