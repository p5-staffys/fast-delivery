import { BadRequestException, Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const app = initializeApp({ projectId: 'fast-delivery-uma' });

export const auth = getAuth(app);

export interface IAuth {
  email: string;
  password: string;
  admin: boolean;
}

@Injectable()
export class AuthService {
  async authenticate(idToken: string) {
    return auth.verifyIdToken(idToken);
  }

  async create(email: string, password: string, admin: boolean) {
    const newAdminAuth = await auth.createUser({ email, password });
    const uid = newAdminAuth.uid;
    await auth.setCustomUserClaims(uid, { admin });
    return newAdminAuth;
  }

  async checkAdminEmail(email: string): Promise<boolean> {
    try {
      await auth.getUserByEmail(email);
      throw new BadRequestException(
        'El usuario ya esta registrado con ese email',
      );
    } catch {
      return true;
    }
  }

  async getCurrentUser(uid: string) {
    return auth.getUser(uid);
  }

  async remove(uid: string) {
    return auth.deleteUser(uid);
  }

  async verifyAdmin(idToken: string): Promise<boolean> {
    const admin = (await auth.verifyIdToken(idToken)).admin;
    return admin;
  }
}
