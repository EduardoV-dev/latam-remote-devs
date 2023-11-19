import { toast } from 'react-toastify';
import { FormControl } from '@/components/form-control';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import styles from './index.module.scss';
import clsx from 'clsx';
import { emailRegex } from '../../constants/form.regex';
import { useDevRegister } from '../../api/dev-register';
import { Auth } from '@/lib/auth';
import { Role, useAuthUserStore } from '../../stores/auth-user';
import { APP_ROUTES } from '@/config/routes';

export interface DevRegister {
    email: string;
    password: string;
    repeatPassword: string;
}

export const DevRegister = (): JSX.Element => {
    const form = useForm<DevRegister>();
    const navigate = useNavigate();
    const store = useAuthUserStore();
    const { isLoading, mutate } = useDevRegister({
        onSuccess: (data) => {
            Auth.saveAuth(data);
            Auth.saveFirstLogin(true);
            store.setIsLoggedIn(true);
            store.setRole(data.user.role as Role);
            store.setIsFirstLogin(true);
            toast.success('Empieza llenando la información de tu perfil');
            navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.NEW);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { errors } = form.formState;

    const onSubmit: SubmitHandler<DevRegister> = (data) =>
        !isLoading && mutate(data);

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
                                    'La contraseña debe de ser mínimo de 6 carácteres',
                                value: 6,
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
                                    'La contraseña debe de ser mínimo de 6 carácteres',
                                value: 6,
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
                    disabled={isLoading}
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
