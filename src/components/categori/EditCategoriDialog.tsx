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

import { FormEvent } from "react";

interface UpdateCategoryDialogProps {
  categoryId: number;
  currentName: string;

  onCategoryUpdated: () => void;
}

export function EditCategoriDialog({
  categoryId,
  currentName,
  onCategoryUpdated,
}: UpdateCategoryDialogProps) {
  const [name, setName] = useState(currentName);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await fetch("/api/categori/editCategori", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: categoryId, name }),
    });

    if (response.ok) {
      onCategoryUpdated();
      setIsOpen(false);
    } else {
      console.log("Data Gagal Di Ubah");
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          type="button"
          className="w-auto bg-yellow-400 text-xs md:text-sm text-neutral-950 px-3 py-1.5 h-auto rounded-md"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent
        className="bg-neutral-50"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Kategori Baru {categoryId}</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama kategori..."
            />
            <div className="flex justify-end gap-x-3 items-center">
              <DialogClose
                type="button"
                className="border border-red-600 bg-red-600 hover:bg-red-500 text-xs sm:text-sm text-neutral-50 w-min py-2 px-4 rounded-md"
              >
                Closed
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-xs sm:text-sm text-neutral-50 w-min py-2"
              >
                Edit Kategori Baru
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
