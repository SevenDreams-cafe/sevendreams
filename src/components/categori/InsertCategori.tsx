import React, { useState } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadcn/Dialog";

interface CategoriProps {
  id: number;
  name: string;
}

interface CategoriNewProps {
  onNewItem: (item: CategoriProps) => void;
}

export function InsertCategori({ onNewItem }: CategoriNewProps) {
  const [name, setName] = useState("");
  const [addOpen, setAddOpen] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Memanggil API route
    const response = await fetch("/api/categori/insertCategori", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const result = await response.json();
    if (response.ok) {
      //   console.log("Data inserted:", result.data);

      onNewItem(result.data[0]);
      setAddOpen(false); // Tutup dialog setelah sukses
      setName(""); // Reset form
    } else {
      console.error("Error:", result.message);
    }
  }
  return (
    <Dialog open={addOpen} onOpenChange={setAddOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="secondary"
          className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-xs md:text-sm text-neutral-50"
          onClick={() => setAddOpen(true)}
        >
          Buat Kategori Baru
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-slate-900 border-slate-700"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-slate-200">
            Buat Kategori Baru
          </DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 text-sm text-slate-400 border border-transparent bg-slate-700 rounded-md mb-2.5 outline-none focus-visible:border-transparent focus-visible:ring-offset-1 focus-visible:ring-offset-slate-600 focus-visible:ring-0"
              placeholder="Masukkan nama kategori..."
            />
            <div className="flex justify-end gap-x-3 items-center">
              <DialogClose
                type="button"
                className="border border-red-600 bg-red-600 hover:bg-red-500 text-neutral-50 w-min py-2 px-4 text-xs lg:text-sm rounded-md"
              >
                Closed
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 w-min text-xs lg:text-sm py-2"
              >
                Buat Kategori Baru
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
