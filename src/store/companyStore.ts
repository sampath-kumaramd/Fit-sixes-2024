import create from 'zustand';
import { CompanyViewStatus } from '@/types/enums/company-view-status';

interface CompanyState {
  id: number | null;
  companyName: string | null;
  status: string | null;
  viewStatus: CompanyViewStatus | null;
  setCompanyData: (
    data: Partial<
      Pick<CompanyState, 'id' | 'companyName' | 'status' | 'viewStatus'>
    >
  ) => void;
}

export const useCompanyStore = create<CompanyState>((set) => ({
  id: null,
  companyName: null,
  status: null,
  viewStatus: null,
  setCompanyData: (data) => set((state) => ({ ...state, ...data })),
}));
