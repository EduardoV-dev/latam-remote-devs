import { Auth } from '@/lib/auth';
import { useGetAccount } from '../../api/get-account';
import { AccountForm } from '../../modules/account-form';

export const EditAccount = (): JSX.Element => {
    const { isLoading, data } = useGetAccount();

    if (isLoading || !data) return <>Cargando...</>;

    const onSuccess = (): void => {};

    console.log(data);

    return (
        <AccountForm
            {...{ onSuccess }}
            initialValues={{
                basic: {
                    address: data.address,
                    city: data.city,
                    country: data.country,
                    lastname: data.lastName,
                    name: data.firstName,
                },
            }}
        />
    );
};
