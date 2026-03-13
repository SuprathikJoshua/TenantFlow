import apiClient from "@/lib/api-client";

export const organizationApi = {
  create: (data: { name: string }) =>
    apiClient.post("/organizations/create-organization", data),

  getById: (id: string) =>
    apiClient.get(`/organizations/get-organization/${id}`),

  getAll: () => apiClient.get("/organizations/get-all-organizations"),

  removeMember: (orgId: string, memberId: string) =>
    apiClient.delete(`/organizations/${orgId}/members/${memberId}`),

  updateMemberRole: (orgId: string, memberId: string, role: string) =>
    apiClient.patch(`/organizations/${orgId}/members/${memberId}`, { role }),

  getMembers: (orgId: string) =>
    apiClient.get(`/organizations/${orgId}/members`),
};
