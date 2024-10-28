import "../styles/globals.css";
import type { AppProps } from "next/app";

import { useRef } from "react";

import Head from "next/head";

import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

export default function App({ Component, pageProps }: AppProps) {
  // var elem = document.documentElement;
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.mozRequestFullScreen) {
  //     /* Firefox */
  //     elem.mozRequestFullScreen();
  //   } else if (elem.webkitRequestFullscreen) {
  //     /* Chrome, Safari & Opera */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) {
  //     /* IE/Edge */
  //     elem.msRequestFullscreen();
  //   }
  //   document.getElementById("openfull").style.display = "none";
  //   document.getElementById("exitfull").style.display = "block";
  // }

  const elementRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (elementRef.current) {
      if (!document.fullscreenElement) {
        elementRef.current.requestFullscreen().catch((err) => {
          console.error(
            `Error attempting to enable fullscreen mode: ${err.message}`
          );
        });
      } else {
        document.exitFullscreen().catch((err) => {
          console.error(
            `Error attempting to exit fullscreen mode: ${err.message}`
          );
        });
      }
    }
  };
  return (
    <div ref={elementRef}>
      <Head>
        <title>Seven Dreams</title>
        <link
          rel="shortcut icon"
          href="/icon_seven_dreams.png"
          type="image/x-icon"
        />
      </Head>

      <div>
        <Navbar />
        <Sidebar />

        <Component {...pageProps} />
      </div>

      <button
        onClick={toggleFullscreen}
        className="absolute right-20 bottom-10"
      >
        Toggle
      </button>
    </div>
  );
}
