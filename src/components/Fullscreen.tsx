import { useState, useEffect } from "react";

import { OutscreenIcon } from "./icons/OutscreenIcon";
import { ExpandIcon } from "./icons/ExpandIcon";

export function Fullscreen() {
  const [fullscreen, setIsFullscreen] = useState(false);

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
      {fullscreen === false ? (
        <button type="button" onClick={toggleFullscreen}>
          <ExpandIcon className="w-[18px] h-full fill-neutral-800" />
        </button>
      ) : (
        <button type="button" onClick={toggleFullscreen}>
          <OutscreenIcon className="w-[18px] h-full fill-neutral-800" />
        </button>
      )}
    </>
  );
}
