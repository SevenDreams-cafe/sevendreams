import { useEffect, useState } from "react";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@components/shadcn/Table";

import type { CategoriProps } from "@type/categoris";
import type { MenuProps } from "@type/menu";
import { supabase } from "@utils/supabase";

import { AddStockDialog } from "@components/AddStockDialog";

import { SearchIcon } from "@components/icons/SearchIcon";

interface StockProps extends MenuProps {
  tbl_categori: CategoriProps;
}

export default function Stock() {
  const PAGE_SIZE = 10;

  const [dataMenu, setMenu] = useState<StockProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(false);
  const [searchStock, setSearchStock] = useState("");

  async function fetchStock() {
    try {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from("tbl_menu")
        .select("*, tbl_categori(*)", { count: "exact" })
        .range(from, to);

      if (error) {
        throw new Error("Failed to fetch menu");
      }

      setMenu(data || []);
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStock();
  }, [page]);

  // Searching Stock
  const filteredStock = dataMenu.filter(
    (menu) =>
      menu.name.toLowerCase().includes(searchStock.toLowerCase()) ||
      menu.quantity_stock
        .toLocaleString()
        .toLowerCase()
        .includes(searchStock.toLowerCase()) ||
      menu.minimum_stock
        .toLocaleString()
        .toLowerCase()
        .includes(searchStock.toLowerCase()) ||
      menu.tbl_categori.name.includes(searchStock)
  );

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <section className="w-full p-8 bg-neutral-50 rounded-md">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full pl-8 text-sm"
                placeholder="Search..."
                value={searchStock}
                onChange={(e) => setSearchStock(e.target.value)}
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-slate-300" />
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
                <TableRow className="text-center border-slate-600">
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
                {filteredStock.map((menu, menuIndex) => (
                  <TableRow
                    key={`${menu.id}${menuIndex + 1}`}
                    tabIndex={menuIndex}
                    className="even:bg-neutral-200 border-neutral-200"
                  >
                    <TableCell>{menuIndex + 1}</TableCell>
                    <TableCell className="capitalize">{menu.name}</TableCell>
                    <TableCell>{menu.tbl_categori.name}</TableCell>
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

            {filteredStock.length === 0 && (
              <h2 className="text-center mt-4">No data available</h2>
            )}

            <div className="flex justify-between mt-4">
              <span className="text-sm">
                Page {page} of {totalPages}
              </span>
              <div className="">
                <Button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <Button
                  onClick={() =>
                    setPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
