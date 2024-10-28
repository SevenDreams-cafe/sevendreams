import { useRef } from "react";

export function Fullscreen() {
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
    <div ref={elementRef} className="absolute right-20">
      <button onClick={toggleFullscreen}>Toggle Fullscreen</button>
      <p>This content can go fullscreen.</p>
    </div>
  );
}
