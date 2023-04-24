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
  packages: Package[];
}

export interface Package {
  _id: string;
  status: string;
  address: string;
  deliveryDate: string;
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
