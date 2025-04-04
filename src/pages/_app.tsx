import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const router = useRouter(); // Gunakan useRouter untuk cek path

  // Halaman yang tidak memerlukan Navbar & Sidebar
  const hideLayout = ["/login", "/signup", "/cetak-struk"].includes(
    router.pathname
  );

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

      {/* Tampilkan Navbar & Sidebar hanya jika bukan di halaman login/signup */}
      {!hideLayout && (
        <>
          <Navbar openSide={openSideBar} setOpenSide={setOpenSideBar} />
          <Sidebar openSide={openSideBar} setOpenSide={setOpenSideBar} />

          {openSideBar && (
            <button
              onClick={() => setOpenSideBar(false)}
              className="bg-neutral-950/40 fixed animate-in inset-0 z-40"
            />
          )}
        </>
      )}

      <main
        className={`${
          openSideBar
            ? "mx-5"
            : !hideLayout
            ? "xl:ml-[300px] mx-5 xl:mr-[20px] mt-[100px]"
            : "mx-auto"
        } transition-all`}
      >
        <Component {...pageProps} />
      </main>
    </>
  );
}
