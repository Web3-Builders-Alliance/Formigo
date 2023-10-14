import { create } from 'zustand';

type Date = '24h' | '7d' | '14d' | '30d';

type DashboardDateStore = {
  date: Date | string;
  setDate: (date: string) => void;
};

const useDashboardDateStore = create<DashboardDateStore>()((set) => ({
  date: '24h',
  setDate: (date) => set((state) => ({ date })),
}));

export default useDashboardDateStore;
