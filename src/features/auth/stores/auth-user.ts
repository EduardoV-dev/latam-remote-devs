import { Auth } from '@/lib/auth';
import { create } from 'zustand';

export type Role = 'Developer' | null;

interface Store {
    isLoggedIn: boolean;
    role: Role;
    isFirstLogin: boolean;
    setIsLoggedIn: (value: boolean) => void;
    setIsFirstLogin: (value: boolean) => void;
    setRole: (role: Role) => void;
}

const user = Auth.getAuth();

export const useAuthUserStore = create<Store>((set) => ({
    isLoggedIn: user !== null,
    isFirstLogin: Auth.isFirstLogin(),
    role: (user?.user.role as Role) || null,
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
    setRole: (role: Role) => set({ role }),
    setIsFirstLogin: (isFirstLogin) => set({ isFirstLogin }),
}));
