import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect, useState } from "react";

import Head from "next/head";

import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  // var elem = document.documentElement;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation) {
          await screen.orientation.lock("landscape");
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        if (screen.orientation) {
          screen.orientation.unlock();
        }
      }
    } catch (error) {
      console.error("Gagal mengubah ke mode fullscreen landscape:", error);
    }
  }

  useEffect(() => {
    const onFullscreenChange = () =>
      setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);
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

      <main
        className={`${
          openSideBar ? "mx-5" : "ml-[300px] mr-[20px]"
        } mt-[100px] transition-all`}
      >
        <Component {...pageProps} />
      </main>

      {isFullscreen === false && (
        <button
          type="button"
          onClick={toggleFullscreen}
          className="fixed right-20 bottom-10 "
        >
          Toggle
        </button>
      )}
    </>
  );
}
