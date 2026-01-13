import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-6">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20 shadow-xl">

        <h2 className="text-3xl font-bold mb-6 text-center">Settings</h2>

        {/* Account Settings Section */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Account Settings</h3>
          <p className="text-gray-300 mb-3">Manage your account information and preferences.</p>

          <div className="space-y-3">
            <Link
              to="/profile"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition border border-white/10"
            >
              ✏️ Edit Profile
            </Link>

            <Link
              to="/reset"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition border border-white/10"
            >
              🔑 Change Password
            </Link>

            <Link
              to="/verify-otp"
              className="block bg-white/10 hover:bg-white/20 rounded-lg p-4 transition border border-white/10"
            >
              📩 Verify Email
            </Link>
          </div>
        </div>

        {/* Security Section */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Security</h3>
          <p className="text-gray-300 mb-3">Control security and login protection settings.</p>

          <div className="space-y-3">
            <button
              className="w-full bg-red-500/80 hover:bg-red-600 text-white font-semibold p-3 rounded-lg transition shadow-lg"
            >
              🚪 Logout
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
