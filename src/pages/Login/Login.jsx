import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  email: z.string().email({ message: "Email tidak valid" }),
  password: z.string().min(6, { message: "Password minimal 6 karakter" }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toastShown = useRef(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const { token, data: userData } = response.data;

      if (!token || !userData?.user) {
        throw new Error("Token atau user tidak ditemukan dalam respons.");
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", userData.user.role || "unknown");
      window.dispatchEvent(new Event("auth:login"));

      if (!toastShown.current) {
        toast.success("Login berhasil!");
        toastShown.current = true;
      }

      const from = location.state?.from?.pathname || "/articles";
      navigate(from, { replace: true });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Terjadi kesalahan. Coba lagi nanti.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Belum punya akun?
          <Link to="/register" className="text-blue-500 hover:underline">
            {" "}
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
