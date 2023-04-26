import { Injectable } from '@nestjs/common';

import { initializeApp } from 'firebase/app';

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  deleteUser,
  updateProfile,
  User,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDXtf7ajb2ib8NaqfDf0--2orNRYC7jZ6Y',
  authDomain: 'fast-delivery-uma.firebaseapp.com',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable()
export class FirebaseDevService {
  async create(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  async sendEmailVerification(user: User) {
    return sendEmailVerification(user);
  }

  async signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async signOut() {
    return signOut(auth);
  }

  async getCurrentUser() {
    const user = auth.currentUser;
    return user;
  }

  async updateName(user: User, displayName: string): Promise<void> {
    return await updateProfile(user, { displayName });
  }

  async updatePhotoURL(user: User, photoURL: string): Promise<void> {
    return updateProfile(user, { photoURL });
  }

  async delete(user: User) {
    return deleteUser(user);
  }
}
