import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { Navbar } from "@components/Navbar";
import { Sidebar } from "@components/Sidebar";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@components/shadcn/Breadcrumb";

export default function App({ Component, pageProps }: AppProps) {
  const [openSideBar, setOpenSideBar] = useState(false);
  const router = useRouter(); // Gunakan useRouter untuk cek path

  // Halaman yang tidak memerlukan Navbar & Sidebar
  const hideLayout = ["/login", "/signup", "/cetak-struk"].includes(
    router.pathname
  );

  const segments = router.pathname.split("/").filter((segment) => segment);

  return (
    <>
      <Head>
        <title>Seven Dreams</title>
        <link
          rel="shortcut icon"
          href="/icon_seven_dreams.png"
          type="image/x-icon"
        />
      </Head>

      {/* Tampilkan Navbar & Sidebar hanya jika bukan di halaman login/signup */}
      {!hideLayout && (
        <>
          <Navbar openSide={openSideBar} setOpenSide={setOpenSideBar} />
          <Sidebar openSide={openSideBar} setOpenSide={setOpenSideBar} />

          {openSideBar && (
            <button
              onClick={() => setOpenSideBar(false)}
              className="bg-neutral-950/40 fixed animate-in inset-0 z-40"
            />
          )}
        </>
      )}

      <main
        className={`${
          openSideBar
            ? "mx-5"
            : !hideLayout
            ? "xl:ml-[300px] mx-5 xl:mr-[20px] mt-[120px]"
            : "mx-auto"
        } transition-all`}
      >
        {!hideLayout && (
          <div className="flex justify-between items-start">
            <h2 className="md:text-xl font-bold capitalize mb-6">
              {segments[segments.length - 1] || "Home"}
            </h2>

            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {segments.map((segment, index) => {
                  const href = "/" + segments.slice(0, index + 1).join("/");
                  const isLast = index === segments.length - 1;

                  return (
                    <div key={href} className="flex items-center gap-x-1.5">
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <span className="capitalize text-blue-700 font-bold">
                            {segment}
                          </span>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link href={href} className="capitalize">
                              {segment}
                            </Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </div>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        )}
        <Component {...pageProps} />
      </main>
    </>
  );
}
