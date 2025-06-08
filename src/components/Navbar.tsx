import { Dispatch } from "react";
import Image from "next/image";
import Link from "next/link";
import { Karla } from "next/font/google";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./shadcn/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./shadcn/DropdownMenu";
import type { SetStateAction } from "react";

import { Fullscreen } from "./Fullscreen";
import { useWindowSize } from "@hooks/useWindowSize";
// import { supabase } from "@utils/supabase";

import SevenDreamsImage from "@public/sevendreams.png";
import { AngleSmallDownIcon } from "./icons/AngleSmallDownIcon";
import { HamburgerIcon } from "./icons/HamburgerIcon";
import { NotificationIcon } from "./icons/NotificationIcon";
import { PowerIcon } from "./icons/PowerIcon";
import { TimePastIcon } from "./icons/TimePastIcon";
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
  // const [user, setUser] = useState<AuthUsers | null>(null);
  const pathname = usePathname();
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

  // const handleLogout = async () => {
  //   localStorage.clear(); // Bersihkan semua data localStorage
  //   await supabase.auth.signOut();
  //   const { data: session } = await supabase.auth.getSession();
  //   console.log("Session after logout:", session); // Harus null
  //   router.push("/login");
  // };

  return (
    <>
      <header
        className={`${karla.className} antialiased w-full fixed top-0 bg-white h-20 items-center flex justify-between px-5 lg:px-10 z-50`}
      >
        {breakpoint < 1024 && (
          <button
            className="ml-5 lg:hidden"
            onClick={() => setOpenSide(!openSide)}
          >
            <HamburgerIcon className="w-3 h-3 fill-neutral-800" />
          </button>
        )}

        {breakpoint > 1024 && (
          <div>
            <Image
              src={SevenDreamsImage}
              alt="Seven Dream Icon"
              className="w-[150px]"
            />
          </div>
        )}

        {breakpoint > 1024 && (
          <div>
            <ul className="hidden lg:flex items-center lg:gap-x-6 xl:gap-x-8">
              <li>
                <Link
                  href="/"
                  className={`${karla.className} ${
                    pathname === "/" && "font-bold"
                  }`}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    Master Data
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white mt-2">
                    <DropdownMenuItem>
                      <Link href="/kategori">Data Kategori</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/menu/">Data Menu</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link href="/menu/stock">Stok</Link>
              </li>
              <li>
                <Link href="/kasir" className={`${karla.className}`}>
                  Kasir
                </Link>
              </li>
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger className="outline-none">
                    Laporan
                  </DropdownMenuTrigger>

                  <DropdownMenuContent className="bg-white mt-2">
                    <DropdownMenuItem>
                      <Link href="/laporan/">Transaksi Penjualan</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#">History Menu</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="#">Cash Flow</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
              <li>
                <Link href="/settings" className={`${karla.className}`}>
                  Pengaturan
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="flex items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="outline-none relative">
              <span className="w-2.5 h-2.5 block absolute rounded-full bg-red-500 right-0.5 " />
              <NotificationIcon className="w-5 fill-neutral-700" />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="bg-neutral-50 mt-6 shadow-md absolute sm:right-0 min-w-80 px-0"
              side="right"
            >
              <DropdownMenuLabel className="mb-1 text-base">
                Notifikasi
              </DropdownMenuLabel>
              <DropdownMenuItem className="py-0.5 px-0">
                <Link
                  href=""
                  className="text-base flex items-start gap-2 text-neutral-700 px-3 justify-between group py-2 hover:bg-neutral-200/50 transition-colors w-full"
                >
                  <div className=" flex flex-col gap-y-2">
                    <h5 className="text-sm">Management Users - Anshari</h5>
                    <h3>Menambahkan data user baru</h3>
                  </div>
                  <span className="text-sm font-bold">3 menit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="border-t" />
              <DropdownMenuItem className="text-base py-2">
                <Link href="" className="flex justify-center w-full">
                  View All
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <button type="button" onClick={() => router.refresh()}>
            <TimePastIcon className="w-5 h-5 fill-neutral-700" />
          </button>
          <Fullscreen />
          <DropdownMenu>
            <DropdownMenuTrigger className="relative w-auto z-[52] flex items-start h-auto gap-x-3 px-0 outline-none group">
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
              <AngleSmallDownIcon className="w-5 mt-1.5 transition-transform fill-neutral-600 group-data-[state=open]:rotate-180" />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-neutral-50 mt-3 shadow-md min-w-40">
              <DropdownMenuLabel className="mb-1 text-base">
                Pengaturan
              </DropdownMenuLabel>
              <DropdownMenuItem className="py-0.5">
                <Link
                  href=""
                  className="text-base flex items-center gap-2 text-neutral-700 group"
                >
                  <UserGearIcon className="w-4 h-4 fill-neutral-600 group-hover:fill-neutral-950 transition-colors" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-base flex items-center w-full text-neutral-700 py-0.5">
                <Button
                  variant="ghost"
                  className="justify-start focus-visible:ring-0 ring-0 ring-offset-0 focus-visible:ring-offset-0 p-0 group"
                >
                  <PowerIcon className="w-4 h-4 fill-neutral-600 group-hover:fill-neutral-950 transition-colors" />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
}
