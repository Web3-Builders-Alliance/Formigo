import { create } from 'zustand';

type PublishingState = {
  isLoading: boolean;
  setLoading: (l: boolean) => void;
};

const usePublishingStore = create<PublishingState>()((set) => ({
  isLoading: false,
  setLoading: (loading) => set(() => ({ isLoading: loading })),
}));

export default usePublishingStore;
