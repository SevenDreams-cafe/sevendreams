import { ComponentPropsWithRef } from "react";

export function ReportFolderIcon({
  className = "",
}: ComponentPropsWithRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      id="Layer_1"
      x="0px"
      y="0px"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M24,20c0,1.7-1.3,3-3,3v1h-2v-1c-1.7,0-3-1.3-3-3h2c0,0.6,0.4,1,1,1h2c0.6,0,1-0.4,1-1c0-0.4-0.3-0.7-0.6-0.8l-3-0.5  C17,18.5,16,17.4,16,16c0-1.7,1.3-3,3-3v-1h2v1c1.7,0,3,1.3,3,3h-2c0-0.6-0.4-1-1-1h-2c-0.6,0-1,0.4-1,1c0,0.4,0.3,0.7,0.6,0.8  l3,0.5C23,17.5,24,18.6,24,20z M14,20v-4c0-2,1.2-3.8,3-4.6l1-0.3V2h-5.2c-0.4-1.2-1.5-2-2.8-2H8C6.7,0,5.6,0.8,5.2,2H0v19  c0,1.7,1.3,3,3,3h12c0.3,0,0.6-0.1,0.8-0.1C14.7,22.9,14,21.6,14,20z M7.2,16.5C6.9,16.8,6.5,17,6.1,17s-0.8-0.2-1.1-0.5l-1.6-1.6  l1.4-1.4l1.4,1.4l2.5-2.5l1.4,1.4C10,13.7,7.2,16.5,7.2,16.5z M7.2,10.5C6.9,10.8,6.5,11,6.1,11s-0.8-0.2-1.1-0.5L3.3,8.9l1.4-1.4  l1.4,1.4l2.5-2.5L10,7.7C10,7.7,7.2,10.5,7.2,10.5z" />
    </svg>
  );
}
