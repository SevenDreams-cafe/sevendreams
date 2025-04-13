import { Karla } from "next/font/google";
import { Dispatch, useEffect, useState, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "./shadcn/Button";

import { Fullscreen } from "./Fullscreen";

import { useWindowSize } from "@hooks/useWindowSize";
import { supabase } from "@utils/supabase";
import type { AuthUsers } from "@type/AuthUser";

import { AngleSmallDownIcon } from "./icons/AngleSmallDownIcon";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { TimePastIcon } from "./shadcn/TimePastIcon";
import { PowerIcon } from "./icons/PowerIcon";
import { UserGearIcon } from "./icons/UserGearIcon";

export const karla = Karla({
  subsets: ["latin"],
});

interface HamburgerProps {
  openSide: boolean;
  setOpenSide: Dispatch<SetStateAction<boolean>>;
}

export function Navbar({ openSide = false, setOpenSide }: HamburgerProps) {
  const breakpoint = useWindowSize();
  const [user, setUser] = useState<AuthUsers | null>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const router = useRouter();

  // async function checkUser() {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   if (!session) {
  //     router.push("/login"); // Redirect ke halaman login jika tidak ada session
  //   } else {
  //     setUser({ id: session.user.id, email: session.user.email ?? "" });
  //   }
  // }

  // useEffect(() => {
  //   checkUser();
  // }, []);

  const handleLogout = async () => {
    localStorage.clear(); // Bersihkan semua data localStorage
    await supabase.auth.signOut();
    const { data: session } = await supabase.auth.getSession();
    console.log("Session after logout:", session); // Harus null
    router.push("/login");
  };

  return (
    <>
      <header
        className={`${karla.className} antialiased w-full fixed top-0 bg-neutral-50 h-20 items-center flex justify-between xl:justify-end pr-10 z-50`}
      >
        {breakpoint < 1280 && (
          <button className="ml-5" onClick={() => setOpenSide(!openSide)}>
            <HamburgerIcon className="w-3 h-3 fill-neutral-800" />
          </button>
        )}

        <div className="flex items-center gap-x-4">
          <button type="button" onClick={() => router.refresh()}>
            <TimePastIcon className="w-5 h-5 fill-neutral-600" />
          </button>
          <Fullscreen />
          <div className="relative w-auto z-[52]">
            <Button
              type="button"
              className="flex items-start h-auto gap-x-3 px-0"
              onClick={() => setOpenDropdown(!openDropdown)}
            >
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
                  <h5 className="font-semibold text-base">
                    {/* {String(user?.email).length > 20
                      ? user?.email.substring(0, 15) + "..."
                      : user?.email} */}
                    Wahyudi Umar
                  </h5>
                  <h6 className="font-normal text-sm -mt-0.5">Administrator</h6>
                </div>
              </div>
              <AngleSmallDownIcon
                className={`w-5 mt-1.5 transition-transform fill-neutral-600 ${
                  !openDropdown ? "rotate-0" : "-rotate-180"
                }`}
              />
            </Button>
            {openDropdown && (
              <div className="min-h-20 p-4 absolute left-0 mt-5 w-full text-start rounded-md bg-neutral-50 flex flex-col gap-y-3 animate-dropdowns">
                <button
                  type="button"
                  className="text-sm flex items-center gap-x-2 w-full text-neutral-700 group"
                >
                  <UserGearIcon className="w-4 h-4 fill-neutral-600 group-hover:fill-neutral-950 transition-colors" />
                  Profile
                </button>
                <button
                  type="button"
                  className="text-sm flex items-center gap-x-2 w-full text-neutral-700 group"
                  onClick={handleLogout}
                >
                  <PowerIcon className="w-4 h-4 fill-neutral-600 group-hover:fill-neutral-950 transition-colors" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {openDropdown && (
        <button
          className="fixed inset-0 z-40"
          onClick={() => setOpenDropdown(false)}
        />
      )}
    </>
  );
}
