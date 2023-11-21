import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import { LimitedTextArea } from '../../../components/limited-textarea';
import { FileInput } from '@/features/dev-account/components/file-input';
import { FormType } from '..';
import { useFormEditStore } from '@/features/dev-account/stores/form-edit';

interface Props {
    form: FormType;
}

export const ProfileBasedForm = ({ form }: Props): JSX.Element => {
    const isEditing = useFormEditStore((state) => state.isEditing);
    const { profile } = form.formState.errors;

    form.register('profile.about', {
        required: 'El campo no puede quedar vacío',
    });

    form.register('profile.cv', {
        ...(!isEditing && {
            required: 'Debe subir un CV',
        }),
    });

    return (
        <TwoColumnedSection title="Sobre el perfil">
            <div className="two-columns">
                <FormControl
                    label="Título profesional"
                    required
                    errorMessage={profile?.profesionalTitle?.message}
                >
                    <input
                        type="text"
                        {...form.register('profile.profesionalTitle', {
                            required: 'El campo no puede estar vacío',
                        })}
                    />
                </FormControl>

                <FormControl label="Sitio Web">
                    <input type="text" {...form.register('profile.website')} />
                </FormControl>
            </div>

            <FormControl
                label="Sobre mi"
                required
                errorMessage={profile?.about?.message}
            >
                <LimitedTextArea
                    maxCharacters={250}
                    onChange={(value) => form.setValue('profile.about', value)}
                    {...(isEditing && {
                        initialValue: form.getValues('profile.about'),
                    })}
                />
            </FormControl>

            <FormControl
                label="CV"
                required
                errorMessage={profile?.cv?.message}
            >
                <FileInput
                    id="dev-cv"
                    onChange={(file) => form.setValue('profile.cv', file)}
                    initialValue={
                        isEditing
                            ? (form.getValues('profile.cv') as string)
                            : undefined
                    }
                />
            </FormControl>

            <div className="two-columns">
                <FormControl label="Github">
                    <input type="text" {...form.register('profile.github')} />
                </FormControl>

                <FormControl label="LinkedIn">
                    <input type="text" {...form.register('profile.linkedin')} />
                </FormControl>
            </div>
        </TwoColumnedSection>
    );
};

ProfileBasedForm.displayName = 'ProfileBasedForm';
