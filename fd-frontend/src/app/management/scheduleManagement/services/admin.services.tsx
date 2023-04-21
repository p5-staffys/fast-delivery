import axios, { AxiosResponse } from "axios";
export const GetAdmin = async (email: string, password: string): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/admin/signIn",
      { email, password },
      { withCredentials: true },
    );
    return response;
  } catch (error: unknown) {
    throw error;
  }
};

export interface Package {
  _id: string;
  status: string;
  weight: number;
  destination: string;
  client: {
    fullName: string;
    address: {
      street: string;
    };
  };
  deliveryDate: string;
  deliveredOn: string | null;
  deliveredBy: string | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

export const GetPackages = async (): Promise<Package[]> => {
  try {
    const allPackages = await axios.get("https://fd-backend-no-config-test-buhubxjtrq-uc.a.run.app/package", {
      withCredentials: true,
    });
    return allPackages.data as Package[];
  } catch (error: unknown) {
    throw error;
  }
};
