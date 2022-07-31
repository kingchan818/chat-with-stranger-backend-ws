import { app } from './firebase';
import { getAuth } from 'firebase-admin/auth';
const auth = getAuth(app);

export const verifyWithToken = async (token: string) => {
    return await auth.verifyIdToken(token);
};
