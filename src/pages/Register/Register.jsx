import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as z from "zod";

// Schema Validasi dengan Zod
const schema = z.object({
  username: z.string().min(1, "Nama harus diisi"),
  email: z
    .string()
    .min(1, "Email harus diisi")
    .email("Format email tidak valid"),
  password: z.string().min(8, "Password minimal 8 karakter"),
});

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();

  // React Hook Form dengan Zod
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/register", data);
      if (response.data) {
        toast.success("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Register Error:", error);

      if (error.response?.data?.errors) {
        Object.keys(error.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: error.response.data.errors[key][0],
          });
        });
      } else {
        toast.error(
          error.response?.data?.message || "Terjadi kesalahan saat registrasi."
        );
      }
    }
  };

  return (
    <div className="flex items-center mx-6 sm:mx-0 justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Input Nama */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Nama
            </label>
            <input
              type="text"
              {...register("username")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Masukkan nama lengkap"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Input Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="contoh@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Input Password */}
          <div className="relative">
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={isPasswordVisible ? "text" : "password"}
                {...register("password")}
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300 pr-10 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Minimal 8 karakter"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Mendaftar..." : "Daftar"}
          </button>

          {/* Link Login */}
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
