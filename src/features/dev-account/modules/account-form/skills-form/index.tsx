import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import styles from './index.module.scss';
import { SkillSelector } from './skill-selector';
import React from 'react';
import clsx from 'clsx';
import RemoveIcon from '../../../assets/svg/remove.svg?react';

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

export const SkillsForm = (): JSX.Element => {
    const [selectedSkills, setSelectedSkills] = React.useState<number[]>([]);

    const addToSkillSet = (skill: number): void =>
        setSelectedSkills((prev) => [...prev, skill]);

    const removeSkillFromSkillSet = (skill: number): void =>
        setSelectedSkills((prev) =>
            prev.filter((skillValue) => skillValue !== skill),
        );

    // === Render

    const skillsWithoutSelectedOnes = SKILLS.filter(
        (skill) => !selectedSkills.includes(skill.value),
    );

    return (
        <TwoColumnedSection title="Tecnologías">
            <div className={styles.container}>
                <SkillSelector
                    skillsOptions={skillsWithoutSelectedOnes}
                    onAdd={addToSkillSet}
                />

                <section>
                    <FormControl label="Listado">
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
