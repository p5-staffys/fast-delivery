import axios, { AxiosResponse } from "axios";
import { Client, Package, PackageCreate } from "../../utils/interfaces/package.interfaces";

const googleMapsApiKey: string = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";
const path = process.env.NEXT_PUBLIC_PATH_TO_BACK || "";

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

export const deletePackage = async (_id: string): Promise<string> => {
  try {
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.delete(`${path}/package/${_id}`, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packet: string = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};
