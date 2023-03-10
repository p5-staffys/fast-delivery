import Head from "next/head";
import React from "react";
import logo from "../../public/favicon.ico"

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Fast Delivery</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href={logo.src} />
        
      </Head>
      <main>{children}</main>
    </>
  );
};
