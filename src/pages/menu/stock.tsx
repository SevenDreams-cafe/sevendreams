import { useEffect, useState } from "react";
import { Input } from "@components/shadcn/Input";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@components/shadcn/Table";

import { AddStockDialog } from "@components/AddStockDialog";

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
  const [dataMenu, setMenu] = useState<MenuProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function fetchStock() {
    try {
      const response = await fetch("/api/menu/getMenu");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const menus = await response.json();

      setMenu(menus);
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

  // Tambah Stock Makanan

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
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
          {error && (
            <p className="text-sm text-red-600">
              Stock yang ditambahkan kurang...
            </p>
          )}
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">#</TableHead>
                  <TableHead className="w-fit lg:w-[200px] text-center">
                    Nama Menu
                  </TableHead>
                  <TableHead className="lg:w-[100px] text-center">
                    Kategori
                  </TableHead>
                  <TableHead className="w-[80px] text-center">
                    Minimum (Stock)
                  </TableHead>
                  <TableHead className="w-[80px] text-center">
                    Quantity (Stock)
                  </TableHead>
                  <TableHead className="w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {dataMenu.map((menu, menuIndex) => (
                  <TableRow
                    key={`${menu.id}${menuIndex + 1}`}
                    tabIndex={menuIndex}
                  >
                    <TableCell>{menuIndex + 1}</TableCell>
                    <TableCell className="capitalize">{menu.name}</TableCell>
                    <TableCell>Nasi</TableCell>
                    <TableCell>{menu.minimum_stock}</TableCell>
                    <TableCell>{menu.quantity_stock}</TableCell>
                    <TableCell className="text-center">
                      <AddStockDialog
                        menuId={menu.id}
                        minimumStocks={menu.minimum_stock}
                        quantityStock={menu.quantity_stock}
                        onStockUpdated={fetchStock}
                        setError={setError}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}
    </>
  );
}
