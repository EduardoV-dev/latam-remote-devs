import React from 'react';
import { useGetJobs } from '@/features/jobs-feed/api/get-jobs';
import { useFeedStore } from '@/features/jobs-feed/stores/feed';
import { Auth } from '@/lib/auth';
import { toast } from 'react-toastify';
import { Job } from '@/features/jobs-feed/types/job';

export const useFeedInfiniteScroll = () => {
    const searchInput = useFeedStore((state) => state.search);
    const setResults = useFeedStore((state) => state.setResults);
    const filterBySkills = useFeedStore((state) => state.filterBySkills);
    const [jobs, setJobs] = React.useState<Job[] | null>(null);
    const [page, setPage] = React.useState<number>(1);

    const developer = Auth.getAuth()?.user.developer;
    const skills: number[] | undefined = filterBySkills
        ? developer!.DeveloperSkill.slice(0, 2).map(({ skill }) => skill.id)
        : undefined;
    const search: string | undefined =
        searchInput !== '' ? searchInput : undefined;

    const { data, isLoading } = useGetJobs({
        options: { page, search, skills },
        config: {
            onSuccess: (data) => {
                setResults(data.meta.total);
                setJobs((prev) => {
                    // Restart list
                    if (data.meta.currentPage === 1) return data.data;
                    return prev ? [...prev, ...data.data] : data.data;
                });
            },
            onError: (err) => {
                toast.error((err as any).message);
            },
        },
    });

    const loadMoreJobs = (): void => {
        if (!data) return;
        setPage(() =>
            data.meta.currentPage < data.meta.lastPage
                ? data.meta.currentPage + 1
                : data.meta.currentPage,
        );
    };

    return { jobs, isLoading, loadMoreJobs };
};
