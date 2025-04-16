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

import { SettingsSlindersIcon } from "@components/icons/SettingsSlindersIcon";
import { ShopIcon } from "@components/icons/ShopIcon";

export default function SettingsStruk() {
  return (
    <div className="mb-4">
      {/* Settings info shop */}
      <section className="w-full bg-neutral-50 shadow-sm">
        <div className="px-6 py-4 bg-blue-700 mb-4 flex items-center gap-x-2.5 flex-wrap">
          <ShopIcon className="w-5 fill-neutral-50" />
          <h2 className="text-neutral-50 font-bold">Informasi Toko</h2>
        </div>
        <form className="p-[10px_24px_36px]">
          <ul className="grid lg:grid-cols-2 gap-x-6 gap-y-4">
            <li>
              <Label className="text-base text-neutral-700">Nama Toko</Label>
              <Input
                type="text"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="Nama Restaurant..."
              />
            </li>
            <li>
              <Label className="text-base text-neutral-700">
                Nomor Telepon
              </Label>
              <Input
                type="number"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="085394222312"
              />
            </li>
            <li>
              <Label className="text-base text-neutral-700">Alamat</Label>
              <Textarea
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="Nama Restaurant..."
              />
            </li>
            <li>
              <Label className="text-base text-neutral-700">Founder</Label>
              <Input
                type="text"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="Ahmad Wahyu.."
              />
            </li>
            <li>
              <Label className="text-base text-neutral-700">Website</Label>
              <Input
                type="text"
                className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                placeholder="Nama Restaurant..."
              />
            </li>
          </ul>

          <Button
            variant="ghost"
            type="button"
            className="bg-green-600 mt-4 text-neutral-50"
          >
            Simpan
          </Button>
        </form>
      </section>

      {/* Settings Cashier */}
      <section className="w-full bg-neutral-50 shadow-sm mt-6 md:mt-8">
        <div className="px-6 py-4 bg-blue-700 mb-4 flex items-center gap-x-2.5 flex-wrap">
          <SettingsSlindersIcon className="w-5 fill-neutral-50" />
          <h2 className="text-neutral-50 font-bold">Pengaturan Kasir</h2>
        </div>
        <form className="p-[10px_24px_36px]">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Settings Struk */}
            <ul className="grid gap-y-4">
              <li>
                <Label className="text-base text-neutral-700">
                  Footer Struk
                </Label>
                <Textarea
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                  placeholder="Terima kasih atas kunjungan anda"
                  rows={6}
                />
              </li>
              <li>
                <Label className="text-base text-neutral-700">
                  Gambar Toko
                </Label>
                <Input
                  type="file"
                  className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1"
                />
              </li>
            </ul>

            {/* Settings Kasir */}
            <ul className="grid gap-y-4">
              <li>
                <Label className="text-base text-neutral-700">Pajak (%)</Label>
                <Select>
                  <SelectTrigger className="focus:ring-offset-0 focus:ring-0 mt-1">
                    <SelectValue placeholder="Disabled" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-50">
                    <SelectGroup>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </li>
              <li>
                <Label className="text-base text-neutral-700">Diskon (%)</Label>
                <Select>
                  <SelectTrigger className="focus:ring-offset-0 focus:ring-0 mt-1">
                    <SelectValue placeholder="Disabled" />
                  </SelectTrigger>
                  <SelectContent className="bg-neutral-50">
                    <SelectGroup>
                      <SelectItem value="enabled">Enabled</SelectItem>
                      <SelectItem value="disabled">Disabled</SelectItem>
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
                  />
                  <Input
                    type="time"
                    className="focus-visible:ring-offset-0 focus-visible:ring-0 outline-none mt-1 relative"
                  />
                </div>
              </li>
            </ul>
          </div>

          <Button
            variant="ghost"
            type="button"
            className="bg-green-600 mt-4 text-neutral-50"
          >
            Simpan
          </Button>
        </form>
      </section>
    </div>
  );
}
