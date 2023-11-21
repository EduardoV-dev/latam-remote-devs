import React from 'react';
import { Auth } from '@/lib/auth';
import { AccountForm } from '../../modules/account-form';
import { useFormEditStore } from '../../stores/form-edit';
import { APP_ROUTES } from '@/config/routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const EditAccount = (): JSX.Element => {
    const navigate = useNavigate();
    const setIsEditing = useFormEditStore((state) => state.setIsEditing);

    React.useEffect(() => {
        setIsEditing(true);
    }, [setIsEditing]);

    const onSuccess = (): void => {
        setIsEditing(false);
        navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE);
        toast.success('El Perfil Ha Sido Actualizado');
    };

    const user = Auth.getAuth()?.user;
    const developer = user?.developer;

    if (!user || !developer) return <></>;

    return (
        <AccountForm
            {...{ onSuccess }}
            initialValues={{
                basic: {
                    address: developer.address,
                    city: developer.city,
                    country: developer.country,
                    lastname: developer.lastName,
                    name: developer.firstName,
                    profilePicture: user.photoUrl || '',
                    telephone: developer.telephone,
                },
                education: developer.Education.map((ed) => ({
                    description: ed.description,
                    endDate: ed.endDate,
                    institute: ed.institution,
                    startDate: ed.startDate,
                    title: ed.title,
                })),
                experience: developer.JobExperience.map((exp) => ({
                    company: exp.companyName,
                    description: exp.description,
                    endDate: exp.endDate,
                    location: exp.location,
                    startDate: exp.startDate,
                    title: exp.position,
                })),
                profile: {
                    about: developer.about,
                    cv: developer.cvUrl,
                    github: developer.github,
                    linkedin: developer.linkedin,
                    profesionalTitle: developer.title,
                    website: developer.website,
                },
                skills: developer.DeveloperSkill.map(({ skill }) => ({
                    skillId: skill.id,
                    skillName: skill.name,
                })),
            }}
        />
    );
};
