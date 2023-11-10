import React from 'react';

import styles from './index.module.scss';

export type FormControlProps = {
    /** Error message coming from react-hook-form */
    errorMessage?: string;
    /** Label uppon the form control */
    label: string;
    /** Adds a star next to the label to indicate is a required field */
    required?: boolean;
};

type Props = FormControlProps & {
    /** Form control */
    children: React.ReactNode;
};

/**
 * It's a container that wraps a form control and it's label, with custom spacing and styles.
 * Error messages can be handled by passing the error message from react-hook-form
 *
 * @example
 * <FormControl errorMessage="error" label="Email" required>
 *   <input type="text" {...register('email')} />
 * </FormControl>
 */
export const FormControl = ({
    children,
    errorMessage,
    label,
    required = false,
}: Props) => (
    <div className={styles.container}>
        <label>
            {label} {required && '*'}
        </label>

        {children}

        {errorMessage && <p className="form-error">{errorMessage}</p>}
    </div>
);

FormControl.displayName = 'FormControl';
