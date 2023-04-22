import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  User,
  UserCredential,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXtf7ajb2ib8NaqfDf0--2orNRYC7jZ6Y",
  authDomain: "fast-delivery-uma.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseSignIn = async (email: string, password: string): Promise<User> => {
  try {
    const userCredentials: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user: User = userCredentials.user;
    return user;
  } catch (error) {
    throw error;
  }
};
