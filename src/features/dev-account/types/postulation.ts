import { Job } from '@/features/jobs-feed/types/job';

export interface Postulation {
    id: number;
    postulationDate: string;
    state: string;
    developerId: number;
    jobOfferId: number;
    jobOffer: Job;
}

export interface PaginatedPostulation {
    data: Postulation[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
    };
}
