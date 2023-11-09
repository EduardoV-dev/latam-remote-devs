import { create } from 'zustand';

interface Store {
    jobId: null | string;
    search: string;

    setJobId: (jobId: null | string) => void;
    setSearch: (search: string) => void;
}

export const useFeedStore = create<Store>((set) => ({
    jobId: null,
    search: '',

    setSearch: (search) => set({ search }),
    setJobId: (jobId) => set({ jobId }),
}));
