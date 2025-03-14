import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Pastikan ini ada

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Halaman utama
import Home from "./pages/Home/Home";
import Articles from "./pages/Articles/Articles";
import About from "./pages/About/About";

// Halaman autentikasi
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Categories from "./pages/Categories/Categories";
import ProtectedRoute from "./components/ProtectedRoute";
import ArticlePage from "./pages/Articles/ArticlePage";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/articles"
          element={<ProtectedRoute element={<Articles />} />}
        />
        <Route path="/articles/:slug" element={<ArticlePage />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={<ProtectedRoute element={<Categories />} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
