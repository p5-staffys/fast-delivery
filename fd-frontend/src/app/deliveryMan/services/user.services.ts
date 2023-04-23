import axios, { AxiosResponse } from "axios";
import { firebaseSignIn, firebaseSignOut, IAuth } from "../../services/firebase.service";
import { User } from "../../../context/store";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = await auth.getIdToken();
    localStorage.setItem("idToken", idToken);
    const response: AxiosResponse = await axios.get("https://fd-backend-no-cookie-buhubxjtrq-uw.a.run.app/user", {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    firebaseSignOut();
    localStorage.removeItem("idToken");
  } catch (error: unknown) {
    throw error;
  }
};
