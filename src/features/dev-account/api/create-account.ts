import { useMutation } from 'react-query';
import { MutationConfig } from '@/lib/react-query';
import { axios } from '@/lib/axios';
import { DeveloperAccountDTO, DeveloperData } from '..';
import { Auth } from '@/lib/auth';

const CREATE_ACCOUNT_ENDPOINT = '/developer';
const UPLOAD_PICTURE_ENDPOINT = (developerId: number) =>
    `/auth/upload-user-pic/${developerId}`;
const UPLOAD_CV_ENDPOINT = (userId: number) => `/developer/upload-cv/${userId}`;

export const handleAccountInformation = async (
    params: DeveloperAccountDTO,
    type: 'post' | 'patch',
): Promise<any> => await axios[type](CREATE_ACCOUNT_ENDPOINT, params);

const uploadCV = async (cv: File, developerId: number): Promise<any> => {
    const cvForm = new FormData();
    cvForm.append('file', cv);

    return axios.post(UPLOAD_CV_ENDPOINT(developerId), cvForm);
};

const uploadPicture = (picture: File): Promise<any> =>
    new Promise((resolve, reject) => {
        if (!picture) return resolve('');

        try {
            const picForm = new FormData();
            picForm.append('file', picture);

            const userId: number = Auth.getAuth()!.user.id;
            axios
                .post(UPLOAD_PICTURE_ENDPOINT(userId), picForm)
                .then((user) => resolve((user as any).pictureUrl))
                .catch((error) => reject(error));
        } catch (error) {
            reject(error);
        }
    });

const handleAccount = async ({
    account,
    upload,
    type,
}: DeveloperData): Promise<any> => {
    const { developerId } = await handleAccountInformation(account, type);

    return Promise.allSettled([
        uploadPicture(upload.picture),
        uploadCV(upload.cv, developerId),
    ]);
};

export const useAccountHandling = (
    config: MutationConfig<typeof handleAccount> = {},
) =>
    useMutation({
        mutationFn: handleAccount,
        mutationKey: 'handle-account',
        ...config,
    });
