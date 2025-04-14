import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "@components/shadcn/Label";
import { Textarea } from "@components/shadcn/Textarea";

import { ShopIcon } from "@components/icons/ShopIcon";

export default function SettingsStruk() {
  return (
    <div>
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
    </div>
  );
}
