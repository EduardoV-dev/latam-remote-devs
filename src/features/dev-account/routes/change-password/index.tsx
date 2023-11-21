import { FormControl } from '@/components/form-control';
import { Button } from 'antd';
import styles from './index.module.scss';
import { ChangePasswordLayout } from '../../components/change-password-layout';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useChangePassword } from '../../api/change-password';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { APP_ROUTES } from '@/config/routes';

interface ChangePasswordState {
    currentPassword: string;
    newPassword: string;
    repeatPassword: string;
}

export const ChangePassword = (): JSX.Element => {
    const navigate = useNavigate();
    const { mutate, isLoading } = useChangePassword({
        onSuccess: () => {
            toast.success('La Contraseña ha sido cambiada');
            navigate(APP_ROUTES.PRIVATE.DEV.ACCOUNT.BASE);
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const form = useForm<ChangePasswordState>();

    const { errors } = form.formState;

    const onSubmit: SubmitHandler<ChangePasswordState> = (data) =>
        !isLoading &&
        mutate({
            newPassword: data.newPassword,
            oldPassword: data.currentPassword,
        });

    return (
        <ChangePasswordLayout>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormControl
                    errorMessage={errors.currentPassword?.message}
                    label="Contraseña actual"
                    required
                >
                    <input
                        type="password"
                        {...form.register('currentPassword', {
                            required: 'Ingrese su contraseña actual',
                            minLength: {
                                value: 6,
                                message:
                                    'La contraseña debe ser de mínimo 6 carácteres',
                            },
                        })}
                    />
                </FormControl>

                <FormControl
                    errorMessage={errors.newPassword?.message}
                    label="Nueva contraseña"
                    required
                >
                    <input
                        type="password"
                        {...form.register('newPassword', {
                            required: 'Ingrese la nueva contraseña',
                            minLength: {
                                value: 6,
                                message:
                                    'La contraseña debe ser de mínimo 6 carácteres',
                            },
                        })}
                    />
                </FormControl>

                <FormControl
                    errorMessage={errors.repeatPassword?.message}
                    label="Confirmar nueva contraseña"
                    required
                >
                    <input
                        type="password"
                        {...form.register('repeatPassword', {
                            required: 'Repita la nueva contraseña',
                            minLength: {
                                message:
                                    'La contraseña debe de ser mínimo de 6 carácteres',
                                value: 6,
                            },
                            validate: (repeatPassword) =>
                                repeatPassword ===
                                    form.getValues('newPassword') ||
                                'Las contraseñas no coinciden',
                        })}
                    />
                </FormControl>

                <Button
                    className={styles.submit}
                    type="primary"
                    htmlType="submit"
                    disabled={isLoading}
                >
                    Cambiar Contraseña
                </Button>
            </form>
        </ChangePasswordLayout>
    );
};
