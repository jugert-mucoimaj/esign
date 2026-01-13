import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = () => {
    // Retrieve token from Cookies or LocalStorage
    const token = Cookies.get("token") || localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);

        // Check if the token is expired
        if (decodedToken.exp < currentTime) {
            alert("Session expired. Please log in again.");
            Cookies.remove("token");
            localStorage.removeItem("token");
            return <Navigate to="/login" replace />;
        }

        // ✅ Everything is valid -> Allow access
        return <Outlet />;
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" replace />;
    }
};

export default ProtectedRoute;
