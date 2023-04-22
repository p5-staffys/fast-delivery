import Cookies from "js-cookie";
import axios, { AxiosResponse } from "axios";
import { firebaseSignIn } from "../../services/firebase.service";
import { User } from "@/utils/seed";

// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

export const signIn = async (email: string, password: string): Promise<User> => {
  try {
    const auth = await firebaseSignIn(email, password);
    const idToken: string = await auth.getIdToken();
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

/* export const GetUsers = async (email: string, password: string): Promise<unknown> => {
  try {
    const auth = await firebaseSignIn(email, password);
    const idToken = await auth.getIdToken();
    Cookies.set("idToken", idToken, {
      sameSite: "none",
      secure: true,
    });
    const user = await axios.get("https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/user", {
      withCredentials: true,
    });
    console.log(user);
    return user;
  } catch (error: unknown) {
    throw error;
  }
}; */

/*export const GetUsers = async (email: string, password: string): Promise<AxiosResponse> => {
  return axios
    .post(
      "https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/user/signIn",
      { email, password },
      { withCredentials: true },
    )
    .then((response) => response.data)
    .then((data) => data)
    .catch((error) => error);
};*/
