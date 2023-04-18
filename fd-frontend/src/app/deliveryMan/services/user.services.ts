import axios, { AxiosResponse } from "axios";

export const GetUsers = async (email: string, password: string): Promise<AxiosResponse> => {
  return axios
    .post(
      "https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/user/signIn",
      { email, password },
      { withCredentials: true },
    )
    .then((response) => {
      return response;
    });
};
