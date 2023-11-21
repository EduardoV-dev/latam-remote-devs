import React from 'react';
import { toast } from 'react-toastify';
import { Postulation } from '../../types/postulation';
import { useGetPostulatedJobs } from '../../api/get-postulated-jobs-by-developer-id';

export const usePostulationInfiniteScroll = () => {
    const [postulations, setPostulations] = React.useState<
        Postulation[] | null
    >(null);
    const [page, setPage] = React.useState<number>(1);

    const { data, isLoading } = useGetPostulatedJobs({
        page,
        config: {
            onSuccess: (data) => {
                setPostulations((prev) =>
                    prev ? [...prev, ...data.data] : data.data,
                );
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

    return { postulations, isLoading, loadMoreJobs, results: data?.meta.total };
};
