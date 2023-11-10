import { FormControl } from '@/components/form-control';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import styles from './index.module.scss';
import clsx from 'clsx';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { emailRegex } from '../../constants/form.regex';

interface Login {
    email: string;
    password: string;
}

export const DevLogin = (): JSX.Element => {
    const form = useForm<Login>();
    const { errors } = form.formState;

    const onSubmit: SubmitHandler<Login> = (data) => console.log(data);

    return (
        <>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormControl
                    label="Email"
                    errorMessage={errors.email?.message}
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
                    label="Contraseña"
                    errorMessage={errors.password?.message}
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

                <Button
                    className={clsx(styles.submit, 'center')}
                    type="primary"
                    htmlType="submit"
                >
                    Ingresar
                </Button>
            </form>

            <div className={styles.links}>
                <p>
                    ¿No tienes una cuenta?{' '}
                    <Link to="/auth/dev/registration">Crea una</Link>
                </p>

                <Link to="/auth/dev/forgot-password">
                    ¿Olvidaste tu contraseña?
                </Link>
            </div>

            <p className={styles.hire}>
                ¿Deseas contratar desarrolladores?
                <Link to="/">Crea una cuenta</Link>
            </p>
        </>
    );
};

DevLogin.displayName = 'DevLogin';
