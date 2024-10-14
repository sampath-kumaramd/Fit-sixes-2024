import create from 'zustand';

import { OnboardingSchema } from './schema';

interface OnboardingStore {
  step: number;
  setStep: (step: number) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  teamFields: OnboardingSchema['teams'];
  addNewTeam: () => void;
  handleRemoveTeam: (index: number) => void;
  termsModalOpen: boolean;
  setTermsModalOpen: (open: boolean) => void;
}

export const useOnboardingStore = create<OnboardingStore>((set) => ({
  step: 1,
  setStep: (step) => set({ step }),
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
  activeTab: 'team0',
  setActiveTab: (tab) => set({ activeTab: tab }),
  teamFields: [
    {
      name: '',
      gender: 'male',
      players: Array(6).fill({ name: '', nic: '', contactNumber: '' }),
    },
  ],
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
}));
