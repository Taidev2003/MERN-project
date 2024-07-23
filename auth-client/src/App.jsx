import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import ProtectedRoute from "./pages/ProtectedRoute";
import VerifyOTP from "./pages/verifyOtp";
import Addfood from "./pages/admin/Addfood";
import Menu from "./pages/Menu";
import FoodPage from "./pages/FoodPage";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/verifyOtp"
          element={
            <ProtectedRoute>
              <VerifyOTP />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addfood"
          element={
            <ProtectedRoute>
              <Addfood />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu"
          element={
            <ProtectedRoute>
              <Menu />
            </ProtectedRoute>
          }
        />
        <Route
          path="/menu/:id"
          element={
            <ProtectedRoute>
              <FoodPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
