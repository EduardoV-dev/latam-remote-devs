import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../components/two-columned-section';
import { LimitedTextArea } from '../../components/limited-textarea';

export const ProfileBasedForm = (): JSX.Element => (
    <TwoColumnedSection title="Sobre el perfil">
        <div className="two-columns">
            <FormControl label="Título profesional" required>
                <input type="text" />
            </FormControl>

            <FormControl label="Sitio Web">
                <input type="text" />
            </FormControl>
        </div>

        <FormControl label="Sobre mi" required>
            <LimitedTextArea maxCharacters={250} onChange={() => {}} />
        </FormControl>

        <FormControl label="CV" required>
            <input />
        </FormControl>

        <div className="two-columns">
            <FormControl label="Github">
                <input type="text" />
            </FormControl>

            <FormControl label="LinkedIn">
                <input type="text" />
            </FormControl>
        </div>
    </TwoColumnedSection>
);

ProfileBasedForm.displayName = 'ProfileBasedForm';
