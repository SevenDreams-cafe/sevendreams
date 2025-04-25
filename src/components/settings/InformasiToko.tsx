import { FormEvent, useEffect, useState } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "@components/shadcn/Label";
import { Textarea } from "@components/shadcn/Textarea";

import { supabase } from "@utils/supabase";

import { ShopIcon } from "@components/icons/ShopIcon";

export function InformasiToko() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [founder, setFounder] = useState("");
  const [website, setWebsite] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("tbl_informasitoko")
        .select("*")
        .single();

      if (data) {
        setName(data.name || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
        setFounder(data.founder || "");
        setWebsite(data.website || "");
      }

      if (error) {
        console.error("Gagal fetch data:", error);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("tbl_informasitoko")
      .upsert({ id: 1, name, phone, address, founder, website });

    setLoading(false);

    if (error) {
      alert("Data Gagal Disimpan!");
    } else {
      alert("Data Berhasil di Update!");
    }
  }

  return (
    <section className="w-full bg-neutral-50 shadow-sm">
      <div className="px-6 py-4 bg-blue-700 mb-4 flex items-center gap-x-2.5 flex-wrap">
        <ShopIcon className="w-5 fill-neutral-50" />
        <h2 className="text-neutral-50 font-bold">Informasi Toko</h2>
      </div>
      <form className="p-[10px_24px_36px]" onSubmit={handleSubmit}>
        <ul className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
          <li>
            <Label className="text-base text-neutral-700">Nama Toko</Label>
            <Input
              type="text"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
              placeholder="Nama Restaurant..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </li>
          <li>
            <Label className="text-base text-neutral-700">Nomor Telepon</Label>
            <Input
              type="number"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
              placeholder="085394222312"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </li>
          <li>
            <Label className="text-base text-neutral-700">Alamat</Label>
            <Textarea
              className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
              placeholder="Jln. KusukaSanaSini Blok K3 B..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </li>
          <li>
            <Label className="text-base text-neutral-700">Founder</Label>
            <Input
              type="text"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
              placeholder="Ahmad Wahyu.."
              value={founder}
              onChange={(e) => setFounder(e.target.value)}
            />
          </li>
          <li>
            <Label className="text-base text-neutral-700">Website</Label>
            <Input
              type="text"
              className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
              placeholder="www.example.com..."
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </li>
        </ul>

        <Button
          variant="ghost"
          type="submit"
          className="bg-green-600 mt-4 text-neutral-50"
        >
          {loading ? "Loading" : "Submit"}
        </Button>
      </form>
    </section>
  );
}
