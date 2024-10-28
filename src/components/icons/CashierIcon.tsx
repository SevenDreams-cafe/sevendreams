import { ComponentPropsWithRef } from "react";

export function CashierIcon({ className = "" }: ComponentPropsWithRef<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Layer_1"
      data-name="Layer 1"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M21,10H7V6h5V3c0-1.654-1.346-3-3-3H3C1.346,0,0,1.346,0,3v3H5v4H3c-1.654,0-3,1.346-3,3v6H24v-6c0-1.654-1.346-3-3-3Zm-15,6c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm4,0c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm4,0c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1Zm4,0c-.552,0-1-.448-1-1s.448-1,1-1,1,.448,1,1-.448,1-1,1ZM0,21H24v3H0v-3Z" />
    </svg>
  );
}