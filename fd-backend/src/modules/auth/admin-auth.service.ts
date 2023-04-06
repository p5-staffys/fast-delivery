import { Injectable } from '@nestjs/common';

import { initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import * as firebaseAdmin from 'firebase-admin';
import firebaseAccountCredentials from '../../../fast-delivery-uma-firebase-adminsdk-y1cvp-422b7b2779.json';

const serviceAccount = firebaseAccountCredentials as ServiceAccount;

const app = initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
  projectId: 'fast-delivery-uma',
});

export const auth = getAuth(app);

@Injectable()
export class AdminAuthService {
  async authenticate(idToken: string) {
    return auth.verifyIdToken(idToken);
  }

  async getCurrentUser(uid: string) {
    return auth.getUser(uid);
  }

  async remove(uid: string) {
    return auth.deleteUser(uid);
  }
}
