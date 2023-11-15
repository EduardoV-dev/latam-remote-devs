import { LongButton } from '../../../components/long-button';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import React from 'react';
import { EducationFormElement } from './form';
import styles from './index.module.scss';
import { InformationCard } from '../../../components/information-card';
import { formatDate } from '../../../utils/date-format';
import { EducationDAO } from '../../../types/education';

export const EducationForm = (): JSX.Element => {
    const [isDisplayingForm, setIsDisplayingForm] =
        React.useState<boolean>(false);

    const [education, setEducation] = React.useState<EducationDAO[]>([]);

    const addExperience = (educationItem: EducationDAO): void =>
        setEducation((prev) => [...prev, educationItem]);

    const removeEducation = (title: string) =>
        setEducation((prev) => prev.filter((item) => item.title === title));

    return (
        <TwoColumnedSection title="Educación">
            {!isDisplayingForm ? (
                <LongButton
                    text="Agregar educación"
                    onClick={() => setIsDisplayingForm(true)}
                />
            ) : (
                <EducationFormElement
                    closeForm={() => setIsDisplayingForm(false)}
                    onAdd={addExperience}
                />
            )}

            {education.length > 0 && (
                <div className={styles.list}>
                    {education.map((education) => (
                        <InformationCard
                            key={education.title + education.institute}
                            dates={{
                                end: education.endDate
                                    ? formatDate(education.endDate)
                                    : 'Sigo estudiando aquí',
                                start: formatDate(education.startDate),
                            }}
                            description={education.description}
                            place={education.institute}
                            title={education.title}
                            onRemove={() => removeEducation(education.title)}
                        />
                    ))}
                </div>
            )}
        </TwoColumnedSection>
    );
};

EducationForm.displayName = 'EducationForm';
