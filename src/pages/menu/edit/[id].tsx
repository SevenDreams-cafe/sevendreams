import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent } from "react";

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

export default function EdithMenu() {
  const router = useRouter();
  const { id } = router.query;

  const [dataMenu, setDataMenu] = useState<MenuProps | null>(null);
  const [dataCategori, setDataCategori] = useState<CategoriProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchDataMenu() {
      const response = await fetch(`/api/menu/getEdit?id=${id}`);
      const data = await response.json();

      if (response.ok) {
        setDataMenu(data);
      } else {
        console.error("Error fetching data:", data.message);
      }
    }

    async function fetchDataCategori() {
      const response = await fetch(`/api/categori/getCategori`);
      const data = await response.json();

      if (response.ok) {
        setDataCategori(data);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    }

    if (id) {
      fetchDataMenu();
      fetchDataCategori();
    }
  }, [id]);

  // onChange Value Categori Option
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

  // onChange Value Menu Input
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setDataMenu((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              name === "harga_pokok" || name === "harga_jual" // Cast to number for numeric fields
                ? parseInt(value, 10)
                : value,
          }
        : null
    );
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (dataMenu) {
      const response = await fetch("/api/menu/editMenu", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataMenu),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        // router.push("/menu"); // Redirect after success
      } else {
        console.error("Error updating menu:", result.message);
      }
    }

    setLoading(false);
  }

  return (
    <>
      <section className="w-full p-8 bg-white rounded-md mb-4">
        <h2 className="text-lg font-bold">Edit Menu </h2>

        <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm text-neutral-600">Kategori Menu</Label>
              <Select
                name="tbl_categori"
                value={`${dataMenu?.tbl_categori.id}`}
                onValueChange={handleChangeCategori}
              >
                <SelectTrigger className="border outline-none focus:ring-0 focus:ring-offset-0 mt-2 text-sm focus:border-blue-500 duration-150 text-neutral-600">
                  <SelectValue placeholder="Pilih Kategori Makanan..." />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectGroup>
                    {dataCategori.map((categori) => (
                      <SelectItem key={categori.id} value={`${categori.id}`}>
                        {categori.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Nama Menu</Label>
              <Input
                type="text"
                name="name"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan nama menu..."
                value={dataMenu?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Harga Pokok</Label>
              <Input
                type="number"
                name="harga_pokok"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan harga pokok menu..."
                value={dataMenu?.harga_pokok}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Harga Jual</Label>
              <Input
                type="number"
                name="harga_jual"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan harga jual menu..."
                value={dataMenu?.harga_jual}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            <div>
              <Label className="text-sm text-neutral-600">Harga Jual</Label>
              <Input
                type="number"
                name="harga_jual"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                placeholder="Masukkan harga jual menu..."
                value={dataMenu?.harga_jual}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="text-sm text-neutral-600">Gambar Menu</Label>
              <Input
                type="text"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                value={dataMenu?.image_url}
                // onChange={handleChange}
              />
              <Input
                type="file"
                name="image_url"
                className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-2 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600"
                onChange={handleChange}
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
              type="submit"
              variant="destructive"
              className="bg-green-700 hover:bg-green-600 duration-150 w-max text-neutral-50 text-xs lg:text-sm"
            >
              {loading ? "Saving..." : "Save Changes"}
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
