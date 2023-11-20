import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import { CountrySelector } from '@/components/country-selector';
import { ImageInput } from '@/features/dev-account/components/image-input';
import { FormType } from '..';
import { useFormEditStore } from '@/features/dev-account/stores/form-edit';

interface Props {
    form: FormType;
}

export const BasicInformationForm = ({ form }: Props): JSX.Element => {
    const isEditing = useFormEditStore((state) => state.isEditing);
    const { basic } = form.formState.errors;

    return (
        <TwoColumnedSection title="Información Básica">
            <div className="two-columns">
                <FormControl
                    label="Nombre"
                    required
                    errorMessage={basic?.name?.message}
                >
                    <input
                        type="text"
                        {...form.register('basic.name', {
                            required: 'El nombre no puede quedar vacío',
                        })}
                    />
                </FormControl>

                <FormControl
                    label="Apellido"
                    required
                    errorMessage={basic?.lastname?.message}
                >
                    <input
                        type="text"
                        {...form.register('basic.lastname', {
                            required: 'El apellido no puede quedar vacío',
                        })}
                    />
                </FormControl>
            </div>

            <div className="two-columns">
                <FormControl
                    label="País"
                    required
                    errorMessage={basic?.country?.message}
                >
                    <CountrySelector
                        register={form.register('basic.country', {
                            required: 'El país no puede quedar vacío',
                        })}
                    />
                </FormControl>

                <FormControl
                    label="Ciudad"
                    required
                    errorMessage={basic?.city?.message}
                >
                    <input
                        type="text"
                        {...form.register('basic.city', {
                            required: 'La ciudad no puede quedar vacía',
                        })}
                    />
                </FormControl>
            </div>

            <div className="two-columns">
                <FormControl label="Dirección">
                    <input type="text" {...form.register('basic.address')} />
                </FormControl>

                <FormControl
                    label="Teléfono"
                    required
                    errorMessage={basic?.telephone?.message}
                >
                    <input
                        type="tel"
                        {...form.register('basic.telephone', {
                            required: 'El teléfono no puede quedar vacío',
                        })}
                    />
                </FormControl>
            </div>

            <FormControl label="Foto de perfil">
                <ImageInput
                    id="dev-profile-picture"
                    onChange={(file) =>
                        form.setValue('basic.profilePicture', file)
                    }
                    initialValue={
                        isEditing
                            ? (form.getValues('basic.profilePicture') as string)
                            : undefined
                    }
                />
            </FormControl>
        </TwoColumnedSection>
    );
};
