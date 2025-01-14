import { useEffect, useState } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/shadcn/Dialog";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@components/shadcn/Table";

import { dataMenu } from "@datas/dataMenu";

import { SearchIcon } from "@components/icons/SearchIcon";

interface CategoriProps {
  id: number;
  name: string;
}

interface MenuProps {
  id: number;
  name: string;
  minimum_stock: number;
  quantity_stock: number;
  tbl_categori: CategoriProps;
}

export default function DaftarMenu() {
  const [stock, setStock] = useState<MenuProps[]>([]);
  const [searchItem, setSearchItem] = useState("");

  const [loading, setLoading] = useState(false);

  async function fetchStock() {
    try {
      const response = await fetch("/api/menu/getMenu");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const stocks = await response.json();

      setStock(stocks);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <>
      <>
        <section className="w-full p-8 bg-white rounded-md">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-neutral-200 bg-neutral-50 w-full pl-8"
                placeholder="Search..."
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-neutral-700" />
            </div>
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">#</TableHead>

                  <TableHead className="w-[100px] text-center">
                    Nama Menu
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Kategori
                  </TableHead>
                  <TableHead className="w-[80px] text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="w-[80px] text-center">
                    Minimum
                  </TableHead>
                  <TableHead className="w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {stock.map((item, itemIndex) => (
                  <TableRow
                    key={`${item.id}${itemIndex + 1}`}
                    tabIndex={itemIndex}
                  >
                    <TableCell>{itemIndex + 1}</TableCell>
                    <TableCell className="capitalize">{item.name}</TableCell>
                    <TableCell>Nasi</TableCell>
                    <TableCell>{item.minimum_stock}</TableCell>
                    <TableCell>{item.quantity_stock}</TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto bg-blue-600 text-neutral-50 px-3 py-1.5 h-auto rounded-md"
                      >
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      </>

      {/* <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="bg-neutral-50">
          <DialogHeader>
            <DialogTitle>Tambah Jumlah Stok</DialogTitle>
          </DialogHeader>
          <div className="mt-5">
            <form className="flex flex-col gap-y-4">
              <Input
                value={addStock.name}
                className="placeholder:text-neutral-950"
                disabled
              />
              <Input
                type="number"
                onChange={handleStockChange}
                value={addStock.stock}
                placeholder="Masukkan nama kategori..."
                min={0}
              />
              <div className="flex justify-end gap-x-3 items-center">
                <Button
                  type="button"
                  variant="secondary"
                  className="border border-yellow-500 bg-yellow-500 hover:bg-yellow-400 text-neutral-950 w-min py-2"
                >
                  Tambah Stock
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog> */}
    </>
  );
}
