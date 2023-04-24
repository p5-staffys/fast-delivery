"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  user: Partial<User>;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
}

export interface RootObject {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  rating: number;
  forms: Form[];
  __v: number;
  packages: PackageRef[];
}

export interface PackageRef {
  _id: string;
  status: string;
  address: string;
  deliveryDate: Date;
}

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
}

export interface Form {
  bebidasAlcoholicas: boolean;
  medicamentosPsicoactivos: boolean;
  problemaEmocional: boolean;
  createdAt: string;
  updatedAt: string;
}

export const GlobalContext = createContext<ContextProps>({
  user: {},
  setUser: () => {},
});

export const useGlobalContext = (): ContextProps => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [user, setUser] = useState<Partial<User>>({});

  return <GlobalContext.Provider value={{ user, setUser }}>{children}</GlobalContext.Provider>;
};
