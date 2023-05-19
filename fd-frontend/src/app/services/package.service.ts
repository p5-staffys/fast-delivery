import axios, { AxiosResponse } from "axios";
import { Client, IPackagesByClient, Package, PackageCreate } from "../../utils/interfaces/package.interfaces";
import { User } from "@/utils/interfaces/user.interfaces";

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const path = process.env.NEXT_PUBLIC_PATH_TO_BACK || "https://backend-buhubxjtrq-ue.a.run.app";

export const getPackageById = async (_id: string): Promise<Package> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/package/${_id}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAllPackages = async (date: string): Promise<Package[]> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/package?date=${date}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packets: Package[] = response.data;
    return packets;
  } catch (error: unknown) {
    throw error;
  }
};

export const getAllPackagesPending = async (date: string): Promise<Package[]> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/package/pending/${date}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packets: Package[] = response.data;
    return packets;
  } catch (error: unknown) {
    throw error;
  }
};

export const assignPackages = async (packagesIds: string[]): Promise<User> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.put(`${path}/user/package/assign`, packagesIds, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};

export const createPackage = async (
  weight: number,
  fullName: string,
  number: string,
  street: string,
  city: string,
  state: string,
  country: string,
  deliveryDate: string,
  quantity: number,
): Promise<Package> => {
  try {
    const urlNumber = number.trim().replace(/\s+/g, "+");
    const urlStreet = street.trim().replace(/\s+/g, "+");
    const urlCity = city.trim().replace(/\s+/g, "+");
    const urlState = state.trim().replace(/\s+/g, "+");
    const urlCountry = country.trim().replace(/\s+/g, "+");

    const addressString = `${urlStreet},+${urlNumber},+${urlCity},+${urlState}+province,+${urlCountry}`;
    const geocode: AxiosResponse = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${googleMapsApiKey}`,
    );
    const latlng: google.maps.LatLngLiteral = geocode.data.results[0].geometry.location;
    const client: Client = { fullName, address: { number, street, city, state, country }, latlng };
    const newPackage: PackageCreate = {
      weight,
      client,
      deliveryDate,
    };

    const arrPackage: PackageCreate[] = Array.from({ length: quantity }, () => ({ ...newPackage }));

    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.post(`${path}/admin/package/`, arrPackage, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};

export const getPendingPackages = async (date: string, page: number): Promise<IPackagesByClient[]> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.get(`${path}/package/pending/${date}?page=${page}&limit=3`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    return response.data;
  } catch (error: unknown) {
    throw error;
  }
};
