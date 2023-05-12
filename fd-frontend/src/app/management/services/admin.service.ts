import axios, { AxiosResponse } from "axios";
import { firebaseSignIn, firebaseSignOut, IAuth } from "../../services/firebase.service";
import { Logs, User } from "@/utils/interfaces/user.interfaces";

const path = process.env.NEXT_PUBLIC_PATH_TO_BACK || "";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth: IAuth = await firebaseSignIn(email, password);
    const idToken: string = auth.idToken;
    localStorage.setItem("idToken", idToken);
    const response: AxiosResponse = await axios.get(`${path}/admin`, {
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
      `${path}/admin`,
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
    const response: AxiosResponse = await axios.get(`${path}/admin/authenticate`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const authorization = response.data;
    return authorization;
  } catch (error: unknown) {
    throw error;
  }
};

export const getLogs = async (date: string): Promise<Logs | undefined> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/admin/getLogs/${date}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });

    const logs = response.data;
    return logs;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const { response } = error;
      if (response && response.status === 400) {
        return undefined;
      }
    }
    throw error;
  }
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/admin/users`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const users: User[] = response.data;
    return users;
  } catch (error: unknown) {
    throw error;
  }
};

export const getUserById = async (id: string): Promise<User> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/admin/user/${id}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};

export const getStatus = async (id: string): Promise<boolean> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.put(
      `${path}/admin/status/${id}`,
      {},
      {
        withCredentials: true,
        headers: { Authorization: idToken },
      },
    );
    const status: boolean = response.data.active;
    return status;
  } catch (error: unknown) {
    throw error;
  }
};

export const deletePackageByUser = async (idUser: string | undefined, idPackage: string): Promise<User> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.delete(`${path}/admin/${idUser}/${idPackage}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const user: User = response.data;
    return user;
  } catch (error: unknown) {
    throw error;
  }
};
