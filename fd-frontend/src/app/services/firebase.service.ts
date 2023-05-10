import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;

const firebaseConfig = {
  apiKey,
  authDomain,
  storageBucket: "gs://fast-delivery-uma.appspot.com",
};

export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export interface IAuth {
  user: User;
  idToken: string;
}
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

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider); /*.then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(result, user, token);
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  });*/
  /*.catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });*/
};
