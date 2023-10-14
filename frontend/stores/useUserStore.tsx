import { create } from 'zustand';
import { magic } from '@/lib/magic';

type UserState = {
  user: string | null;
  login: (user: string | null) => void;
  logout: () => void;
};

const useUserStore = create<UserState>()((set) => ({
  user: '',
  login: (user) => set((state) => ({ user })),
  logout: () =>
    set(() => {
      fetch('/api/logout', { method: 'post', body: '' }).then((data) => {
        console.log(data);
      });
      magic.user.isLoggedIn().then(() => magic.user.logout());
      return { user: '' };
    }),
}));

export default useUserStore;
