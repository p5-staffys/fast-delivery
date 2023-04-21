import axios, { AxiosResponse } from "axios";
export const GetAdmin = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    const response = axios.post(
      "https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/admin/signIn",
      { email, password },
      { withCredentials: true },
    );
    return response;
  } catch (error: unknown) {
    throw error;
  }
};
