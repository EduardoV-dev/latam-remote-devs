export interface DeveloperLogin {
    about: string;
    address: string;
    city: string;
    country: string;
    cvUrl: string;
    email: string;
    firstName: string;
    github: string;
    id: number;
    lastName: string;
    linkedin: string;
    telephone: string;
    title: string;
    website: string;
}

export interface DeveloperAccountDTO {
    firstName: string;
    lastName: string;
    title: string;
    about: string;
    country: string;
    city: string;
    address: string;
    github: string;
    linkedin: string;
    website: string;
    email: string;
    telephone: string;
    DeveloperSkill: { skillId: number }[];
    Education: {
        title: string;
        institution: string;
        description: string;
        startDate: string;
        endDate: string | null;
    }[];
    JobExperience: {
        position: string;
        companyName: string;
        description: string;
        startDate: string;
        endDate: string | null;
        location: string;
    }[];
}

export interface DeveloperAccountDAO
    extends Omit<DeveloperAccountDTO, 'DeveloperSkill'> {
    id: number;
    cvUrl: string;
    DeveloperSkill: {
        id: number;
        skill: {
            id: number;
            name: string;
        };
    }[];
}

export interface DeveloperMedia {
    picture: File | undefined;
    cv: File | undefined;
}

export interface DeveloperData {
    account: DeveloperAccountDTO;
    upload: DeveloperMedia;
    type: 'post' | 'patch';
}
