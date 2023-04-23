import { RootObject } from "@/context/store";
import axios from "axios";



export const GetUsers = async (email: string, password: string): Promise<RootObject> => {

  return axios
    .post(
      "https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/user/signIn",
      { email, password },
      { withCredentials: true },
    )
    .then(response => response.data)
    .then(data=> data)
    .catch(error=> error)
};
