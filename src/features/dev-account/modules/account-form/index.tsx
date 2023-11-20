import { toast } from 'react-toastify';
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
import { Auth } from '@/lib/auth';
import { useAccountHandling } from '../../api/create-account';

export interface UserAccount {
    basic: {
        name: string;
        lastname: string;
        country: string;
        address: string;
        city: string;
        telephone: string;
        profilePicture: File | string;
    };
    profile: {
        profesionalTitle: string;
        website: string;
        about: string;
        cv: File | string;
        github: string;
        linkedin: string;
    };
    skills: number[];
    experience: ExperienceDAO[];
    education: EducationDAO[];
}

export type FormType = UseFormReturn<UserAccount, any, undefined>;

interface Props {
    onSuccess: () => void;
    initialValues?: UserAccount;
}

export const AccountForm = ({
    onSuccess,
    initialValues,
}: Props): JSX.Element => {
    const { isLoading, mutate } = useAccountHandling({
        onSuccess: (data) => {
            Auth.updateAuth(data);
            onSuccess();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const form = useForm<UserAccount>({
        defaultValues: {
            ...initialValues,
            experience: initialValues?.experience,
            education: initialValues?.education,
        },
    });

    const onSubmit: SubmitHandler<UserAccount> = (data) => {
        if (isLoading) return;

        mutate({
            account: {
                about: data.profile.about,
                address: data.basic.address,
                city: data.basic.city,
                country: data.basic.country,
                DeveloperSkill: data.skills.map((skill) => ({
                    skillId: skill,
                })),
                Education:
                    data.education?.map((education) => ({
                        description: education.description,
                        endDate: education.endDate,
                        institution: education.institute,
                        startDate: education.startDate,
                        title: education.title,
                    })) || [],
                email: Auth.getAuth()?.user.email || '',
                firstName: data.basic.name,
                github: data.profile.github,
                JobExperience:
                    data.experience?.map((exp) => ({
                        companyName: exp.company,
                        description: exp.description,
                        endDate: exp.endDate,
                        location: exp.location,
                        position: exp.title,
                        startDate: exp.startDate,
                    })) || [],
                lastName: data.basic.lastname,
                linkedin: data.profile.linkedin,
                telephone: data.basic.telephone,
                title: data.profile.profesionalTitle,
                website: data.profile.website,
            },
            upload: {
                picture:
                    typeof data.basic.profilePicture === 'string'
                        ? undefined
                        : data.basic.profilePicture,
                cv:
                    typeof data.profile.cv === 'string'
                        ? undefined
                        : data.profile.cv,
            },
            type: initialValues ? 'patch' : 'post',
        });
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

            <Button
                type="primary"
                disabled={isLoading}
                className={styles.button}
                htmlType="submit"
            >
                {initialValues ? 'Actualizar perfil' : 'Finalizar perfil'}
            </Button>
        </form>
    );
};
AccountForm.displayName = 'NewAccount';
