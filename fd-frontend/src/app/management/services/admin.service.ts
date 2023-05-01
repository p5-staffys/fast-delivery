import axios, { AxiosError, AxiosResponse } from "axios";
import { firebaseSignIn, firebaseSignOut, IAuth } from "../../services/firebase.service";
import { User } from "@/utils/interfaces/user.interfaces";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = auth.idToken;
    localStorage.setItem("idToken", idToken);
    const response: AxiosResponse = await axios.get("https://backend-buhubxjtrq-ue.a.run.app/admin", {
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
    localStorage.removeItem("user");
  } catch (error: unknown) {
    throw error;
  }
};

export const signUp = async (email: string, password: string, name: string, lastName: string): Promise<User> => {
  try {
    const response: AxiosResponse = await axios.post(
      "https://backend-buhubxjtrq-ue.a.run.app/admin",
      { email, name, lastName, password },
      { withCredentials: true },
    );
    if (response.status != 201) throw response.data;
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const checkAdmin = async (): Promise<boolean | void> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get("https://backend-buhubxjtrq-ue.a.run.app/admin/authenticate", {
      withCredentials: true,
      headers: { Authorization: idToken },
    });

    if (!response) {
      return false;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response?.status === 401) {
        return false;
      }
    }
  }
};
