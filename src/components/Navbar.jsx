import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getInitials } from "../../utils/helper";
import { Newspaper } from "lucide-react";

const Navbar = ({ userInfo }) => {
  // console.log("Props received in Navbar:", { userInfo });
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Fungsi untuk memeriksa status autentikasi
  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    // Periksa autentikasi saat komponen dimuat
    checkAuthStatus();

    // Tambahkan event listener untuk login
    window.addEventListener("auth:login", checkAuthStatus);

    // Tambahkan event listener untuk logout
    window.addEventListener("auth:logout", checkAuthStatus);

    // Cleanup saat komponen unmount
    return () => {
      window.removeEventListener("auth:login", checkAuthStatus);
      window.removeEventListener("auth:logout", checkAuthStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");

    // Trigger event custom untuk logout
    window.dispatchEvent(new Event("auth:logout"));

    setIsAuthenticated(false);
    setDropdownOpen(false);
    toast.success("Logout berhasil!");
    navigate("/");

    // Tidak perlu window.location.reload() lagi!
  };

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Categories", path: "/categories" },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-none"
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="size-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Logo & Menu */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Newspaper className="h-8 w-8 text-indigo-500" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Login/Register or Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isAuthenticated ? (
              <div className="relative ml-3">
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-none"
                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                >
                  <span className="sr-only">Open user menu</span>

                  <div className="w-10 h-10 flex items-center justify-center rounded-full text-slate-950 font-bold text-xl bg-slate-100 ">
                    {userInfo?.username ? getInitials(userInfo.username) : "GU"}
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 z-10 mt-2 w-48 mb-6 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none">
                    {/* <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                    >
                      Profile
                    </Link> */}

                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-md px-3 py-2 bg-blue-500 text-sm font-medium text-white hover:bg-blue-700 hover:text-white"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 px-2 pt-2 pb-3">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                {item.name}
              </Link>
            ))}
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
