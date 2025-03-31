import React, { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/Home/Home";
import Articles from "../pages/Articles/Articles";
import ArticlePage from "../pages/Articles/ArticlePage";
import Categories from "../pages/Categories/Categories";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

const AppRoutes = () => {
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

export default AppRoutes;
