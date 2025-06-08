import { Dispatch, useState } from "react";
import type { SetStateAction } from "react";

import { Button } from "./shadcn/Button";
import { Input } from "./shadcn/Input";
import { Label } from "./shadcn/Label";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@components/shadcn/Dialog";

interface TransaksiProps {
  customers: string;
  dibayar: number;
  setCustomers: Dispatch<SetStateAction<string>>;
  setDibayar: Dispatch<SetStateAction<number>>;
}

export function TransaksiDialog({
  customers = "",
  dibayar = 0,
  setCustomers,
  setDibayar,
}: TransaksiProps) {
  const [addOpen, setAddOpen] = useState(false);

  return (
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="destructive"
          className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 text-xs lg:text-sm py-2 w-full"
          onClick={() => setAddOpen(false)}
        >
          Transaksi
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-neutral-50 data-[state=open]:slide-in-from-top-[0%] data-[state=closed]:slide-out-to-top-[0%] translate-y-3/4 data-[state=open]:mt-0"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <form className="mt-5">
          <div className="flex gap-y-2 flex-col">
            <Label>Nama Pemesan :</Label>
            <Input
              type="text"
              value={customers}
              onChange={(e) => setCustomers(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-transparent bg-neutral-300 focus:bg-neutral-200 rounded-md mb-2.5 outline-none focus-visible:border-transparent focus-visible:ring-offset-0 focus-visible:ring-0"
              required
            />
          </div>
          <div className="flex gap-y-2 flex-col mt-2">
            <Label className="font-extrabold">Dibayar :</Label>
            <Input
              type="text"
              value={dibayar}
              onChange={(e) => setDibayar(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm border border-transparent bg-neutral-300 focus:bg-neutral-200 rounded-md mb-2.5 outline-none focus-visible:border-transparent focus-visible:ring-offset-0 focus-visible:ring-0 font-extrabold"
              required
            />
          </div>
          <div className="flex justify-end gap-x-3 items-center mt-5">
            <Button
              type="submit"
              variant="secondary"
              className="bg-green-600 hover:bg-green-700 duration-150 w-full py-2 px-2 text-sm h-auto text-neutral-50"
            >
              Bayar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
