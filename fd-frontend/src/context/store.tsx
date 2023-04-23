"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  data: RootObject;
  setData: Dispatch<SetStateAction<RootObject>>;
}

export interface RootObject {
  user?: User;
  token?: string;
}

interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  rating: number;
  forms: Package[];
  __v: number;
  packages: Package[];
}

export interface Package {
  _id: string;
  status: string;
  address: string;
  deliveryDate: string;
}

export const GlobalContext = createContext<ContextProps>({
  data: {},
  setData: () => {
    // do nothing.
  },
});

export const useGlobalContext = (): ContextProps => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [data, setData] = useState<RootObject>({});

  return <GlobalContext.Provider value={{ data, setData }}>{children}</GlobalContext.Provider>;
};
