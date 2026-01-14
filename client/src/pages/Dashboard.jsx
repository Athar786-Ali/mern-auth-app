import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { logoutUser } from "../api/logout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/user/data")
      .then((res) => {
        setUser(res.data.userData);
        setLoading(false);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const handleLogout = async () => {
    const res = await logoutUser();
    if (res.success) navigate("/login");
    else alert("Logout failed!");
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">

      {/* ===== MOBILE HEADER ===== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4 bg-gray-800/60 border-b border-white/10 backdrop-blur-xl">
        <button onClick={() => setOpen(true)}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">Dashboard</h2>
      </header>

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed md:static top-0 left-0 w-64 h-full z-40
        bg-gray-800/40 backdrop-blur-xl border-r border-white/10 shadow-xl p-6
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4 text-2xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-extrabold mb-10">
          <span className="text-blue-400">My</span>Panel
        </h1>

        <ul className="space-y-6 text-lg">
          <li><Link className="hover:text-blue-400" to="/dashboard">🏠 Home</Link></li>
          <li><Link className="hover:text-blue-400" to="/profile">👤 Profile</Link></li>
          <li><Link className="hover:text-blue-400" to="/settings">⚙️ Settings</Link></li>
          <li onClick={handleLogout} className="hover:text-red-400 cursor-pointer">🚪 Logout</li>
        </ul>

      </aside>

      {/* ===== OVERLAY FOR MOBILE ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden z-20"
        />
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center p-6
          bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-lg text-center md:text-left">

          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            Welcome, {user?.name} 👋
          </h1>

          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}`}
            alt="avatar"
            className="w-16 h-16 rounded-full border border-gray-600 shadow-md"
          />
        </div>

        {/* Cards Section */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="p-6 bg-gray-800/40 border border-white/10 rounded-2xl shadow-xl transition hover:scale-105 cursor-pointer">
            <h3 className="text-xl font-semibold">Profile Overview</h3>
            <p className="text-gray-300 mt-2">View your personal account details.</p>
          </div>

          <div className="p-6 bg-gray-800/40 border border-white/10 rounded-2xl shadow-xl transition hover:scale-105 cursor-pointer">
            <h3 className="text-xl font-semibold">Security Settings</h3>
            <p className="text-gray-300 mt-2">Update password & authentication settings.</p>
          </div>

          <div className="p-6 bg-gray-800/40 border border-white/10 rounded-2xl shadow-xl transition hover:scale-105 cursor-pointer">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="text-gray-300 mt-2">Control alerts & email preferences.</p>
          </div>

        </div>

      </main>

    </div>
  );
}
