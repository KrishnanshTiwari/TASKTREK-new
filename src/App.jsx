import React from "react";
import User from "./pages/User";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext} from "./context/AuthContext";
import Home from "./Home";
export default function App() {
  const {currentUser} = useContext(AuthContext)

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/User" />;
  };
  return (
    
    <div>
      <Routes>
        <Route path="/" element={
                <RequireAuth>
                  <Home />
                </RequireAuth>}
        />
        <Route path="/User" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
   
  );
}
