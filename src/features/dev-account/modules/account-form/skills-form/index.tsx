import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import styles from './index.module.scss';
import { SkillSelector } from './skill-selector';
import React from 'react';
import clsx from 'clsx';
import RemoveIcon from '../../../assets/svg/remove.svg?react';
import { FormType } from '..';
import { SkillDTO } from '@/features/dev-account/types/skill';

interface Props {
    form: FormType;
    onChange: (skills: SkillDTO[]) => void;
}

export const SkillsForm = ({ onChange, form }: Props): JSX.Element => {
    const [selectedSkills, setSelectedSkills] = React.useState<SkillDTO[]>(
        form.getValues('skills') || [],
    );

    const addToSkillSet = (skill: SkillDTO): void => {
        const isDuplicated = selectedSkills.some((item) =>
            skill.skillId
                ? item.skillId === skill.skillId
                : item.skillName?.toLowerCase() ===
                      skill.skillName?.toLowerCase() || false,
        );

        const newSkills = isDuplicated
            ? selectedSkills
            : [...selectedSkills, skill];

        const skillsWithOnlyTheNecessary = newSkills.map<SkillDTO>((skill) => ({
            ...(skill.skillId && { skillId: skill.skillId }),
            ...(skill.skillName &&
                !skill.skillId && { skillName: skill.skillName }),
        }));

        setSelectedSkills(newSkills);
        onChange(skillsWithOnlyTheNecessary);
    };

    const removeSkillFromSkillSet = (skillToRemove: SkillDTO): void => {
        const newSkills = selectedSkills.filter(
            (skill) =>
                skill.skillId !== skillToRemove.skillId ||
                skill.skillName !== skillToRemove.skillName,
        );
        setSelectedSkills(newSkills);
        onChange(newSkills);
    };

    // === Render

    form.register('skills', {
        validate: (skills) =>
            (skills && skills.length >= 3) || 'Debe elegir al menos 3 skills',
    });

    return (
        <TwoColumnedSection title="Tecnologías">
            <div className={styles.container}>
                <SkillSelector onAdd={addToSkillSet} />

                <section>
                    <FormControl
                        label="Listado"
                        errorMessage={form.formState.errors.skills?.message}
                    >
                        {selectedSkills.length > 0 && (
                            <div className={clsx('group', styles['skills'])}>
                                {selectedSkills.map((skill) => {
                                    let key = '';

                                    if (skill.skillId) key += skill.skillId;
                                    else if (skill.skillName)
                                        key += skill.skillName;

                                    return (
                                        <span
                                            key={key}
                                            className={clsx(
                                                'skill-badge',
                                                styles.skill,
                                            )}
                                        >
                                            {skill.skillName || 'No definido'}
                                            <button
                                                className={styles.skill__action}
                                                onClick={() =>
                                                    removeSkillFromSkillSet(
                                                        skill,
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
