export const JobItemState = (): JSX.Element => (
    <select>
        <option value="" hidden>
            Seleccionar estado
        </option>
        <option value="0">En proceso</option>
        <option value="1">Contratado</option>
        <option value="2">Rechazado</option>
        <option value="3">No interesado</option>
    </select>
);
