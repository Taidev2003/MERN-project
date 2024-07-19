import { useUserContext } from "../../context/userContext";
import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { user, setUser } = useUserContext();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const res = await axios.post(
          "http://localhost:8000/api/v1/user/get-user",
          { token },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          setUser(res.data.data);
        } else {
          throw new Error("Failed to get user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        // Handle error, clear localStorage and redirect to login
        localStorage.clear();
        // Navigate to login using programmatic navigation
        window.location.href = "/login";
      }
    };

    if (!user) {
      getUser();
    }
  }, [user, setUser]);

  // Check if token exists to determine rendering
  if (localStorage.getItem("token")) {
    return children;
  } else {
    // If no token found, redirect to login
    return <Navigate to="/login" />;
  }
}
