import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { supabase } from "@utils/supabase";

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

interface CategoriProps {
  id: number;
  name: string;
}

interface MenuProps {
  id: number;
  name: string;
  harga_pokok: number;
  harga_jual: number;
  image_url: string;
  tbl_categori: CategoriProps;
}

export default function EditMenu() {
  const router = useRouter();
  const { id } = router.query;
  const [dataMenu, setDataMenu] = useState<MenuProps | null>(null);
  const [dataCategori, setDataCategori] = useState<CategoriProps[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!router.isReady || !id) return;

    async function fetchDataMenu() {
      try {
        const response = await fetch(`/api/menu/getEdit?id=${id}`);
        if (!response.ok) throw new Error("Gagal mengambil data menu");
        const data = await response.json();
        setDataMenu(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    async function fetchDataCategori() {
      try {
        const response = await fetch(`/api/categori/getCategori`);
        if (!response.ok) throw new Error("Gagal mengambil kategori");
        const data = await response.json();
        setDataCategori(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchDataMenu();
    fetchDataCategori();
  }, [router.isReady, id]);

  function handleChangeCategori(value: string) {
    const selectedCategory = dataCategori.find(
      (cat) => cat.id === parseInt(value)
    );
    if (selectedCategory) {
      setDataMenu((prev) =>
        prev
          ? {
              ...prev,
              tbl_categori: selectedCategory,
            }
          : null
      );
    }
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setDataMenu((prev) => (prev ? { ...prev, [name]: value } : null));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = dataMenu?.image_url;

    if (selectedFile) {
      const fileExt = selectedFile.name.split(".").pop();
      const filePath = `menu/${id}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images_menu")
        .upload(filePath, selectedFile, { upsert: true });

      if (uploadError) {
        console.error("Error uploading file:", uploadError);
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("images_menu")
        .getPublicUrl(filePath);
      imageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("tbl_menu")
      .update({
        name: dataMenu?.name,
        harga_pokok: dataMenu?.harga_pokok,
        harga_jual: dataMenu?.harga_jual,
        image_url: imageUrl,
        id_categori: dataMenu?.tbl_categori.id || null, // Tambahkan id_categori
      })
      .eq("id", id);

    if (error) {
      console.error("Error updating menu:", error);
    } else {
      alert("Menu berhasil diperbarui!");
      router.push("/menu");
    }
    setLoading(false);
  }

  return (
    <section className="w-full p-8 bg-slate-900 text-slate-200 rounded-md mb-4">
      <h2 className="text-lg font-bold">Edit Menu</h2>
      <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-6">
        <div className="flex flex-col gap-y-4">
          {/* Pilih Kategori */}
          <div>
            <Label className="text-sm text-slate-200">Kategori Menu</Label>
            <Select
              name="tbl_categori"
              value={dataMenu?.tbl_categori?.id?.toString() || ""}
              onValueChange={handleChangeCategori}
            >
              <SelectTrigger className="border outline-none focus:ring-0 focus:ring-offset-0 mt-2 text-sm duration-150 bg-slate-800 border-slate-600">
                <SelectValue placeholder="Pilih Kategori Makanan..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  {dataCategori.map((categori) => (
                    <SelectItem
                      value={categori.id.toString()}
                      key={categori.id}
                    >
                      {categori.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm text-slate-200">Nama Menu</Label>
            <Input
              type="text"
              name="name"
              value={dataMenu?.name || ""}
              onChange={handleChange}
              className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150 bg-slate-800 border-slate-600"
            />
          </div>

          <div>
            <Label className="text-sm text-slate-200">Harga Pokok</Label>
            <Input
              type="number"
              name="harga_pokok"
              value={dataMenu?.harga_pokok || ""}
              onChange={handleChange}
              className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150 bg-slate-800 border-slate-600"
            />
          </div>

          <div>
            <Label className="text-sm text-slate-200">Harga Jual</Label>
            <Input
              type="number"
              name="harga_jual"
              value={dataMenu?.harga_jual || ""}
              onChange={handleChange}
              className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150 bg-slate-800 border-slate-600"
            />
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <div>
            <Label className="text-sm text-slate-200">Gambar</Label>
            <Input
              type="file"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150 bg-slate-800 border-slate-600 file:text-slate-200"
              accept=".jpg,.jpeg,.png"
            />
          </div>
          <div>
            <Label className="text-sm text-slate-200">Keterangan</Label>
            <Textarea
              cols={3}
              rows={5}
              className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-slate-500 duration-150 bg-slate-800 border-slate-600"
              placeholder="Masukkan keterangan menu..."
            />
          </div>
        </div>

        <div className="flex gap-x-3">
          <Button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
          <Link href="/menu">
            <Button
              type="button"
              className="bg-red-700 hover:bg-red-600 text-white"
            >
              Kembali
            </Button>
          </Link>
        </div>
      </form>
    </section>
  );
}
