import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/api";

export default function NewPassword() {

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/reset-password", {
        email,
        otp: form.otp,
        newPassword: form.newPassword,
      });

      if (res.data.success) {
        alert("Password updated successfully");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Reset failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20">

        <h2 className="text-3xl font-bold mb-4 text-center">Set New Password</h2>

        <p className="text-gray-300 text-center mb-6">
          Enter the OTP sent to <span className="text-blue-400">{email}</span>
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-3 mb-4 rounded-lg bg-white/20 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, otp: e.target.value })}
        />

        <input
          type="password"
          placeholder="New password"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />

        <button
          onClick={resetPassword}
          className="w-full bg-blue-600 hover:bg-blue-700 mt-5 py-3 rounded-lg font-semibold transition-all"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>

      </div>
    </div>
  );
}
