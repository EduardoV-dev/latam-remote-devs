import { FormControl } from '@/components/form-control';
import styles from './index.module.scss';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import CloseIcon from '@/assets/svg/close.svg?react';
import { EducationDAO, EducationDTO } from '../../../types/education';

interface Props {
    closeForm: () => void;
    onAdd: (data: EducationDAO) => void;
}

export const EducationFormElement = ({
    closeForm,
    onAdd,
}: Props): JSX.Element => {
    const form = useForm<EducationDTO>();

    const submitForm = async (): Promise<void> => {
        const isFormValid = await form.trigger();
        if (!isFormValid) return;
        const { keepStudyingHere, ...data } = form.getValues();
        onAdd({
            ...data,
            endDate: keepStudyingHere ? null : `${data.endDate} 00:00`,
            startDate: `${data.startDate} 00:00`,
        });
        closeForm();
    };

    const { errors } = form.formState;

    return (
        <section className={styles['form-container']}>
            <header className={styles.header}>
                <Button onClick={closeForm} type="text" style={{ padding: 0 }}>
                    <CloseIcon />
                </Button>
            </header>

            <div className="two-columns">
                <FormControl
                    label="Titulo"
                    errorMessage={errors.title?.message}
                    required
                >
                    <input
                        type="text"
                        {...form.register('title', {
                            required: 'El título no puede estar vacío',
                        })}
                    />
                </FormControl>

                <FormControl
                    label="Instituto"
                    errorMessage={errors.institute?.message}
                    required
                >
                    <input
                        type="text"
                        {...form.register('institute', {
                            required: 'El instituto no puede estar vacío',
                        })}
                    />
                </FormControl>
            </div>

            <FormControl
                label="Descripción"
                errorMessage={errors.description?.message}
                required
            >
                <input
                    type="text"
                    {...form.register('description', {
                        required: 'La descripción no puede estar vacía',
                    })}
                />
            </FormControl>

            <div className="three-columns">
                <FormControl
                    label="Fecha de Inicio"
                    errorMessage={errors.startDate?.message}
                    required
                >
                    <input
                        type="date"
                        {...form.register('startDate', {
                            required: 'La fecha de inicio no puede estar vacía',
                        })}
                    />
                </FormControl>

                <FormControl
                    label="Fecha de Finalización"
                    errorMessage={errors.endDate?.message}
                    required
                >
                    <input
                        type="date"
                        {...form.register('endDate', {
                            validate: (value) => {
                                const keepStudyingHere =
                                    form.getValues('keepStudyingHere');

                                if (!keepStudyingHere && !value)
                                    return 'La fecha de finalización no puede estar vacía';
                                else false;
                            },
                        })}
                    />
                </FormControl>

                <label className="checkbox align-start">
                    <input
                        type="checkbox"
                        {...form.register('keepStudyingHere')}
                    />
                    Sigo estudiando aquí
                </label>
            </div>

            <div
                className="group"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: 16,
                }}
            >
                <Button type="primary" onClick={submitForm}>
                    Agregar
                </Button>

                <Button type="text" onClick={closeForm}>
                    Cancelar
                </Button>
            </div>
        </section>
    );
};
