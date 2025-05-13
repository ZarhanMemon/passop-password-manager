import { useState } from "react";
import { useAuthStore } from "../storeApi/useAuth.js";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../sub_components/AuthPattern.jsx";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black text-white">
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Heading */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="logo font-bold text-white text-3xl">
                <span className='text-green-500'> &lt;</span>
                <span>Pass</span><span className='text-green-500'>/OP&gt;</span>
              </div>
              <h1 className="text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-white/70">Get started with your free account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-white">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-white/50" />
                </div>
                <input
                  type="text"
                  className="w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-white">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-white/50" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-white">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-5 text-white/50" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 py-2 rounded-xl bg-gray-800 text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="********"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-white/50" />
                  ) : (
                    <Eye className="size-5 text-white/50" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn w-full py-3 rounded-lg bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="size-5 animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          {/* Redirect */}
          <div className="text-center">
            <p className="text-white/70">
              Already have an account?{" "}
              <Link to="/login" className="text-green-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side Pattern */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
