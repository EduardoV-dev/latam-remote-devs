import { COUNTRIES } from './countries.contants';

export const CountrySelector = (): JSX.Element => (
    <select>
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
