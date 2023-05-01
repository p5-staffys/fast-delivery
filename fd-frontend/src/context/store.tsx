"use client";

import React, { createContext, useContext, Dispatch, SetStateAction, useState } from "react";
import { User } from "@/utils/interfaces/user.interfaces";

interface ContextProps {
  user: Partial<User>;
  setUser: Dispatch<SetStateAction<Partial<User>>>;
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
