import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loading from "./components/Loading"; // Import Loading
import ProtectedRoute from "./components/ProtectedRoute";

// Import halaman biasa
import Home from "./pages/Home/Home";
import Articles from "./pages/Articles/Articles";
import ArticlePage from "./pages/Articles/ArticlePage";
import Categories from "./pages/Categories/Categories";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import axiosInstance from "../utils/axios";

const AppContent = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/articles"
            element={<ProtectedRoute element={<Articles />} />}
          />
          <Route path="/articles/:slug" element={<ArticlePage />} />
          <Route
            path="/categories"
            element={<ProtectedRoute element={<Categories />} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
};

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      console.log("Response from /auth/me:", response.data); // Debug respons
      if (response.data && response.data.data && response.data.data.user) {
        setUserInfo(response.data.data.user); // Set data user langsung
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear(); // Clear token jika unauthorized
        console.log("Unauthorized, token cleared");
      }
    }
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar userInfo={userInfo} /> {/* Kirim userInfo langsung */}
      <AppContent />
      <Footer />
    </Router>
  );
}
export default App;
