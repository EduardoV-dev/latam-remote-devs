import { Button } from 'antd';
import { BasicInformationForm } from './basic-information-form';
import { EducationForm } from './education-form';
import { ExperienceForm } from './experience-form';
import { ProfileBasedForm } from './profile-based-form';
import { SkillsForm } from './skills-form';
import styles from './index.module.scss';
import { SubmitHandler, UseFormReturn, useForm } from 'react-hook-form';
import { ExperienceDAO } from '../../types/experience';
import { EducationDAO } from '../../types/education';

export interface UserAccount {
    basic: {
        name: string;
        lastname: string;
        country: string;
        city: string;
        telephone: string;
        profilePicture: File;
    };
    profile: {
        profesionalTitle: string;
        website: string;
        about: string;
        cv: File;
        github: string;
        linkedin: string;
    };
    skills: number[];
    experience: ExperienceDAO[];
    education: EducationDAO[];
}

export type FormType = UseFormReturn<UserAccount, any, undefined>;

export const AccountForm = (): JSX.Element => {
    const form = useForm<UserAccount>();

    const onSubmit: SubmitHandler<UserAccount> = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <BasicInformationForm {...{ form }} />
            <ProfileBasedForm {...{ form }} />
            <SkillsForm
                {...{ form }}
                onChange={(skills) => form.setValue('skills', skills)}
            />
            <ExperienceForm
                {...{ form }}
                onChange={(experiences) =>
                    form.setValue('experience', experiences)
                }
            />
            <EducationForm
                {...{ form }}
                onChange={(education) => form.setValue('education', education)}
            />

            <Button type="primary" className={styles.button} htmlType="submit">
                Finalizar Perfil
            </Button>
        </form>
    );
};
AccountForm.displayName = 'NewAccount';
