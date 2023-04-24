import { Package } from "@/context/store";
import axios, { AxiosResponse } from "axios";

export const getPacketById = async (_id: string): Promise<Package> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(
      `https://fd-backend-no-cookie-buhubxjtrq-uw.a.run.app/package/${_id}`,
      { withCredentials: true, headers: { Authorization: idToken } },
    );
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};
