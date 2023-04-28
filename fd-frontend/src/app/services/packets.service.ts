import { Package, UserRef } from "@/context/store";
import axios, { AxiosResponse } from "axios";

export const getPacketById = async (_id: string): Promise<Package> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`https://backend-buhubxjtrq-ue.a.run.app/package/${_id}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAllPackages = async (): Promise<Package[]> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`https://backend-buhubxjtrq-ue.a.run.app/package/`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packets: Package[] = response.data;
    return packets;
  } catch (error: unknown) {
    throw error;
  }
};

export const createPackage = async (
  weight: number,
  client: UserRef,
  deliveryDate: string,
  quantity: number,
): Promise<Package> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.post(
      `https://backend-buhubxjtrq-ue.a.run.app/package/`,
      { weight, client: client.client, deliveryDate, quantity },
      { withCredentials: true, headers: { Authorization: idToken } },
    );
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};
