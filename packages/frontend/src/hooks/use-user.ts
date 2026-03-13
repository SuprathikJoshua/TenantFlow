import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationApi } from "@/lib/api/organization";
import { invitationApi } from "@/lib/api/invitation";
import { useOrgStore } from "@/store/org-store";
import apiClient from "@/lib/api-client";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await apiClient.get("/auth/me");
      return res.data.data.user;
    },
  });
}
