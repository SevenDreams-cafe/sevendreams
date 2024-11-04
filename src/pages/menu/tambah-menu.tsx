import Link from "next/link";

import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "@components/shadcn/Label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadcn/Select";
import { Textarea } from "@components/shadcn/Textarea";

export default function TambahMenu() {
  return (
    <main className="ml-[300px] mr-[20px] mt-[100px] shadow">
      <section className="w-full p-8 bg-white rounded-md">
        <h2 className="text-lg font-bold">Tambah Menu</h2>

        <form className="mt-4 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm text-neutral-600">Kategori Menu</Label>
              <Select>
                <SelectTrigger className="border outline-none focus:ring-0 focus:ring-offset-0 mt-2 text-sm focus:border-blue-500 duration-150 text-neutral-600">
                  <SelectValue placeholder="Pilih Kategori Makanan..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    <SelectItem value="pedas">Makanan Pedas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Nama Menu</Label>
              <Input
                type="text"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan nama menu..."
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Harga Pokok</Label>
              <Input
                type="number"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan harga pokok menu..."
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Harga Jual</Label>
              <Input
                type="number"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan harga jual menu..."
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm text-neutral-600">Stok Menu</Label>
              <Input
                type="number"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan jumlah stok menu..."
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Gambar Menu</Label>
              <Input
                type="file"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Keterangan</Label>
              <Textarea
                cols={3}
                rows={5}
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan keterangan menu.."
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <Button
              type="button"
              variant="destructive"
              className="bg-green-700 hover:bg-green-600 duration-150 w-max text-neutral-50"
            >
              Buat Menu Baru
            </Button>
            <Link href="/menu">
              <Button
                type="button"
                variant="destructive"
                className="bg-red-700 hover:bg-red-600 duration-150 w-max text-neutral-50"
              >
                Kembali
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}