import { FormControl } from '@/components/form-control';
import styles from './index.module.scss';
import { Button } from 'antd';
import React from 'react';
import { debounce } from 'throttle-debounce';
import { useGetSkillsBySearch } from '@/features/dev-account/api/get-skill-by-search';
import { SkillDTO } from '@/features/dev-account/types/skill';

interface Props {
    onAdd: (skill: SkillDTO) => void;
}

export const SkillSelector = ({ onAdd }: Props): JSX.Element => {
    const [skillInput, setSkillInput] = React.useState<string>('');
    const skillInputRef = React.useRef<HTMLInputElement>(null);
    const { isLoading: isLoadingSkills, data: skills } = useGetSkillsBySearch({
        search: skillInput,
    });
    const [error, setError] = React.useState<string | undefined>();

    const onSkillChange = debounce(
        300,
        (event: React.ChangeEvent<HTMLInputElement>): void =>
            setSkillInput(event.target.value),
    );

    const onSkillAdded = (skill: SkillDTO): void => {
        if (!skillInput)
            return setError('Ninguna tecnología ha sido seleccionada');

        onAdd(skill);
        setError('');
        setSkillInput('');
        if (skillInputRef.current) skillInputRef.current.value = '';
    };

    return (
        <section className={styles['skill-selector']}>
            <FormControl label="Tecnología" errorMessage={error} required>
                <div className={styles['autocomplete-skills']}>
                    <input
                        ref={skillInputRef}
                        type="text"
                        onChange={onSkillChange}
                    />

                    {!isLoadingSkills && skills && (
                        <section
                            className={styles['skills-list']}
                            onClick={(event) => event.stopPropagation()}
                        >
                            {skills.map((skill) => (
                                <p
                                    key={skill.id + skill.name}
                                    onClick={() =>
                                        onSkillAdded({
                                            skillId: skill.id,
                                            skillName: skill.name,
                                        })
                                    }
                                >
                                    {skill.name}
                                </p>
                            ))}
                        </section>
                    )}
                    {isLoadingSkills && (
                        <section className={styles['skills-list']}>
                            <span>Buscando...</span>
                        </section>
                    )}
                </div>
            </FormControl>

            <div className={styles['skill-selector__actions-group']}>
                {(!skills || skills.length > 0) && (
                    <p>
                        En caso de no encontrar la tecnología, se mostrará una
                        opción para crearla
                    </p>
                )}

                {skills && skills.length === 0 && (
                    <>
                        <Button
                            onClick={() =>
                                onSkillAdded({ skillName: skillInput })
                            }
                            type="primary"
                        >
                            Crear tecnología
                        </Button>

                        <p>Asegurate que la tecnología esté bien escrita</p>
                    </>
                )}
            </div>
        </section>
    );
};

SkillSelector.displayName = 'SkillSelector';
