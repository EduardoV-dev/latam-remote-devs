import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import styles from './index.module.scss';
import { SkillSelector } from './skill-selector';
import React from 'react';
import clsx from 'clsx';
import RemoveIcon from '../../../assets/svg/remove.svg?react';
import { FormType } from '..';

export interface Skill {
    name: string;
    value: number;
}

const SKILLS: Skill[] = [
    { name: 'React', value: 0 },
    { name: 'Next.js', value: 1 },
    { name: 'Remix.js', value: 2 },
    { name: 'Jaja.js', value: 3 },
    { name: 'Haha.js', value: 4 },
];

interface Props {
    form: FormType;
    onChange: (skills: number[]) => void;
}

export const SkillsForm = ({ onChange, form }: Props): JSX.Element => {
    const [selectedSkills, setSelectedSkills] = React.useState<number[]>(
        form.getValues('skills') || [],
    );

    const addToSkillSet = (skill: number): void => {
        const newSkills = [...selectedSkills, skill];
        setSelectedSkills(newSkills);
        onChange(newSkills);
    };

    const removeSkillFromSkillSet = (skill: number): void => {
        const newSkills = selectedSkills.filter(
            (skillValue) => skillValue !== skill,
        );
        setSelectedSkills(newSkills);
        onChange(newSkills);
    };

    // === Render

    const skillsWithoutSelectedOnes = SKILLS.filter(
        (skill) => !selectedSkills.includes(skill.value),
    );

    form.register('skills', {
        validate: (skills) =>
            (skills && skills.length >= 3) || 'Debe elegir al menos 3 skills',
    });

    return (
        <TwoColumnedSection title="Tecnologías">
            <div className={styles.container}>
                <SkillSelector
                    skillsOptions={skillsWithoutSelectedOnes}
                    onAdd={addToSkillSet}
                />

                <section>
                    <FormControl
                        label="Listado"
                        errorMessage={form.formState.errors.skills?.message}
                    >
                        {selectedSkills.length > 0 && (
                            <div className={clsx('group', styles['skills'])}>
                                {selectedSkills.map((skillValue) => {
                                    const skill = SKILLS.find(
                                        (item) => item.value === skillValue,
                                    );

                                    if (!skill) return <></>;

                                    return (
                                        <span
                                            key={skill.name + skill.value}
                                            className={clsx(
                                                'skill-badge',
                                                styles.skill,
                                            )}
                                        >
                                            {skill.name}

                                            <button
                                                className={styles.skill__action}
                                                onClick={() =>
                                                    removeSkillFromSkillSet(
                                                        skillValue,
                                                    )
                                                }
                                                type="button"
                                            >
                                                <RemoveIcon />
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </FormControl>
                </section>
            </div>
        </TwoColumnedSection>
    );
};

SkillsForm.displayName = 'SkillsForm';
