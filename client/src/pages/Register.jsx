import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Register() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Register user
    const res = await api.post("/auth/register", form);

    // If registration failed (email already exists)
    if (!res.data.success) {
      alert(res.data.message);
      setLoading(false);
      return;
    }

    // Auto-login after successful register
    const loginRes = await api.post("/auth/login", {
      email: form.email,
      password: form.password,
    });

    if (loginRes.data.success) {
      navigate("/dashboard");
    } else {
      alert("Login failed after registration");
    }

  } catch (err) {
    alert(err.response?.data?.message || "Registration failed");
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">

        <h2 className="text-3xl font-bold text-center text-white mb-6 tracking-wide">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <label className="text-white text-sm">Full Name</label>
            <input
              type="text"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white text-sm">Email Address</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-3 rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 transition-all rounded-xl text-white font-semibold text-lg shadow-lg hover:shadow-blue-500/40"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-white mt-6">
          Already have an account?{" "}
          <Link className="text-blue-400 hover:underline" to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
