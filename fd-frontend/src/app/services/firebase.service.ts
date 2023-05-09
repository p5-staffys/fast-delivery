import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey,
  authDomain,
  storageBucket: "gs://fast-delivery-uma.appspot.com",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const firebaseSignIn = async (email: string, password: string): Promise<IAuth> => {
  try {
    const userCredentials: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    const user: User = userCredentials.user;
    const idToken: string = await user.getIdToken();
    return { user, idToken };
  } catch (error: unknown) {
    throw error;
  }
};

export const firebaseSignOut = async (): Promise<void> => {
  signOut(auth);
};

export interface IAuth {
  user: User;
  idToken: string;
}
