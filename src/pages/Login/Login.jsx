import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axiosInstance from "../../../utils/axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux"; // Import useDispatch
import { login } from "../../store/authSlice"; // Import the login action

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
  const dispatch = useDispatch(); // Initialize useDispatch

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

      // Store token and user role in localStorage
      localStorage.setItem("token", token);

      // Dispatch the login action to update Redux state
      dispatch(login(userData.user)); // Pass user data to the login action

      if (!toastShown.current) {
        toast.success("Login berhasil!");
        toastShown.current = true;
      }

      const from = location.state?.from?.pathname || "/";
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
    <div className="flex items-center mx-6 sm:mx-0 justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4 relative">
            <label className="block text-gray-600">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 text-white rounded-md text-lg font-semibold tracking-wide shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?
          <Link to="/register" className="text-blue-500 hover:underline ml-1">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
