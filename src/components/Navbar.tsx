import Image from "next/image";
import { Karla } from "next/font/google";

import { AngleSmallDownIcon } from "./icons/AngleSmallDownIcon";

export const karla = Karla({
  subsets: ["latin"],
});

export function Navbar() {
  return (
    <header
      className={`${karla.className} antialiased w-full fixed top-0 bg-white h-20 items-center flex justify-end px-10`}
    >
      <button type="button" className="flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          <div className="relative w-10 h-10">
            <Image
              src="/images/avatar/anshari.jpg"
              alt="Anshari Avatar"
              className="object-cover rounded-full"
              fill
            />
          </div>
          <div className="text-start">
            <h5 className="font-semibold text-base">Anshari</h5>
            <h6 className="font-normal text-sm -mt-0.5">Administrator</h6>
          </div>
        </div>
        <AngleSmallDownIcon className="w-5" />
      </button>
    </header>
  );
}
