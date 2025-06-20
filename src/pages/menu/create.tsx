import { useEffect, useState } from "react";
import { FormEvent } from "react";
import { useRouter } from "next/router";
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
import { supabase } from "@utils/supabase";

import Swal from "sweetalert2";

interface DataCategoriProps {
  id: number;
  name: string;
}

export default function TambahMenu() {
  const [name, setName] = useState("");
  const [categoriID, setCategoriID] = useState("");
  const [hargaPokok, setHargaPokok] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [imagesUrll, setImagesUrl] = useState<File | null>(null);
  const [dataCategori, setDataCategori] = useState<DataCategoriProps[]>([]);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function fetchCategori() {
    const response = await fetch("/api/categori/getCategori");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    setDataCategori(data);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const fileName = `${Date.now()}${imagesUrll?.name}`;
      const filePath = `menu/${fileName}`;

      await supabase.storage
        .from("images_menu")
        .upload(filePath, imagesUrll as File);

      const { data: publicUrlData } = supabase.storage
        .from("images_menu")
        .getPublicUrl(filePath);

      const imageUrl = publicUrlData.publicUrl;

      await supabase.from("tbl_menu").insert({
        name,
        id_categori: parseFloat(categoriID),
        harga_pokok: parseFloat(hargaPokok),
        harga_jual: parseFloat(hargaJual),
        minimum_stock: 0,
        quantity_stock: 0,
        image_url: imageUrl,
      });

      setName("");
      setHargaPokok("");
      setHargaJual("");
    } finally {
      setImagesUrl(null);
      setLoading(false);

      Swal.fire({
        title: "Success",
        text: "Data successfully added!",
        icon: "success",
        confirmButtonColor: "#00879E",
        confirmButtonText: "Understand",
      }).then(() => {
        router.push("/menu");
      });
    }
  }

  useEffect(() => {
    fetchCategori();
  }, []);

  return (
    <>
      <section className="w-full p-8 bg-slate-50 rounded-md">
        <h2 className="text-lg font-bold">Tambah Menu</h2>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm ">Kategori Menu</Label>
              <Select onValueChange={(value) => setCategoriID(value)}>
                <SelectTrigger className="border outline-none focus:ring-0 focus:ring-offset-0 mt-2 text-sm duration-150">
                  <SelectValue placeholder="Pilih Kategori Makanan..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {dataCategori.map((categori, categoriIndex) => (
                      <SelectItem
                        value={`${categori.id}`}
                        key={categoriIndex + 1}
                      >
                        {categori.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm ">Nama Menu</Label>
              <Input
                type="text"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150"
                placeholder="Masukkan nama menu..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm ">Harga Pokok</Label>
              <Input
                type="number"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150"
                placeholder="Masukkan harga pokok menu..."
                value={hargaPokok}
                onChange={(e) => setHargaPokok(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm ">Harga Jual</Label>
              <Input
                type="number"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150"
                placeholder="Masukkan harga jual menu..."
                value={hargaJual}
                onChange={(e) => setHargaJual(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm ">Gambar Menu</Label>
              <Input
                type="file"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm"
                onChange={(e) => setImagesUrl(e.target.files?.[0] || null)}
                accept=".jpg,.jpeg,.png"
              />
            </div>
            <div>
              <Label className="text-sm ">Keterangan</Label>
              <Textarea
                cols={3}
                rows={5}
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150"
                placeholder="Masukkan keterangan menu.."
              />
            </div>
          </div>

          <div className="flex gap-x-2">
            <Button
              type="submit"
              variant="destructive"
              className="bg-green-700 hover:bg-green-600 duration-150 w-max text-neutral-50 text-xs lg:text-sm"
            >
              {loading === true ? "Loading..." : "Buat Menu Baru"}
            </Button>
            <Link href="/menu">
              <Button
                type="button"
                variant="destructive"
                className="bg-red-700 hover:bg-red-600 duration-150 w-max text-neutral-50 text-xs lg:text-sm"
              >
                Kembali
              </Button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}
