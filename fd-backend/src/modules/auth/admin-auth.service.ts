import { Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

import * as admin from 'firebase-admin';
import serviceAccount from '../../../fast-delivery-uma-firebase-adminsdk-y1cvp-422b7b2779.json';

const serviceAccountJSON = JSON.stringify(serviceAccount);

const app = initializeApp({
  credential: admin.credential.cert(serviceAccountJSON),
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
