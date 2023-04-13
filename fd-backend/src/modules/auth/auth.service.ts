import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';

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
export class AuthService {
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

/*
const firebaseConfig = {
  apiKey: "AIzaSyBoALIZQuxDRiAk48VjH610uVuqFr3aBH8",
  authDomain: "fast-delivery-97f7c.firebaseapp.com",
  projectId: "fast-delivery-97f7c",
  storageBucket: "fast-delivery-97f7c.appspot.com",
  messagingSenderId: "241051791820",
  appId: "1:241051791820:web:8d2c09974e4c20a7756d69",
  measurementId: "G-0YB89DTM7G"
};
*/
