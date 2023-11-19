import { create } from 'zustand';
import { DeveloperData } from '..';

interface Store {
    developer: Omit<DeveloperData, 'type'> | null;
    setDeveloper: (developer: Omit<DeveloperData, 'type'> | null) => void;
}

export const useAccountToEdit = create<Store>((set) => ({
    developer: null,
    setDeveloper: (developer) => set({ developer }),
}));
