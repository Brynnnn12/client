import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  const hasShownToast = useRef(false); // Gunakan ref untuk mencegah toast muncul dua kali

  useEffect(() => {
    if (!isAuthenticated && !hasShownToast.current) {
      toast.error("Anda harus login terlebih dahulu!", { autoClose: 3000 });
      hasShownToast.current = true; // Tandai bahwa toast sudah ditampilkan
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return element;
};

export default ProtectedRoute;
