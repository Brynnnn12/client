import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axiosInstance from "../utils/axios";
import AppRoutes from "./routes/route"; // Import AppRoutes

function App() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/auth/me");
      if (response.data && response.data.data && response.data.data.user) {
        setUserInfo(response.data.data.user);
      }
    } catch (error) {
      if (error.response.status === 401) {
        localStorage.clear();
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <Router>
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar userInfo={userInfo} />
      <AppRoutes /> {/* Gunakan AppRoutes di sini */}
      <Footer />
    </Router>
  );
}

export default App;
