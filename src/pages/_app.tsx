import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useState } from "react";

import Head from "next/head";

import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <>
      <Head>
        <title>Seven Dreams</title>
        <link
          rel="shortcut icon"
          href="/icon_seven_dreams.png"
          type="image/x-icon"
        />
      </Head>

      <Navbar openSide={openSideBar} setOpenSide={setOpenSideBar} />
      <Sidebar openSide={openSideBar} />

      {openSideBar && (
        <button
          onClick={() => setOpenSideBar(false)}
          className={`bg-neutral-950/40 fixed animate-in inset-0 z-40`}
        />
      )}

      <main
        className={`${
          openSideBar ? "mx-5" : "lg:ml-[300px] mx-5 lg:mr-[20px]"
        } mt-[100px] transition-all`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
