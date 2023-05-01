import axios, { AxiosResponse } from "axios";
import { Client, Package, PackageCreate } from "@/utils/interfaces/package.interfaces";

export const getPackageById = async (_id: string): Promise<Package> => {
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
      `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=AIzaSyCfFOABtRpwkquUomSFilfx41tMw1wRL84`,
    );
    const latlng: google.maps.LatLngLiteral = geocode.data.results[0].geometry.location;
    const client: Client = { fullName, address: { number, street, city, state, country }, latlng };
    const newPackage: PackageCreate = {
      weight,
      client,
      deliveryDate,
      quantity,
    };
    const idToken = localStorage.getItem("idToken");
    const response: AxiosResponse = await axios.post("https://backend-buhubxjtrq-ue.a.run.app/package/", newPackage, {
      withCredentials: true,
      headers: { Authorization: idToken },
    });
    const packet: Package = response.data;
    return packet;
  } catch (error: unknown) {
    throw error;
  }
};
