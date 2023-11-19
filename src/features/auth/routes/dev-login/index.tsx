import { FormControl } from '@/components/form-control';
import { Auth } from '@/lib/auth';
import { toast } from 'react-toastify';
import { Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import styles from './index.module.scss';
import clsx from 'clsx';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { emailRegex } from '../../constants/form.regex';
import { useDevLogin } from '../../api/dev-login';
import { APP_ROUTES } from '@/config/routes';
import { Role, useAuthUserStore } from '../../stores/auth-user';

interface Login {
    email: string;
    password: string;
}

export const DevLogin = (): JSX.Element => {
    const store = useAuthUserStore();
    const navigate = useNavigate();
    const form = useForm<Login>();
    const { isLoading, mutate } = useDevLogin({
        onSuccess: (data) => {
            Auth.saveAuth(data);
            navigate(APP_ROUTES.PUBLIC.JOBS);
            store.setIsLoggedIn(true);
            store.setRole(data.user.role as Role);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const onSubmit: SubmitHandler<Login> = (data) => !isLoading && mutate(data);

    const { errors } = form.formState;

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
                                    'La contraseña debe de ser mínimo de 6 carácteres',
                                value: 6,
                            },
                        })}
                    />
                </FormControl>

                <Button
                    className={clsx(styles.submit, 'center')}
                    type="primary"
                    htmlType="submit"
                    disabled={isLoading}
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
