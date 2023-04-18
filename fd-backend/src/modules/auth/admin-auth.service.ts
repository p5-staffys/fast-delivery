import { Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({ projectId: 'fast-delivery-uma' });

export const auth = getAuth(app);

@Injectable()
export class AdminAuthService {
  async authenticate(idToken: string) {
    return auth.verifyIdToken(idToken);
  }

  async create(email: string, password: string, admin: boolean) {
    const newAdminAuth = await auth.createUser({ email, password });
    const uid = newAdminAuth.uid;
    await auth.setCustomUserClaims(uid, { admin });
    return newAdminAuth;
  }

  async getCurrentUser(uid: string) {
    return auth.getUser(uid);
  }

  async remove(uid: string) {
    return auth.deleteUser(uid);
  }
}
