import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import { CountrySelector } from '@/components/country-selector';
import { FileInput } from '../../../components/file-input';

export const BasicInformationForm = (): JSX.Element => (
    <TwoColumnedSection title="Información Básica">
        <div className="two-columns">
            <FormControl label="Nombre Completo" required>
                <input type="text" />
            </FormControl>

            <FormControl label="País" required>
                <CountrySelector />
            </FormControl>
        </div>

        <div className="two-columns">
            <FormControl label="Ciudad" required>
                <input type="text" />
            </FormControl>

            <FormControl label="Teléfono" required>
                <input type="tel" />
            </FormControl>
        </div>

        <FormControl label="Foto de perfil">
            <FileInput accept="image/*" id="profile-picture" />
        </FormControl>
    </TwoColumnedSection>
);
