import apiClient from "@/lib/api-client";

export const authApi = {
  register: (data: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => apiClient.post("/auth/register", data),

  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),

  logout: () => apiClient.post("/auth/logout"),
};
