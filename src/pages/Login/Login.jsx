import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Ambil lokasi sebelum login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      console.log("Full Response:", response); // ✅ Log seluruh respons API

      if (response.data) {
        console.log("Response Data:", response.data); // ✅ Log data dari respons API
      }

      if (response.data && response.data.token) {
        console.log("User Object:", response.data.data.user); // ✅ Cek apakah user ada
        console.log("User Role:", response.data.data.user?.role); // ✅ Log role user

        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
          "role",
          response.data.data.user?.role || "unknown"
        ); // Simpan role

        window.dispatchEvent(new Event("auth:login"));
        toast.success("Login berhasil!");

        const from = location.state?.from?.pathname || "/articles";
        navigate(from, { replace: true });
      } else {
        setError("Token tidak ditemukan pada respon");
        toast.error("Login gagal");
      }
    } catch (error) {
      console.log("Error Response:", error.response); // ✅ Cek respons error
      console.log("Error Message:", error.message); // ✅ Cek pesan error

      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan. Coba lagi nanti.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
