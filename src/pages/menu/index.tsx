import { useState } from "react";
import Image from "next/image";

import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/shadcn/Dialog";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@components/shadcn/Table";

import { dataCategori } from "@datas/dataCategori";

import { SearchIcon } from "@components/icons/SearchIcon";

export default function DaftarMenu() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editData, setEditData] = useState({ id: 0, name: "" });

  function handleEdit(id: number, name: string) {
    setEditData({ id, name });
    setEditOpen(true);
  }

  function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEditData({ ...editData, name: e.target.value });
  }

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

            <Button
              type="button"
              variant="secondary"
              className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50"
              onClick={() => setAddOpen(true)}
            >
              Buat Menu Baru
            </Button>
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
                {dataCategori.map((categori, categoriIndex) => (
                  <TableRow
                    key={`${categori.id}${categoriIndex + 1}`}
                    tabIndex={categoriIndex}
                  >
                    <TableCell>{categoriIndex + 1}</TableCell>
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
                    <TableCell>{categori.name}</TableCell>
                    <TableCell>Rp. 20.000,00</TableCell>
                    <TableCell>Rp. 50.000,00</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto bg-yellow-400 text-neutral-950 px-3 py-1.5 h-auto rounded-md"
                        onClick={() => handleEdit(categori.id, categori.name)}
                      >
                        Edit
                      </Button>
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

      {/* Modal Tambah Kategori */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-neutral-50">
          <DialogHeader>
            <DialogTitle>Buat Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <form className="flex flex-col gap-y-4">
              <Input placeholder="Masukkan nama kategori..." />
              <div className="flex justify-end gap-x-3 items-center">
                <DialogClose
                  type="button"
                  className="border border-red-600 bg-red-600 hover:bg-red-500 text-neutral-50 w-min py-2 px-4 text-sm rounded-md"
                >
                  Closed
                </DialogClose>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 w-min py-2"
                >
                  Buat Kategori Baru
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Edit Kategori */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-neutral-50">
          <DialogHeader>
            <DialogTitle>Edit Kategori</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <form className="flex flex-col gap-y-4">
              <Input
                onChange={handleEditChange}
                value={editData.name}
                placeholder="Masukkan nama kategori..."
              />
              <div className="flex justify-end gap-x-3 items-center">
                <DialogClose
                  type="button"
                  className="border border-red-600 bg-red-600 hover:bg-red-500 text-neutral-50 w-min py-2 px-4 text-sm rounded-md"
                >
                  Closed
                </DialogClose>
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 w-min py-2"
                >
                  Simpan Perubahan
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* <Fullscreen /> */}
    </>
  );
}
