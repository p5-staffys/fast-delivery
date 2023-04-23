import axios, { AxiosResponse } from "axios";
import { firebaseSignIn, IAuth } from "../../services/firebase.service";
import { User } from "../../../context/store";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = await auth.getIdToken();
    localStorage.setItem("idToken", idToken);
    const response: AxiosResponse = await axios.get("http://localhost:8000/user", {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};
