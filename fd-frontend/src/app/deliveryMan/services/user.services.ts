import axios, { AxiosResponse } from "axios";
import { firebaseSignIn, firebaseSignOut, IAuth } from "../../services/firebase.service";
import { Form, User } from "@/utils/interfaces/user.interfaces";

const path = process.env.NEXT_PUBLIC_PATH_TO_BACK || "";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = auth.idToken;
    localStorage.setItem("idToken", idToken);
    const response: AxiosResponse = await axios.get(`${path}/user`, {
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
      `${path}/user`,
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

export const getAuthorization = async (): Promise<boolean> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/user/authenticate`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const authorization = response.data;
    return authorization;
  } catch (error: unknown) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/user`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const sendForm = async (
  form: Form,
): Promise<{
  ok: boolean;
  message: string;
}> => {
  try {
    const date = new Date().toDateString().split("T")[0];
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.post(
      `${path}/user/addForm`,
      { date, form },
      {
        withCredentials: true,
        headers: { Authorization: idToken },
      },
    );
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
