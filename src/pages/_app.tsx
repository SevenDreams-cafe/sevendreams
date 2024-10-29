import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useEffect, useRef, useState } from "react";

import Head from "next/head";

import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  // var elem = document.documentElement;
  const [isFullscreen, setIsFullscreen] = useState(false);

  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        if (screen.orientation && (screen.orientation as any).lock) {
          await (screen.orientation as any).lock("landscape");
        }
      } else if (document.exitFullscreen) {
        await document.exitFullscreen();
        if (screen.orientation && (screen.orientation as any).unlock) {
          await (screen.orientation as any).unlock();
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

      <Navbar />
      <Sidebar />

      {isFullscreen === false && (
        <button
          onClick={toggleFullscreen}
          className="absolute right-20 bottom-10 "
        >
          Toggle
        </button>
      )}
      <Component {...pageProps} />
    </>
  );
}
