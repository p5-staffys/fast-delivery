"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";

interface ContextProps {
  userId: string;
  setUserId: Dispatch<SetStateAction<string>>;
  data: RootObject[];
  setData: Dispatch<SetStateAction<RootObject[]>>;
}

interface RootObject {
  user: User;
  token: string;
}

interface User {
  _id: string;
  name: string;
  lastName: string;
  email: string;
  status: string;
  rating: number;
  //   forms: any[];
}

export const GlobalContext = createContext<ContextProps>({
  userId: "",
  setUserId: (): string => "",
  data: [],
  setData: (): RootObject[] => [],
});

export const useGlobalContext = (): ContextProps => useContext(GlobalContext);

export const GlobalContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<RootObject[]>([]);

  return <GlobalContext.Provider value={{ userId, setUserId, data, setData }}>{children}</GlobalContext.Provider>;
};
