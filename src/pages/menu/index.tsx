import { useEffect, useState } from "react";
import Link from "next/link";

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

import Swal from "sweetalert2";
import { supabase } from "@utils/supabase";

import { CategoriProps } from "@type/categoris";
import { MenuProps } from "@type/menu";

import { SearchIcon } from "@components/icons/SearchIcon";

interface DaftarMenuProps extends MenuProps {
  tbl_categori: CategoriProps;
}

export default function DaftarMenu() {
  const PAGE_SIZE = 10;

  const [dataMenu, setDataMenu] = useState<DaftarMenuProps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchMenu() {
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

      setDataMenu(data || []);
      setTotalPages(Math.ceil((count || 0) / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, [page]);

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Deleted data cannot be recovered!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      try {
        if (result.isConfirmed) {
          const { error } = await supabase
            .from("tbl_menu")
            .delete()
            .eq("id", id);

          if (error) {
            throw error;
          }

          // Hapus dari state lokal setelah berhasil dihapus dari Supabase
          setDataMenu((prev) => prev.filter((item) => item.id !== id));

          Swal.fire({
            title: `Success`,
            text: "Data successfully deleted",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Gagal menghapus kategori. Silakan coba lagi.");
      }
    });
  };

  const filteredMenu = dataMenu.filter(
    (menu) =>
      menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.harga_pokok
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      menu.harga_jual
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      menu.tbl_categori.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <section className="w-full p-8 rounded-md bg-neutral-50">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full pl-8 text-sm"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-slate-300" />
            </div>

            <Link
              href="menu/create"
              className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 py-2.5 px-4 text-xs lg:text-sm rounded-md"
            >
              Buat Menu Baru
            </Link>
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow className="text-center border-slate-600">
                  <TableHead className="w-[40px] lg:w-[60px] text-center">
                    #
                  </TableHead>
                  <TableHead className="lg:w-[80px] text-center">
                    Gambar
                  </TableHead>
                  <TableHead className="lg:w-[80px] text-center">
                    Kode Menu
                  </TableHead>
                  <TableHead className="lg:w-[100px] text-center">
                    Nama Menu
                  </TableHead>
                  <TableHead className="lg:w-[100px] text-center">
                    Kategori
                  </TableHead>
                  <TableHead className="lg:w-[100px] text-center">
                    Harga Pokok
                  </TableHead>
                  <TableHead className="lg:w-[100px] text-center">
                    Harga Jual
                  </TableHead>
                  <TableHead className="w-[14px] lg:w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {filteredMenu.map((menu, menuIndex) => (
                  <TableRow
                    key={`${menu.id}${menuIndex + 1}`}
                    tabIndex={menuIndex}
                    className="even:bg-slate-200 border-slate-200"
                  >
                    <TableCell>
                      {(page - 1) * PAGE_SIZE + menuIndex + 1}
                    </TableCell>
                    <TableCell className="">
                      <img
                        src={menu.image_url}
                        alt={menu.name}
                        className="object-cover w-20 h-20"
                      />
                    </TableCell>
                    <TableCell>{menu.id}</TableCell>
                    <TableCell className="capitalize">{menu.name}</TableCell>
                    <TableCell>{menu.tbl_categori.name}</TableCell>
                    <TableCell>
                      Rp. {menu.harga_pokok.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      Rp. {menu.harga_jual.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link
                        href={{
                          pathname: "/menu/edit/[id]",
                          query: { id: menu.id },
                        }}
                      >
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-auto bg-yellow-400 text-neutral-950 px-3 py-1.5 h-auto text-xs lg:text-sm rounded-md"
                        >
                          Edit
                        </Button>
                      </Link>
                      <span className="px-1.5">||</span>
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto inline-block bg-red-500 text-neutral-50 px-3 py-1.5 h-auto text-xs lg:text-sm rounded-md"
                        onClick={() => handleDelete(menu.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredMenu.length === 0 && (
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
