import "alias/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppProps & AppPropsWithLayout): ReactNode {
  const getLayout = Component.getLayout ?? ((page: ReactElement): ReactElement => page);
  return getLayout(<Component {...pageProps} />);
}
