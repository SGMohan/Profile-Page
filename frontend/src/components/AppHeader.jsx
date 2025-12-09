import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/logo.svg";
import arrow_icon from "../assets/arrow_icon.svg";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const AppHeader = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      if (token) {
        axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(({ data }) => {
          if (data.success && data.data.image) setProfileImage(data.data.image);
        })
        .catch(() => {});
      }
    }
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0 left-0">
      <img
        src={logo}
        alt="App Logo"
        className="w-24 sm:w-32 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {user ? (
        <div className="relative">
          <button
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black text-white flex items-center justify-center hover:opacity-80 transition-opacity hover:cursor-pointer overflow-hidden"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              user.name.charAt(0).toUpperCase()
            )}
            <div
              className={`absolute right-0 top-0 z-10 pt-10 ${
                showDropdown ? "block" : "hidden"
              } text-gray-800 rounded-lg shadow-lg w-40`}
            >
              <ul className="text-sm list-none p-2 m-0 bg-gray-100">
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/profile");
                  }}
                >
                  Edit Profile
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={handleLogout}
                >
                  Logout
                </li>
              </ul>
            </div>
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-2 px-4 py-1.5 cursor-pointer sm:px-6 sm:py-2 rounded-full border border-gray-600 hover:bg-gray-100 transition-all text-gray-800 text-sm sm:text-base"
          >
            Sign Up
          </button>
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 px-4 py-1.5 cursor-pointer sm:px-6 sm:py-2 rounded-full border border-gray-600 hover:bg-gray-100 transition-all text-gray-800 text-sm sm:text-base"
          >
            Login
            <img src={arrow_icon} alt="Arrow" className="w-3 sm:w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AppHeader;
