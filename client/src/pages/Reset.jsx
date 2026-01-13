import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Reset() {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/send-reset-otp", { email });

      if (res.data.success) {
        alert("OTP sent to your email");
        navigate("/new-password", { state: { email } });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-xl border border-white/20">
        
        <h2 className="text-3xl font-bold mb-4 text-center">Reset Password</h2>
        <p className="text-gray-300 text-center mb-6">Enter your email to receive reset OTP</p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendOtp}
          className="w-full bg-blue-600 hover:bg-blue-700 mt-5 py-3 rounded-lg font-semibold transition-all"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>

      </div>
    </div>
  );
}
