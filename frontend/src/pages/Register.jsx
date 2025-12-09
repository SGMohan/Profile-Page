import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../assets/logo.svg";
import person_icon from "../assets/person_icon.svg";
import mail_icon from "../assets/mail_icon.svg";
import lock_icon from "../assets/lock_icon.svg";
import Loading from "../components/Loading";

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://profile-page-a95r.onrender.com"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/register`, { name, email, password });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-linear-to-br from-blue-200 to-purple-400">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <div className="bg-slate-900 shadow-lg rounded-lg p-10 sm:p-12 w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">Create Account</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Create your account</p>
        
        <form onSubmit={onSubmitHandler}>
          <div className="flex items-center gap-3 w-full rounded-full px-5 py-2.5 mb-4 bg-[#333A52]">
            <img src={person_icon} alt="Person Icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-transparent outline-none text-white flex-1 min-w-0"
              placeholder="Full Name"
              required
            />
          </div>
          
          <div className="flex items-center gap-3 w-full rounded-full px-5 py-2.5 mb-4 bg-[#333A52]">
            <img src={mail_icon} alt="Mail Icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none text-white flex-1 min-w-0"
              placeholder="Email Address"
              required
            />
          </div>
          
          <div className="flex items-center gap-3 w-full rounded-full px-5 py-2.5 mb-4 bg-[#333A52]">
            <img src={lock_icon} alt="Lock Icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white flex-1 min-w-0"
              placeholder="Password (min 6 characters)"
              minLength={6}
              required
            />
          </div>

          <p className="text-indigo-500 mb-4 cursor-pointer text-xs">
            Forgot Password ?
          </p>
          
          <button className="w-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white py-2.5 rounded-full font-medium hover:cursor-pointer">
            Sign Up
          </button>
        </form>
        
        <p className="text-center mt-4 text-gray-500 text-xs">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-indigo-500 cursor-pointer underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
