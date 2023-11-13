import { BasicInformationForm } from '../../modules/basic-information-form';
import { EducationForm } from '../../modules/education-form';
import { ExperienceForm } from '../../modules/experience-form';
import { ProfileBasedForm } from '../../modules/profile-based-form';
import { SkillsForm } from '../../modules/skills-form';

export const NewAccount = (): JSX.Element => (
    <form>
        <BasicInformationForm />
        <ProfileBasedForm />
        <SkillsForm />
        <ExperienceForm />
        <EducationForm />
    </form>
);

NewAccount.displayName = 'NewAccount';
