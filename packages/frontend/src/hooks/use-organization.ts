import { useQuery } from "@tanstack/react-query";
import { organizationApi } from "@/lib/api/organization";

export function useOrganizations() {
  return useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      const res = await organizationApi.getAll();
      return res.data.data.orgs;
    },
  });
}

export function useOrgMembers(orgId: string) {
  return useQuery({
    queryKey: ["members", orgId],
    queryFn: async () => {
      const res = await organizationApi.getMembers(orgId);
      return res.data.data.members;
    },
    enabled: !!orgId,
  });
}
