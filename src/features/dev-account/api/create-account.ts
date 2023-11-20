import { useMutation } from 'react-query';
import { MutationConfig } from '@/lib/react-query';
import { axios } from '@/lib/axios';
import { DeveloperAccountDAO, DeveloperAccountDTO, DeveloperData } from '..';
import { Auth } from '@/lib/auth';

const CREATE_ACCOUNT_ENDPOINT = '/developer';
const UPLOAD_PICTURE_ENDPOINT = (developerId: number) =>
    `/auth/upload-user-pic/${developerId}`;
const UPLOAD_CV_ENDPOINT = (userId: number) => `/developer/upload-cv/${userId}`;

export const handleAccountInformation = async (
    params: DeveloperAccountDTO,
    type: 'post' | 'patch',
): Promise<DeveloperAccountDAO> =>
    await axios[type](CREATE_ACCOUNT_ENDPOINT, params);

const uploadCV = async (
    cv: File | undefined,
    developerId: number,
): Promise<string | null> =>
    new Promise((resolve, reject) => {
        try {
            if (!cv) resolve(null);
            const cvForm = new FormData();
            cvForm.append('file', cv!);

            axios
                .post(UPLOAD_CV_ENDPOINT(developerId), cvForm)
                .then((user) => resolve((user as any).cvUrl))
                .catch(reject);
        } catch (error) {
            reject(error);
        }
    });

const uploadPicture = (picture: File | undefined): Promise<string | null> =>
    new Promise((resolve, reject) => {
        try {
            if (!picture) return resolve(null);

            const userId: number = Auth.getAuth()!.user.id;
            const picForm = new FormData();
            picForm.append('file', picture);

            axios
                .post(UPLOAD_PICTURE_ENDPOINT(userId), picForm)
                .then((user) => resolve((user as any).pictureUrl))
                .catch(reject);
        } catch (error) {
            reject(error);
        }
    });

const handleAccount = async ({
    account,
    upload,
    type,
}: DeveloperData): Promise<DeveloperAccountDAO & { picture: string }> => {
    const response = await handleAccountInformation(account, type);

    const [picture, cv] = await Promise.allSettled([
        uploadPicture(upload.picture),
        uploadCV(upload.cv, response.id),
    ]);

    return {
        ...response,
        cvUrl: (cv as any).value,
        picture: (picture as any).value,
    };
};

export const useAccountHandling = (
    config: MutationConfig<typeof handleAccount> = {},
) =>
    useMutation({
        mutationFn: handleAccount,
        mutationKey: 'handle-account',
        ...config,
    });
