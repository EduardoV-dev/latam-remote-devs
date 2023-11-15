export interface ExperienceDTO {
    title: string;
    company: string;
    location: string;
    description: string;
    startDate: string;
    endDate: string | null;
    keepWorkingHere: boolean;
}

export interface ExperienceDAO extends Omit<ExperienceDTO, 'keepWorkingHere'> {}
