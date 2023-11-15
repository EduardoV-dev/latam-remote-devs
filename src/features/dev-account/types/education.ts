export interface EducationDTO {
    title: string;
    institute: string;
    startDate: string;
    endDate: string | null;
    description: string;
    keepStudyingHere: boolean;
}

export interface EducationDAO extends Omit<EducationDTO, 'keepStudyingHere'> {}
