import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./shadcn/Accordion";

import SevenDreamsImage from "@public/sevendreams-white.png";
import { CashierIcon } from "./icons/CashierIcon";
import { DollyFlatbedIcon } from "./icons/DollyFlatbedIcon";
import { FolderOpenIcon } from "./icons/FolderOpenIcon";
import { GridIcon } from "./icons/GridIcon";
import { UsersAltIcon } from "./icons/UsersAltIcon";

interface HamburgerProps {
  openSide: boolean;
}

export function Sidebar({ openSide = false }: HamburgerProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`${
        openSide ? "-left-[280px]" : "left-0"
      } bg-blue-600 fixed top-0 z-50 h-full w-[280px] transition-all`}
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
            "before:px-0 bg-neutral-200/50 before:w-1 before:h-full before:absolute before:bg-neutral-50"
          } relative`}
        >
          <Link
            href="/"
            className={`${
              pathname === "/" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-neutral-50`}
          >
            <GridIcon className="w-5 h-5 fill-neutral-50" />
            Dashboard
          </Link>
        </li>
        <li className="relative">
          <Accordion type="single" collapsible className="px-6 relative">
            <AccordionItem value="item-1" className="border-b-0 outline-none">
              <AccordionTrigger className="hover:no-underline justify-start py-3 gap-x-2 [&>svg]:fill-neutral-50 [&>svg.chevronIcon]:absolute [&>svg.chevronIcon]:right-5 [&[data-state='open']]:font-semibold [&[data-state='open']>.folderOpen]:fill-neutral-200 font-normal text-neutral-50">
                <FolderOpenIcon className="folderOpen w-5 h-5" />
                <span>Master Data</span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col ml-7 gap-y-3">
                <Link
                  href="/categori"
                  className={`${
                    pathname === "/categori" ? "font-semibold" : "font-normal"
                  } text-neutral-50`}
                >
                  Kategori
                </Link>
                <Link
                  href="/menu"
                  className={`${
                    pathname === "/menu" ? "font-semibold" : "font-normal"
                  } text-neutral-50`}
                >
                  Daftar Menu
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
        <li
          className={`${
            pathname === "/stock" &&
            "before:px-0 bg-neutral-200/50 before:w-1 before:h-full before:absolute before:bg-neutral-50"
          } relative`}
        >
          <Link
            href="/stock"
            className={`${
              pathname === "/stock" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-neutral-50`}
          >
            <DollyFlatbedIcon className="w-5 h-5 fill-neutral-50" />
            Stock
          </Link>
        </li>
        <li
          className={`${
            pathname === "/cashier" &&
            "before:px-0 bg-neutral-200/50 before:w-1 before:h-full before:absolute before:bg-neutral-50"
          } relative`}
        >
          <Link
            href="/cashier"
            className={`${
              pathname === "/cashier" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-neutral-50`}
          >
            <CashierIcon className="w-5 h-5 fill-neutral-50" />
            Kasir
          </Link>
        </li>
        <li className="relative">
          <Accordion type="single" collapsible className="px-6 relative">
            <AccordionItem value="item-1" className="border-b-0 outline-none">
              <AccordionTrigger className="hover:no-underline justify-start py-3 gap-x-2 [&>svg]:fill-neutral-50 [&>svg.chevronIcon]:absolute [&>svg.chevronIcon]:right-5 [&[data-state='open']]:font-semibold [&[data-state='open']>.folderOpen]:fill-neutral-200 font-normal text-neutral-50">
                <FolderOpenIcon className="folderOpen w-5 h-5" />
                <span>Laporan</span>
              </AccordionTrigger>
              <AccordionContent className="flex flex-col ml-7 gap-y-3">
                <Link
                  href=""
                  className={`${
                    pathname === "/transaksi" ? "font-semibold" : "font-normal"
                  } text-neutral-50`}
                >
                  Transaksi Penjualan
                </Link>
                <Link
                  href=""
                  className={`${
                    pathname === "/history-menu"
                      ? "font-semibold"
                      : "font-normal"
                  } text-neutral-50`}
                >
                  History Per Menu
                </Link>
                <Link
                  href=""
                  className={`${
                    pathname === "/cash-flow" ? "font-semibold" : "font-normal"
                  } text-neutral-50`}
                >
                  Cash Flow
                </Link>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </li>
        <li
          className={`${
            pathname === "/management-users" &&
            "before:px-0 bg-neutral-200/50 before:w-1 before:h-full before:absolute before:bg-neutral-50"
          } relative`}
        >
          <Link
            href="/management-users"
            className={`${
              pathname === "/management-users" ? "font-semibold" : "font-normal"
            } flex items-center gap-x-2 px-6 py-3 rounded-md text-neutral-50`}
          >
            <UsersAltIcon className="w-5 h-5 fill-neutral-50" />
            Management Users
          </Link>
        </li>
      </ul>
    </aside>
  );
}
