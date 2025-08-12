import { useState } from "react";
import { useLogin } from "../hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
export default function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const notify = () => toast.success('Login successful!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        onClose: () => navigate("/dashboard")
    });
    const notifyError = (message) => toast.error(message, {  position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark", })

    const loginMutation = useLogin({
        onSuccess: (data) => {
            notify()
            console.log("Login success:", data);
            setErrors({});

        },
        onError: (error) => {
            const apiError = error.response?.data;

            console.log(apiError)
            if (apiError?.error) {
                notifyError(apiError.error)

            } else {
                // If backend sends a general error
                notifyError("Login failed");
            }
        },

    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});
        loginMutation.mutate(formData);
    };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
    <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md border border-white/20">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Login to <span className="text-indigo-400">Promptify</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-gray-400 border focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-400"
                : "border-white/20 focus:ring-indigo-400"
            }`}
            placeholder="you@example.com"
          />
          <p className="h-4 text-red-400 text-sm mt-1">{errors.email || ""}</p>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-gray-400 border pr-10 focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-white/20 focus:ring-indigo-400"
              }`}
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <p className="h-4 text-red-400 text-sm mt-1">{errors.password || ""}</p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50"
        >
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-6">
        Don’t have an account?{" "}
        <a href="/register" className="text-indigo-400 hover:underline">
          Register
        </a>
      </p>
    </div>

    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
    />
  </div>
);

}
