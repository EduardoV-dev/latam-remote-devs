import { FormControl } from '@/components/form-control';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import styles from './index.module.scss';
import clsx from 'clsx';
import { emailRegex } from '../../constants/form.regex';

interface Register {
    email: string;
    password: string;
    repeatPassword: string;
}

export const DevRegister = (): JSX.Element => {
    const form = useForm<Register>();
    const { errors } = form.formState;

    const onSubmit: SubmitHandler<Register> = (data) => console.log(data);

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormControl
                    errorMessage={errors.email?.message}
                    label="Email"
                    required
                >
                    <input
                        type="text"
                        {...form.register('email', {
                            required: 'Ingrese su email',
                            pattern: {
                                value: emailRegex,
                                message: 'Email no válido',
                            },
                        })}
                    />
                </FormControl>

                <FormControl
                    errorMessage={errors.password?.message}
                    label="Contraseña"
                    required
                >
                    <input
                        type="password"
                        {...form.register('password', {
                            required: 'Ingrese su contraseña',
                            minLength: {
                                message:
                                    'La contraseña debe de ser mínimo de 5 carácteres',
                                value: 5,
                            },
                        })}
                    />
                </FormControl>

                <FormControl
                    errorMessage={errors.repeatPassword?.message}
                    label="Repetir Contraseña"
                    required
                >
                    <input
                        type="password"
                        {...form.register('repeatPassword', {
                            required: 'Este campo no puede estar vacío',
                            minLength: {
                                message:
                                    'La contraseña debe de ser mínimo de 5 carácteres',
                                value: 5,
                            },
                            validate: (value) => {
                                const password: string =
                                    form.getValues('password');

                                return (
                                    password === value ||
                                    'Las contraseñas no coinciden'
                                );
                            },
                        })}
                    />
                </FormControl>

                <Button
                    className={clsx('center', styles.submit)}
                    type="primary"
                    htmlType="submit"
                >
                    Crear cuenta
                </Button>
            </form>

            <p className={styles.link}>
                ¿Ya tienes una cuenta? <Link to="/auth/dev/login">Ingresa</Link>
            </p>

            <p className={styles.hire}>
                ¿Quieres contratar desarrolladores?{' '}
                <Link to="/">Crea una cuenta</Link>
            </p>
        </>
    );
};

DevRegister.displayName = 'DevRegister';
