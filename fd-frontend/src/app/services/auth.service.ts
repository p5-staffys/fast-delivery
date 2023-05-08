import axios, { AxiosResponse } from "axios";
import { firebaseSignIn, firebaseSignOut, IAuth } from "../services/firebase.service";
import { User } from "@/utils/interfaces/user.interfaces";

const back = process.env.NEXT_PUBLIC_PATH_TO_BACK || "";

export const signIn = async (email: string, password: string): Promise<{ user: User; isAdmin: boolean }> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = auth.idToken;
    localStorage.setItem("idToken", idToken);
    const isAdmin: AxiosResponse = await axios.get(`${back}/admin/authenticate`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    let path = "user";
    if (isAdmin.data) path = "admin";
    const response: AxiosResponse = await axios.get(`${back}/${path}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return { user, isAdmin: isAdmin.data };
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
      `${back}/user`,
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

export const getAuthorization = async (): Promise<Partial<{ authorice: boolean; admin: boolean }>> => {
  try {
    const idToken = localStorage.getItem("idToken");
    if (!idToken) return { authorice: false };
    const userResponse: AxiosResponse<boolean> = await axios.get(`${back}/user/authenticate`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user = userResponse.data;
    const adminResponse: AxiosResponse<boolean> = await axios.get(`${back}/admin/authenticate`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const admin = adminResponse.data;
    const authorice = user || admin;

    return { authorice, admin };
  } catch (error: unknown) {
    throw error;
  }
};
