import { UseFormRegisterReturn } from 'react-hook-form';
import { COUNTRIES } from './countries.contants';

interface Props {
    register: UseFormRegisterReturn;
}

export const CountrySelector = ({ register }: Props): JSX.Element => (
    <select {...register}>
        <option value="" hidden>
            Seleccione un país
        </option>

        {COUNTRIES.map((country) => (
            <option key={country} value={country}>
                {country}
            </option>
        ))}
    </select>
);

CountrySelector.displayName = 'CountrySelector';
