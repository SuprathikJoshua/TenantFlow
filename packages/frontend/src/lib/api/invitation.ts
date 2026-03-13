import apiClient from "@/lib/api-client";

export const invitationApi = {
  send: (orgId: string, data: { email: string; role: string }) =>
    apiClient.post(`/invitations/${orgId}/send-invitation`, data),

  getAll: (orgId: string) => apiClient.get(`/invitations/${orgId}/invitations`),

  cancel: (invitationId: string) =>
    apiClient.post(`/invitations/decline/${invitationId}`),
};
