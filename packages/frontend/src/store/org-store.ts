import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrgStore {
  currentOrgId: string | null;
  setCurrentOrgId: (id: string) => void;
}

export const useOrgStore = create<OrgStore>()(
  persist(
    (set) => ({
      currentOrgId: null,
      setCurrentOrgId: (id) => set({ currentOrgId: id }),
    }),
    { name: "org-store" },
  ),
);
