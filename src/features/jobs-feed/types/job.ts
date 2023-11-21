import { SkillResponse } from '@/features/dev-account/types/skill';
import { Company } from './company';

export interface Job {
    company: Company;
    JobOfferSkill: SkillResponse[];
    createdAt: string;
    description: string;
    id: number;
    maxSalary: number;
    minSalary: number;
    state: string;
    title: string;
    vacancies: number;
}

export interface PaginatedJobs {
    data: Job[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
    };
}
