export interface Skill {
    id: number;
    name: string;
}

export interface SkillDTO {
    skillId?: number;
    skillName?: string;
}

export interface SkillResponse {
    id: number;
    skill: Skill;
}
