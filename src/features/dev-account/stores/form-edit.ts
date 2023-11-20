import { create } from 'zustand';

interface Store {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
}

export const useFormEditStore = create<Store>((set) => ({
    isEditing: false,
    setIsEditing: (isEditing) => set({ isEditing }),
}));
