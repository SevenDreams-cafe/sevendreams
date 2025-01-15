import React, { Dispatch, FormEvent, useState } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "./shadcn/Label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/shadcn/Dialog";
import type { SetStateAction } from "react";

interface AddStockProps {
  menuId: number;
  quantityStock: number;
  minimumStocks: number;
  onStockUpdated: () => void;
  setError: Dispatch<SetStateAction<boolean>>;
}

export function AddStockDialog({
  menuId,
  quantityStock,
  minimumStocks,
  onStockUpdated,
  setError,
}: AddStockProps) {
  const [quantity, setQuantity] = useState(quantityStock);
  const [minimumStock, setMinimumStock] = useState(minimumStocks);
  const [isOpen, setIsOpen] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (quantity < minimumStock) {
      setError(true);
      setIsOpen(false);
      return;
    }

    const response = await fetch("/api/menu/stock/addStock", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: menuId, quantity, minimumStock }),
    });

    if (response.ok) {
      onStockUpdated();
      setIsOpen(false);
    } else {
      console.log("Data Gagal di Tambah");
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          type="button"
          className="w-auto bg-blue-600 text-neutral-50 px-3 py-1.5 h-auto rounded-md"
        >
          Add
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-neutral-50">
        <DialogHeader>
          <DialogTitle>Tambah Stock Menu</DialogTitle>
        </DialogHeader>
        <div className="mt-5">
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div>
              <Label className="block mb-2">Minimum Stock</Label>
              <Input
                type="number"
                min={0}
                value={minimumStock}
                onChange={(e) => setMinimumStock(Number(e.target.value))}
                placeholder="Masukkan Stock Minimum..."
                autoFocus={false}
              />
            </div>
            <div>
              <Label className="block mb-2">Stok Menu</Label>
              <Input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                placeholder="Masukkan Stock Menu..."
                autoFocus={false}
              />
            </div>
            <div className="flex justify-end gap-x-3 items-center">
              <DialogClose
                type="button"
                className="border border-red-600 bg-red-600 hover:bg-red-500 text-neutral-50 w-min py-2 px-4 text-sm rounded-md"
              >
                Closed
              </DialogClose>
              <Button
                type="submit"
                variant="secondary"
                className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 w-min py-2"
              >
                Add Stock
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
