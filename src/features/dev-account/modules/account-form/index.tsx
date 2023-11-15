import { Button } from 'antd';
import { BasicInformationForm } from './basic-information-form';
import { EducationForm } from './education-form';
import { ExperienceForm } from './experience-form';
import { ProfileBasedForm } from './profile-based-form';
import { SkillsForm } from './skills-form';
import styles from './index.module.scss';

export const AccountForm = (): JSX.Element => (
    <form>
        <BasicInformationForm />
        <ProfileBasedForm />
        <SkillsForm />
        <ExperienceForm />
        <EducationForm />

        <Button type="primary" className={styles.button}>
            Finalizar Perfil
        </Button>
    </form>
);

AccountForm.displayName = 'NewAccount';
