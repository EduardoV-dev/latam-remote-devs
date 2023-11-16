import { FormControl } from '@/components/form-control';
import { TwoColumnedSection } from '../../../components/two-columned-section';
import { CountrySelector } from '@/components/country-selector';
import { ImageInput } from '@/features/dev-account/components/image-input';

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
            <ImageInput id="dev-profile-picture" />
        </FormControl>
    </TwoColumnedSection>
);
