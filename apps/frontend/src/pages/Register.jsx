import { useState } from "react";
import { useRegister } from "../hooks/useAuth";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router";
export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

   const notify = () => toast.success('Registration successful!', {
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
    const notifyError = (message) => toast.error(message, 
          {position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",}
    )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const registerMutation = useRegister({
    onSuccess: (data) => {
      notify()
      console.log("registeration success:", data);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black">
    <div className="bg-white/10 backdrop-blur-lg shadow-lg rounded-xl p-8 w-full max-w-md border border-white/20">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Create your <span className="text-indigo-400">Promptify</span> account
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Username */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-gray-400 border focus:outline-none focus:ring-2 ${
              errors.username
                ? "border-red-500 focus:ring-red-400"
                : "border-white/20 focus:ring-indigo-400"
            }`}
            placeholder="Your username"
          />
          {errors.username && (
            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
          )}
        </div>

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
          {errors.email && (
            <p className="text-red-400 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 rounded-lg bg-black/30 text-white placeholder-gray-400 border focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-400"
                : "border-white/20 focus:ring-indigo-400"
            }`}
            placeholder="Create a password"
          />
          {errors.password && (
            <p className="text-red-400 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600 transition disabled:opacity-50"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>

      <p className="text-center text-gray-400 text-sm mt-6">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-400 hover:underline">
          Login
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
