import { Routes, Route } from 'react-router-dom';
import { DevLogin } from './dev-login';
import { AuthLayout } from '../components/auth-layout';
import { DevRegister } from './dev-register';

export const AuthRoutes = (): JSX.Element => (
    <AuthLayout>
        <Routes>
            <Route path="dev">
                <Route path="login" element={<DevLogin />} />
                <Route path="registration" element={<DevRegister />} />
            </Route>
        </Routes>
    </AuthLayout>
);

AuthRoutes.displayName = 'AuthRoutes';
