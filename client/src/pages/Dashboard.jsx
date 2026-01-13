import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { logoutUser } from "../api/logout";

export default function Dashboard() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    api
      .get("/user/data")
      .then((res) => {
       setUser(res.data.userData);
        setLoading(false);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  // Correct logout function
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

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between w-full p-4 backdrop-blur-lg bg-gray-800/40 border-b border-white/10 shadow-lg">
        <button onClick={() => setOpen(true)}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h2 className="text-xl font-bold tracking-wide">Dashboard</h2>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64
        bg-gray-800/40 backdrop-blur-xl border-r border-white/10 shadow-xl
        p-6 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >

        <button
          onClick={() => setOpen(false)}
          className="md:hidden absolute top-4 right-4 text-white text-2xl"
        >
          ✕
        </button>

        <h1 className="text-3xl font-extrabold mb-10 tracking-wide">
          <span className="text-blue-400">My</span>Panel
        </h1>

        <ul className="space-y-5 text-lg font-medium">
          <li className="hover:text-blue-400 transition"><Link to="/dashboard">🏠 Home</Link></li>
          <li className="hover:text-blue-400 transition"><Link to="/profile">👤 Profile</Link></li>
          <li className="hover:text-blue-400 transition"><Link to="/settings">⚙️ Settings</Link></li>

          <li
            onClick={handleLogout}
            className="hover:text-red-400 transition cursor-pointer"
          >
            🚪 Logout
          </li>
        </ul>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 md:hidden"
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-8">

        <div className="flex justify-between items-center p-6 rounded-2xl 
          bg-gray-800/40 backdrop-blur-xl border border-white/10 shadow-lg">
          <h1 className="text-4xl font-bold tracking-wide">
            Welcome, {user?.name} 👋
          </h1>

          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}`}
            alt="avatar"
            className="w-14 h-14 rounded-full border border-gray-600 shadow-md"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl 
            hover:shadow-blue-500/20 hover:scale-105 transform transition-all cursor-pointer">
            <h3 className="text-xl font-semibold">Profile Overview</h3>
            <p className="mt-2 text-gray-300">View your personal account details.</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl 
            hover:shadow-blue-500/20 hover:scale-105 transform transition-all cursor-pointer">
            <h3 className="text-xl font-semibold">Security Settings</h3>
            <p className="mt-2 text-gray-300">Update password & authentication settings.</p>
          </div>

          <div className="bg-gray-800/40 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-xl 
            hover:shadow-blue-500/20 hover:scale-105 transform transition-all cursor-pointer">
            <h3 className="text-xl font-semibold">Notifications</h3>
            <p className="mt-2 text-gray-300">Control alerts & email preferences.</p>
          </div>

        </div>
      </main>
    </div>
  );
}
