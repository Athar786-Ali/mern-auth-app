import { useEffect, useState } from "react";
import api from "../api/api.js";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/user/data")
      .then((res) => {
        setUser(res.data.userData);
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">

      <div className="max-w-3xl mx-auto bg-gray-800/40 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-white/10">

        <h1 className="text-4xl font-bold mb-6">
          Profile <span className="text-blue-400">Details</span>
        </h1>

        <div className="space-y-6 text-lg">
          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>

          <p>
            <strong>Account Verified:</strong>{" "}
            {user.isAccountVerified ? (
              <span className="text-green-400 font-bold">Yes ✔</span>
            ) : (
              <span className="text-red-400 font-bold">No ✘</span>
            )}
          </p>
        </div>

        {!user.isAccountVerified && (
          <Link
            to="/verify-otp"
            className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
          >
            Verify Account
          </Link>
        )}
      </div>

    </div>
  );
}
