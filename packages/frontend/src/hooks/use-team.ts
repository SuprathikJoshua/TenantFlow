import { invitationApi } from "@/lib/api/invitation";
import { organizationApi } from "@/lib/api/organization";
import { useOrgStore } from "@/store/org-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useMembers() {
  const { currentOrgId } = useOrgStore();
  return useQuery({
    queryKey: ["members", currentOrgId],
    queryFn: async () => {
      const res = await organizationApi.getMembers(currentOrgId!);
      return res.data.data.members;
    },
    enabled: !!currentOrgId,
  });
}

export function useInvitations() {
  const { currentOrgId } = useOrgStore();
  return useQuery({
    queryKey: ["invitations", currentOrgId],
    queryFn: async () => {
      const res = await invitationApi.getAll(currentOrgId!);
      return res.data.data; // ← remove .invitations
    },
    enabled: !!currentOrgId,
  });
}

export function useSendInvitation() {
  const { currentOrgId } = useOrgStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { email: string; role: string }) =>
      invitationApi.send(currentOrgId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations", currentOrgId],
      });
    },
  });
}

export function useCancelInvitation() {
  const { currentOrgId } = useOrgStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (invitationId: string) => invitationApi.cancel(invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["invitations", currentOrgId],
      });
    },
  });
}
