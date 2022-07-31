import * as admin from 'firebase-admin';
import conf from 'config';
const firebaseConfig = conf.get('firebase');
export const app = admin.initializeApp(firebaseConfig as admin.AppOptions);
