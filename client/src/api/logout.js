import api from "./api";

export async function logoutUser() {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    return { success: false, message: "Logout failed" };
  }
}
