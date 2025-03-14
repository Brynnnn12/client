import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Nama harus diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.password) {
      newErrors.password = "Password harus diisi";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password minimal 8 karakter";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/auth/register", formData);
      if (response.data) {
        toast.success("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Register Error:", error);
      if (error.response?.data?.errors) {
        const formattedErrors = Object.keys(error.response.data.errors).reduce(
          (acc, key) => ({ ...acc, [key]: error.response.data.errors[key][0] }),
          {}
        );
        setErrors(formattedErrors);
      } else {
        toast.error(
          error.response?.data?.message || "Terjadi kesalahan saat registrasi."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Nama
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="contoh@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Minimal 8 karakter"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Mendaftar..." : "Daftar"}
          </button>
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              Sudah punya akun?{" "}
              <a
                href="/login"
                className="text-blue-500 hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Login di sini
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
