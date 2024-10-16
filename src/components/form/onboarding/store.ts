import create from 'zustand';

import { OnboardingSchema } from './schema';

interface OnboardingStore {
  step: number;
  setStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  companyName: string;
  setCompanyName: (companyName: string) => void;
  teamFields: OnboardingSchema['teams'];
  setTeamFields: (teamFields: OnboardingSchema['teams']) => void;
  addNewTeam: () => void;
  teamCounts: { male: number; female: number };
  setTeamCounts: (teamCounts: { male: number; female: number }) => void;
  handleRemoveTeam: (index: number) => void;
  termsModalOpen: boolean;
  setTermsModalOpen: (open: boolean) => void;
  includeHut: boolean;
  setIncludeHut: (include: boolean) => void;
  invoiceStatus: string;
  setInvoiceStatus: (invoiceStatus: string) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  activeTab: 'team0',
  setActiveTab: (tab) => set({ activeTab: tab }),
  companyName: '',
  setCompanyName: (companyName) => set({ companyName }),
  teamCounts: { male: 0, female: 0 },
  setTeamCounts: (teamCounts) => set({ teamCounts }),
  teamFields: [
    {
      name: '',
      gender: 'male',
      players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
    },
  ],
  setTeamFields: (teamFields) => set({ teamFields }),
  addNewTeam: () =>
    set((state) => ({
      teamFields: [
        ...state.teamFields,
        {
          name: '',
          gender: 'male',
          players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
        },
      ],
      activeTab: `team${state.teamFields.length}`,
    })),
  handleRemoveTeam: (index) =>
    set((state) => ({
      teamFields: state.teamFields.filter((_, i) => i !== index),
      activeTab: `team${Math.max(0, state.teamFields.length - 2)}`,
    })),
  termsModalOpen: false,
  setTermsModalOpen: (open) => set({ termsModalOpen: open }),
  includeHut: false,
  setIncludeHut: (includeHut) => set({ includeHut }),
  invoiceStatus: 'pending',
  setInvoiceStatus: (invoiceStatus) => set({ invoiceStatus }),
}));
