import React from 'react';
import { Auth } from '@/lib/auth';
import { useGetAccount } from '../../api/get-account';
import { AccountForm } from '../../modules/account-form';
import { useFormEditStore } from '../../stores/form-edit';
import { APP_ROUTES } from '@/config/routes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const EditAccount = (): JSX.Element => {
    const navigate = useNavigate();
    const { isLoading, data } = useGetAccount();
    const setIsEditing = useFormEditStore((state) => state.setIsEditing);

    console.log(Auth.getAuth()?.user.developer);

    React.useEffect(() => {
        setIsEditing(true);
    }, [setIsEditing]);

    if (isLoading || !data) return <>Cargando...</>;

    const onSuccess = (): void => {
        setIsEditing(false);
        navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE);
        toast.success('El Perfil Ha Sido Actualizado');
    };

    return (
        <AccountForm
            {...{ onSuccess }}
            initialValues={{
                basic: {
                    address: data.address,
                    city: data.city,
                    country: data.country,
                    lastname: data.lastName,
                    name: data.firstName,
                    profilePicture: Auth.getAuth()?.user.photoUrl || '',
                    telephone: data.telephone,
                },
                education: data.Education.map((ed) => ({
                    description: ed.description,
                    endDate: ed.endDate,
                    institute: ed.institution,
                    startDate: ed.startDate,
                    title: ed.title,
                })),
                experience: data.JobExperience.map((exp) => ({
                    company: exp.companyName,
                    description: exp.description,
                    endDate: exp.endDate,
                    location: exp.location,
                    startDate: exp.startDate,
                    title: exp.position,
                })),
                profile: {
                    about: data.about,
                    cv: data.cvUrl,
                    github: data.github,
                    linkedin: data.linkedin,
                    profesionalTitle: data.title,
                    website: data.website,
                },
                skills: data.DeveloperSkill.map(({ skill }) => ({
                    skillId: skill.id,
                    skillName: skill.name,
                })),
            }}
        />
    );
};
