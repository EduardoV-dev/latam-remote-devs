import { FormControl } from '@/components/form-control';
import styles from './index.module.scss';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import React from 'react';
import { Skill } from '.';

interface Props {
    skillsOptions: Skill[];
    onAdd: (skill: number) => void;
}

export const SkillSelector = ({
    onAdd,
    skillsOptions: skills,
}: Props): JSX.Element => {
    const [skill, setSkill] = React.useState<string>('');
    const [error, setError] = React.useState<string | undefined>();

    const onSkillChange = (event: React.ChangeEvent<HTMLSelectElement>): void =>
        setSkill(event.target.value);

    const onSkillAdded = (): void => {
        if (!skill) return setError('Ninguna tecnología ha sido seleccionada');

        onAdd(Number(skill));
        setError('');
        setSkill('');
    };

    return (
        <section className={styles['skill-selector']}>
            <FormControl label="Tecnología" errorMessage={error} required>
                <select onChange={onSkillChange} value={skill}>
                    <option value="" hidden>
                        Seleccione la tecnología
                    </option>

                    {skills.map((skill) => (
                        <option key={skill.value} value={skill.value}>
                            {skill.name}
                        </option>
                    ))}
                </select>
            </FormControl>

            <div className={styles['skill-selector__actions-group']}>
                <Button onClick={onSkillAdded} type="primary">
                    Agregar
                </Button>

                <p>
                    ¿No encuentras la tecnología que buscas?{' '}
                    <Link to="">Creala</Link>
                </p>
            </div>
        </section>
    );
};

SkillSelector.displayName = 'SkillSelector';
