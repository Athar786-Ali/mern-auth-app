import { Link, useLocation } from "react-router-dom";

export default function Success() {
  const location = useLocation();
  const message = location.state?.message || "Action completed successfully!";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl p-8 text-center">

        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-4">Success</h2>

        <p className="text-gray-300 mb-6">{message}</p>

        <Link
          to="/login"
          className="block bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg text-white font-semibold"
        >
          Go to Login
        </Link>

      </div>
    </div>
  );
}
