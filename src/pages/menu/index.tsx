import Image from "next/image";
import Link from "next/link";

import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@components/shadcn/Table";

import { dataMenu } from "@datas/dataMenu";

import { SearchIcon } from "@components/icons/SearchIcon";

export default function DaftarMenu() {
  return (
    <>
      <main className="ml-[300px] mr-[20px] mt-[100px]">
        <section className="w-full p-8 bg-white rounded-md">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-neutral-200 bg-neutral-50 w-full pl-8"
                placeholder="Search..."
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-neutral-700" />
            </div>

            <Link
              href="menu/create"
              className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 py-2.5 px-4 text-sm rounded-md"
            >
              Buat Menu Baru
            </Link>
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">#</TableHead>
                  <TableHead className="w-[80px] text-center">Gambar</TableHead>
                  <TableHead className="w-[80px] text-center">
                    Kode Menu
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Nama Menu
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Kategori
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Harga Pokok
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Harga Jual
                  </TableHead>
                  <TableHead className="w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {dataMenu.map((menu, menuIndex) => (
                  <TableRow
                    key={`${menu.id}${menuIndex + 1}`}
                    tabIndex={menuIndex}
                  >
                    <TableCell>{menuIndex + 1}</TableCell>
                    <TableCell className="">
                      <div className="relative w-16 h-16 mx-auto">
                        <Image
                          src="/images/menu/bakso.jpg"
                          alt="Bakso"
                          className="object-cover"
                          fill
                        />
                      </div>
                    </TableCell>
                    <TableCell>P0001</TableCell>
                    <TableCell className="capitalize">{menu.name}</TableCell>
                    <TableCell>Nasi</TableCell>
                    <TableCell>Rp. {menu.hargaPokok}</TableCell>
                    <TableCell>Rp. {menu.hargaJual}</TableCell>
                    <TableCell className="text-center">
                      <Link href={`/menu/edit?id=${menu.id}`}>
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-auto bg-yellow-400 text-neutral-950 px-3 py-1.5 h-auto rounded-md"
                        >
                          Edit
                        </Button>
                      </Link>
                      <span className="px-1.5">||</span>
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto inline-block bg-red-500 text-neutral-50 px-3 py-1.5 h-auto rounded-md"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </main>
    </>
  );
}
