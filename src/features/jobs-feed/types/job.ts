import { SkillResponse } from '@/features/dev-account/types/skill';

export interface Job {
    id: number;
    title: string;
    description: string;
    maxSalary: number;
    minSalary: number;
    vacancies: number;
    state: string;
    companyId: number;
    createdAt: string;
    JobOfferSkill: SkillResponse[];
}
