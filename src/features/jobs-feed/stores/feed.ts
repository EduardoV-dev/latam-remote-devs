import { create } from 'zustand';
import { Job } from '../types/job';
import { Auth } from '@/lib/auth';

interface Store {
    job: Job | null;
    search: string;
    results: number | null;
    filterBySkills: boolean;

    setJob: (jobId: Job | null) => void;
    setResults: (results: number | null) => void;
    setFilterBySkills: (value: boolean) => void;
    setSearch: (search: string) => void;
}

export const useFeedStore = create<Store>((set) => ({
    job: null,
    search: '',
    results: null,
    filterBySkills: Auth.getAuth() ? true : false,

    setResults: (results) => set({ results }),
    setSearch: (search) => set({ search }),
    setJob: (job) => set({ job }),
    setFilterBySkills: (filterBySkills) => set({ filterBySkills }),
}));
