import api from "../api/axiosInstance";

export const searchUsers = async (keyword) => {
  if (!keyword || keyword.trim().length < 2) return [];

  const response = await api.get("/users/search", {
    params: { keyword },
  });

  return response.data;
};