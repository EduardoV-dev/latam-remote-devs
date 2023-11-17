import { LongButton } from '../../../components/long-button';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import React from 'react';
import { ExperienceFormElement } from './form';
import { ExperienceDAO } from '../../../types/experience';
import styles from './index.module.scss';
import { InformationCard } from '../../../components/information-card';
import { formatDate } from '../../../utils/date-format';
import { FormType } from '..';

interface Props {
    form: FormType;
    onChange: (experience: ExperienceDAO[]) => void;
}

export const ExperienceForm = ({ form, onChange }: Props): JSX.Element => {
    const [isDisplayingForm, setIsDisplayingForm] =
        React.useState<boolean>(false);

    const [experiences, setExperiences] = React.useState<ExperienceDAO[]>([]);

    const addExperience = (experience: ExperienceDAO): void => {
        const newExperiences = [...experiences, experience];
        setExperiences(newExperiences);
        onChange(newExperiences);
    };

    const removeExperience = (title: string) => {
        const newExperiences = experiences.filter(
            (item) => item.title === title,
        );
        setExperiences(newExperiences);
        onChange(newExperiences);
    };

    form.register('experience');

    return (
        <TwoColumnedSection title="Experiencia">
            {!isDisplayingForm ? (
                <LongButton
                    text="Agregar experiencia"
                    onClick={() => setIsDisplayingForm(true)}
                />
            ) : (
                <ExperienceFormElement
                    closeForm={() => setIsDisplayingForm(false)}
                    onAdd={addExperience}
                />
            )}

            {experiences.length > 0 && (
                <div className={styles.list}>
                    {experiences.map((experience) => (
                        <InformationCard
                            key={experience.title + experience.company}
                            dates={{
                                end: experience.endDate
                                    ? formatDate(experience.endDate)
                                    : 'Sigo trabajando aquí',
                                start: formatDate(experience.startDate),
                            }}
                            description={experience.description}
                            place={`${experience.company} | ${experience.location}`}
                            title={experience.title}
                            onRemove={() => removeExperience(experience.title)}
                        />
                    ))}
                </div>
            )}
        </TwoColumnedSection>
    );
};

ExperienceForm.displayName = 'ExperienceForm';
