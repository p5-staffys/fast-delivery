import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, User, UserCredential } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDXtf7ajb2ib8NaqfDf0--2orNRYC7jZ6Y",
  authDomain: "fast-delivery-uma.firebaseapp.com",
};

const app = initializeApp(firebaseConfig);
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
