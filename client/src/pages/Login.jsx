import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔥 Auto redirect if already authenticated
  useEffect(() => {
    api.post("/auth/is-auth")
      .then((res) => {
        if (res.data.success) {
          navigate("/dashboard"); // user already logged in
        }
      })
      .catch(() => {});
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);

      if (!res.data.success) {
        alert(res.data.message || "Invalid email or password");
        setLoading(false);
        return;
      }

      navigate("/dashboard");

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-10 border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Login to continue your journey 🚀
        </p>

        <form onSubmit={handleLogin} className="space-y-6">

          <div>
            <label className="text-gray-300 text-sm">Email Address</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/10 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-gray-300 text-sm">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white border border-white/10 outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg shadow-lg transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 text-gray-300 text-sm">
          <Link to="/reset" className="hover:text-blue-400 hover:underline">
            Forgot Password?
          </Link>

          <Link to="/register" className="hover:text-blue-400 hover:underline">
            Create Account
          </Link>
        </div>

      </div>

    </div>
  );
}
