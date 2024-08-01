import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Shared/Footer";
import Navbar from "./Shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import ProtectedRoute from "./pages/ProtectedRoute";
import VerifyOTP from "./pages/verifyOtp";
import Addfood from "./pages/admin/Addfood";
import AllOrder from "./pages/admin/AllOrder";

import Menu from "./pages/Menu";
import FoodPage from "./pages/FoodPage";
import Profile from "./pages/Profile";
import ViewCard from "./pages/ViewCard";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import Order from "./pages/Order";
import MyOrder from "./pages/MyOrder";
function App() {
  const stripePromise = loadStripe(
    "pk_test_51PhpQGFLyQ0kKP5rhvRQJVPqsYYji1eeGfvDFzp2CbtdoLhn4NuELmWkKQhVHeNLzoSPFnQuKVzmyA8xGVvXzuNd00FQpkGDpi"
  );
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
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
        <Route
          path="/viewcard"
          element={
            <ProtectedRoute>
              <ViewCard />
            </ProtectedRoute>
          }
        />{" "}
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cancel"
          element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-order"
          element={
            <ProtectedRoute>
              <MyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-order"
          element={
            <ProtectedRoute>
              <AllOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Elements stripe={stripePromise}>
                <Order />
              </Elements>
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
