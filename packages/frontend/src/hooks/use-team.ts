import { invitationApi } from "@/lib/api/invitation";
import { organizationApi } from "@/lib/api/organization";
import { useOrgStore } from "@/store/org-store";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
/**
 * Fetch all members of the current organization
 * @returns
 */
export function useMembers() {
  const { currentOrgId } = useOrgStore();
  return useQuery({
    queryKey: ["members", currentOrgId],
    queryFn: async () => {
      const res = await organizationApi.getMembers(currentOrgId!);
      return res.data.data;
    },
    enabled: !!currentOrgId,
  });
}
/**
 * Fetch all pending invitations of the current organization
 * @returns
 */
export function useInvitations() {
  const { currentOrgId } = useOrgStore();
  return useQuery({
    queryKey: ["invitations", currentOrgId],
    queryFn: async () => {
      const res = await invitationApi.getAll(currentOrgId!);
      return res.data.data; // ← remove .invitations
    },
    enabled: !!currentOrgId,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}
/**
 * Send invitation to a user to join the organization
 * @returns
 */
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
/**
 * Cancel a pending invitation
 * @returns
 */
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
/**
 * Remove a member from the current organization
 * @returns
 */
export function useRemoveMember() {
  const { currentOrgId } = useOrgStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (memberId: string) =>
      organizationApi.removeMember(currentOrgId!, memberId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", currentOrgId] });
    },
  });
}
/**
 * Update a member's role in the current organization
 * @returns
 */
export function useUpdateMemberRole() {
  const { currentOrgId } = useOrgStore();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ memberId, role }: { memberId: string; role: string }) =>
      organizationApi.updateMemberRole(currentOrgId!, memberId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["members", currentOrgId] });
    },
  });
}
