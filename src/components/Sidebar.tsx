import { Dispatch, useEffect, useState, type SetStateAction } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/Accordion";

import { supabase } from "@utils/supabase";

import SevenDreamsImage from "@public/sevendreams-white.png";
import { CashierIcon } from "./icons/CashierIcon";
import { DollyFlatbedIcon } from "./icons/DollyFlatbedIcon";
import { FolderOpenIcon } from "./icons/FolderOpenIcon";
import { GridIcon } from "./icons/GridIcon";
import { ReportFolderIcon } from "./icons/ReportFolderIcon";
import { SettingsIcon } from "./icons/SettingsIcon";
import { UsersAltIcon } from "./icons/UsersAltIcon";

interface HamburgerProps {
  openSide: boolean;
  setOpenSide: Dispatch<SetStateAction<boolean>>;
}

export function Sidebar({ openSide = false, setOpenSide }: HamburgerProps) {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserRole() {
      const { data: sessionData } = await supabase.auth.getSession();

      if (sessionData?.session?.user) {
        const userId = sessionData.session.user.id;
        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", userId)
          .single();

        if (!error && data) {
          setRole(data.role);
        }
      }
    }

    fetchUserRole();
  }, []);

  return (
    <aside
      className={`${
        openSide ? "left-0 xl:-left-[280px]" : "-left-[280px] xl:left-0"
      } bg-slate-900 fixed top-0 z-50 h-full w-[280px] transition-all overflow-y-auto text-sm lg:text-base`}
    >
      <div className="mx-5 mt-5">
        <Image
          src={SevenDreamsImage}
          alt="7 Dreams"
          className="w-36 object-contain"
        />
      </div>

      <ul className="mt-12">
        <li
          className={`${
            pathname === "/" &&
            "before:px-0 bg-slate-500/50 before:w-1 before:h-full before:absolute before:bg-slate-500"
          } relative`}
        >
          <Link
            onClick={() => setOpenSide(false)}
            href="/"
            className={`${
              pathname === "/" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-slate-200`}
          >
            <GridIcon className="w-5 h-5 fill-slate-200" />
            Dashboard
          </Link>
        </li>
        <Accordion type="single" collapsible className="px-6 relative">
          <li rel="Master Data">
            <AccordionItem
              value="master-data"
              className="border-b-0 outline-none"
            >
              <AccordionTrigger className="hover:no-underline justify-start py-3 gap-x-2 [&>svg]:fill-slate-200 [&>svg.chevronIcon]:absolute [&>svg.chevronIcon]:right-5 [&[data-state='open']]:font-semibold [&[data-state='open']>.folderOpen]:fill-neutral-200 font-normal text-slate-200">
                <FolderOpenIcon className="folderOpen w-5 h-5" />
                <span>Master Data</span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col ml-7 gap-y-3">
                <Link
                  onClick={() => setOpenSide(false)}
                  href="/kategori"
                  className={`${
                    pathname === "/kategori" ? "font-semibold" : "font-normal"
                  } text-slate-200`}
                >
                  Kategori
                </Link>
                <Link
                  onClick={() => setOpenSide(false)}
                  href="/menu"
                  className={`${
                    pathname === "/menu" ? "font-semibold" : "font-normal"
                  } text-slate-200`}
                >
                  Daftar Menu
                </Link>
              </AccordionContent>
            </AccordionItem>
          </li>
          <li rel="Report Collapse">
            <AccordionItem value="report" className="border-b-0 outline-none">
              <AccordionTrigger className="hover:no-underline justify-start py-3 gap-x-2 [&>svg]:fill-slate-200 [&>svg.chevronIcon]:absolute [&>svg.chevronIcon]:right-5 [&[data-state='open']]:font-semibold [&[data-state='open']>.folderOpen]:fill-neutral-200 font-normal text-slate-200">
                <ReportFolderIcon className="folderOpen w-5 h-5" />
                <span>Laporan</span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col ml-7 gap-y-3">
                <Link
                  onClick={() => setOpenSide(false)}
                  href=""
                  className={`${
                    pathname === "/transaksi" ? "font-semibold" : "font-normal"
                  } text-slate-200`}
                >
                  Transaksi Penjualan
                </Link>
                <Link
                  onClick={() => setOpenSide(false)}
                  href=""
                  className={`${
                    pathname === "/history-menu"
                      ? "font-semibold"
                      : "font-normal"
                  } text-slate-200`}
                >
                  History Per Menu
                </Link>
                <Link
                  onClick={() => setOpenSide(false)}
                  href=""
                  className={`${
                    pathname === "/cash-flow" ? "font-semibold" : "font-normal"
                  } text-slate-200`}
                >
                  Cash Flow
                </Link>
              </AccordionContent>
            </AccordionItem>
          </li>
        </Accordion>
        <li
          className={`${
            pathname === "/menu/stock" &&
            "before:px-0 bg-slate-500/50 before:w-1 before:h-full before:absolute before:bg-slate-500"
          } relative`}
        >
          <Link
            onClick={() => setOpenSide(false)}
            href="/menu/stock"
            className={`${
              pathname === "/menu/stock" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-slate-200`}
          >
            <DollyFlatbedIcon className="w-5 h-5 fill-slate-200" />
            Stock
          </Link>
        </li>
        <li
          className={`${
            pathname === "/kasir" &&
            "before:px-0 bg-slate-500/50 before:w-1 before:h-full before:absolute before:bg-slate-500"
          } relative`}
        >
          <Link
            onClick={() => setOpenSide(false)}
            href="/kasir"
            className={`${
              pathname === "/kasir" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-slate-200`}
          >
            <CashierIcon className="w-5 h-5 fill-slate-200" />
            Kasir
          </Link>
        </li>
        <li
          className={`${
            pathname === "/settings" &&
            "before:px-0 bg-slate-500/50 before:w-1 before:h-full before:absolute before:bg-slate-500"
          } relative`}
        >
          <Link
            onClick={() => setOpenSide(false)}
            href="/settings"
            className={`${
              pathname === "/settings" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-slate-200`}
          >
            <SettingsIcon className="w-5 h-5 fill-slate-200" />
            Settings
          </Link>
        </li>
        {role === "users" && (
          <li
            className={`${
              pathname === "/management-users" &&
              "before:px-0 bg-slate-500/50 before:w-1 before:h-full before:absolute before:bg-slate-500"
            } relative`}
          >
            <Link
              onClick={() => setOpenSide(false)}
              href="/management-users"
              className={`${
                pathname === "/management-users"
                  ? "font-semibold"
                  : "font-normal"
              } flex items-center gap-x-2 px-6 py-3 rounded-md text-slate-200`}
            >
              <UsersAltIcon className="w-5 h-5 fill-slate-200" />
              Management Users
            </Link>
          </li>
        )}
      </ul>
    </aside>
  );
}
