import { FormEvent, useEffect, useState } from "react";
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

import { SettingsSlindersIcon } from "@components/icons/SettingsSlindersIcon";

export function PengaturanKasir() {
  const [footer_struk, setFooterStruk] = useState("");
  const [pajak, setPajak] = useState(false);
  const [discount, setDiscount] = useState(false);
  const [pajak_nominal, setPajakNominal] = useState(0);
  const [start_kasir, setStartKasir] = useState("");
  const [end_kasir, setEndKasir] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: settingskasir } = await supabase
        .from("tbl_pengaturankasir")
        .select("*")
        .single();
      const { data: kasirlogin } = await supabase
        .from("tbl_kasirlogin")
        .select("*")
        .single();

      if (settingskasir) {
        setFooterStruk(settingskasir.footer_struk || "");
        setDiscount(settingskasir.discount || false);
        setPajak(settingskasir.pajak || false);
        setPajakNominal(settingskasir.pajak_nominal || "");
      }

      if (kasirlogin) {
        setStartKasir(kasirlogin.start_kasir || "");
        setEndKasir(kasirlogin.end_kasir || "");
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    const { data: pengaturanUser } = await supabase
      .from("tbl_pengaturankasir")
      .upsert({ id: 1, pajak, discount, pajak_nominal, footer_struk });

    const { data: kasirlogin } = await supabase
      .from("tbl_kasirlogin")
      .upsert({ id: 1, start_kasir, end_kasir });

    setLoading(false);

    if (pengaturanUser || kasirlogin) {
      alert("Data gagal ditambahkan");
    } else {
      alert("Data berhasil di tambah");
    }
  }

  return (
    <section className="w-full bg-neutral-50 shadow-sm mt-6 md:mt-8">
      <div className="px-6 py-4 bg-blue-700 mb-4 flex items-center gap-x-2.5 flex-wrap">
        <SettingsSlindersIcon className="w-5 fill-neutral-50" />
        <h2 className="text-neutral-50 font-bold">Pengaturan Kasir</h2>
      </div>
      <form className="p-[10px_24px_36px]" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6 items-start">
          {/* Settings Struk */}
          <ul className="grid gap-y-4">
            <li>
              <Label className="text-base text-neutral-700">Footer Struk</Label>
              <Textarea
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="Terima kasih atas kunjungan anda"
                rows={10}
                value={footer_struk}
                onChange={(e) => setFooterStruk(e.target.value)}
              />
            </li>
          </ul>

          {/* Settings Kasir */}
          <ul className="grid gap-y-4">
            <li>
              <Label className="text-base text-neutral-700">Pajak (%)</Label>
              <Select
                value={String(pajak)}
                onValueChange={(e) => setPajak(e === "false")}
              >
                <SelectTrigger className="focus:ring-offset-0 focus:ring-0 mt-1">
                  <SelectValue
                    placeholder={pajak === false ? "Disable" : "Enable"}
                  />
                </SelectTrigger>
                <SelectContent className="bg-neutral-50">
                  <SelectGroup>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </li>
            <li>
              <Label className="text-base text-neutral-700">Diskon (%)</Label>
              <Select
                value={String(discount)}
                onValueChange={(e) => setDiscount(e === "false")}
              >
                <SelectTrigger className="focus:ring-offset-0 focus:ring-0 mt-1">
                  <SelectValue
                    placeholder={discount === false ? "Disable" : "Enable"}
                  />
                </SelectTrigger>
                <SelectContent className="bg-neutral-50">
                  <SelectGroup>
                    <SelectItem value="true">Enabled</SelectItem>
                    <SelectItem value="false">Disabled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </li>
            <li>
              <Label className="text-base text-neutral-700">
                Pajak Default (%)
              </Label>
              <Input
                type="number"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                value={pajak_nominal}
                onChange={(e) => setPajakNominal(Number(e.target.value))}
              />
            </li>
            <li>
              <Label className="text-base text-neutral-700">
                Batas jam login kasir
              </Label>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  type="time"
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1 relative"
                  value={start_kasir}
                  onChange={(e) => setStartKasir(e.target.value)}
                />
                <Input
                  type="time"
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1 relative"
                  value={end_kasir}
                  onChange={(e) => setEndKasir(e.target.value)}
                />
              </div>
            </li>
          </ul>
        </div>

        <Button
          variant="ghost"
          type="submit"
          className="bg-green-600 mt-4 text-neutral-50"
        >
          Simpan
        </Button>
      </form>
    </section>
  );
}
