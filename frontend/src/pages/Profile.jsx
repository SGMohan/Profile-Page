import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import logo from "../assets/logo.svg";
import person_icon from "../assets/person_icon.svg";
import mail_icon from "../assets/mail_icon.svg";
import Loading from "../components/Loading";

const API_URL = import.meta.env.VITE_BACKEND_URL || "https://profile-page-a95r.onrender.com"

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [isFreshUser, setIsFreshUser] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    dob: "",
    contact: "",
    region: "",
    bio: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (data.success) {
          setProfile(data.data);
          setUser(data.data.userId);
          
          const hasAdditionalData = data.data.age || data.data.dob || data.data.contact || data.data.region || data.data.bio;
          setIsFreshUser(!hasAdditionalData);
          
          setFormData({
            name: data.data.userId?.name || "",
            email: data.data.userId?.email || "",
            age: data.data.age || "",
            dob: data.data.dob ? new Date(data.data.dob).toISOString().split('T')[0] : "",
            contact: data.data.contact || "",
            region: data.data.region || "",
            bio: data.data.bio || "",
          });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      }
    };
    
    fetchProfile();
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("age", formData.age);
      data.append("dob", formData.dob);
      data.append("contact", formData.contact);
      data.append("region", formData.region);
      data.append("bio", formData.bio);
      if (imageFile) data.append("image", imageFile);
      
      const response = await axios.put(`${API_URL}/profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });
      
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (!user) return null;

  return (
    <div className="h-screen bg-linear-to-br from-blue-200 to-purple-400 flex items-center justify-center overflow-hidden">
      <img
        onClick={() => navigate("/")}
        src={logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer z-20"
      />

      <div className="px-6 sm:px-0 w-full flex justify-center h-full items-center">
        <div className="bg-slate-900 shadow-lg rounded-lg w-full max-w-2xl text-indigo-300 text-sm h-[70vh] overflow-y-auto scrollbar-hide">
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          `}</style>
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 relative">
            <div
              onClick={() => navigate("/")}
              className="absolute right-6 top-6 flex items-center gap-1 text-gray-400 cursor-pointer hover:text-gray-300"
            >
              <span className="text-sm">Skip</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-semibold text-white text-center mb-3">
              Profile
            </h2>
            <p className="text-gray-400 text-center mb-6 text-sm">
              {isFreshUser ? "Complete your profile" : "Update your details"}
            </p>

            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-[#333A52] flex items-center justify-center overflow-hidden">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : profile?.image ? (
                    <img
                      src={profile.image}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-white text-3xl">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-indigo-600 rounded-full p-2 cursor-pointer hover:bg-indigo-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-3 w-full rounded-full px-5 py-2.5 bg-[#333A52]">
                  <img src={person_icon} alt="Person" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-white flex-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">
                  Email
                </label>
                <div className="flex items-center gap-3 w-full rounded-full px-5 py-2.5 bg-[#333A52]">
                  <img src={mail_icon} alt="Mail" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="bg-transparent outline-none text-white flex-1"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full rounded-full px-5 py-2.5 bg-[#333A52] text-white outline-none"
                  placeholder="Age"
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-600"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-xs mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full rounded-full px-5 py-2.5 bg-[#333A52] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">
                  Contact
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full rounded-full px-5 py-2.5 bg-[#333A52] text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-xs mb-2">
                  Region
                </label>
                <input
                  type="text"
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full rounded-full px-5 py-2.5 bg-[#333A52] text-white outline-none"
                  placeholder="Enter your region"
                />
              </div>
            </div>

            <div className="my-6 border-t border-gray-600"></div>

            <div>
              <label className="block text-gray-400 text-xs mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-lg px-5 py-2.5 bg-[#333A52] text-white outline-none resize-none"
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                className="w-full bg-linear-to-br from-indigo-500 to-indigo-900 text-white py-2.5 rounded-full font-medium hover:cursor-pointer"
              >
                {isFreshUser ? "Save Profile" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
