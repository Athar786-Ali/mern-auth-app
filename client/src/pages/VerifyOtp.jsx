import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function VerifyOtp() {

  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // 👉 NEW: Send OTP function
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await api.post("/auth/send-verify-otp");
      if (res.data.success) {
        alert("OTP sent successfully!");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send OTP");
    }
    setLoading(false);
  };

  // Existing Verify OTP Function
  const handleVerify = async () => {
    setLoading(true);

    try {
      const res = await api.post("/auth/verify-otp", { otp });

      if (res.data.success) {
        alert("Email verified successfully 👍");
        navigate("/login");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }

    setLoading(false);
  };

  // Existing Resend OTP function
  const resendOtp = async () => {
    setResendLoading(true);

    try {
      await api.post("/auth/send-verify-otp");
      alert("OTP has been resent to your email ✔");
    } catch (err) {
      alert(err.response?.data?.message);
    }

    setResendLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl p-10 rounded-2xl border border-white/20 shadow-2xl">

        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-300 mb-4">
          Click "Send OTP" to receive the verification code.
        </p>

        {/* 👉 NEW SEND OTP BUTTON */}
        <button
          onClick={sendOtp}
          disabled={loading}
          className="w-full mb-5 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold text-lg shadow-lg transition-all"
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <p className="text-center text-gray-300 mb-4">
          Enter the 6-digit verification code sent to your email.
        </p>

        {/* OTP INPUT */}
        <input
          type="text"
          maxLength={6}
          className="w-full px-5 py-3 text-center text-2xl tracking-widest font-bold rounded-xl bg-white/20 text-white focus:ring-2 focus:ring-blue-500 outline-none border border-white/10"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* VERIFY OTP BUTTON */}
        <button
          onClick={handleVerify}
          className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-semibold text-lg shadow-lg transition-all"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND OTP BUTTON (same as before) */}
        <div className="mt-6 text-center">
          <button
            onClick={resendOtp}
            disabled={resendLoading}
            className="text-blue-400 hover:underline"
          >
            {resendLoading ? "Resending..." : "Resend OTP"}
          </button>
        </div>

      </div>

    </div>
  );
}
