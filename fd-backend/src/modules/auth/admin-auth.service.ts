import { Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import * as admin from 'firebase-admin';
import firebaseAccountCredentials from '../../../fast-delivery-uma-firebase-adminsdk-y1cvp-422b7b2779.json';

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'fast-delivery-uma',
});

const auth = getAuth(app);

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
