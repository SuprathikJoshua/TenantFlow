import apiClient from "@/lib/api-client";

export const organizationApi = {
  create: (data: { name: string }) =>
    apiClient.post("/organizations/create-organization", data),

  getById: (id: string) =>
    apiClient.get(`/organizations/get-organization/${id}`),

  getAll: () => apiClient.get("/organizations/get-all-organizations"),

  getMembers: (orgId: string) =>
    apiClient.get(`/organizations/${orgId}/members`),
};
