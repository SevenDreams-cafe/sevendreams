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

import { supabase } from "@utils/supabase";

import Swal from "sweetalert2";

// import { dataMenu } from "@datas/dataMenu";

import { SearchIcon } from "@components/icons/SearchIcon";

interface MenuProps {
  id: number;
  name: string;
  id_categori: number;
  harga_pokok: number;
  harga_jual: number;
  image_url: string;
}

export default function DaftarMenu() {
  // const [dataCategori, setDataCategori] = useState([]);
  const [dataMenu, setDataMenu] = useState<MenuProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);

  async function fetchMenu() {
    try {
      const response = await fetch("/api/getMenu");

      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }

      const menus = await response.json();

      setDataMenu(menus);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
            text: "Your menu has been successfully deleted",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("Gagal menghapus kategori. Silakan coba lagi.");
      }
    });
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const filteredMenu = dataMenu.filter((menu) =>
    menu.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-neutral-700" />
            </div>

            <Link
              href="menu/create"
              className="border border-blue-600 bg-blue-600 hover:bg-blue-500 text-neutral-50 py-2.5 px-4 text-sm rounded-md"
            >
              Buat Menu Baru
            </Link>
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[60px] text-center">#</TableHead>
                  <TableHead className="w-[80px] text-center">Gambar</TableHead>
                  <TableHead className="w-[80px] text-center">
                    Kode Menu
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Nama Menu
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Kategori
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Harga Pokok
                  </TableHead>
                  <TableHead className="w-[100px] text-center">
                    Harga Jual
                  </TableHead>
                  <TableHead className="w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-center">
                {filteredMenu.map((menu, menuIndex) => (
                  <TableRow
                    key={`${menu.id}${menuIndex + 1}`}
                    tabIndex={menuIndex}
                  >
                    <TableCell>{menuIndex + 1}</TableCell>
                    <TableCell className="">
                      <img
                        src={menu.image_url}
                        alt={menu.name}
                        className="object-cover"
                      />
                    </TableCell>
                    <TableCell>{menu.id}</TableCell>
                    <TableCell className="capitalize">{menu.name}</TableCell>
                    <TableCell>Nasi</TableCell>
                    <TableCell>Rp. {menu.harga_pokok}</TableCell>
                    <TableCell>Rp. {menu.harga_jual}</TableCell>
                    <TableCell className="text-center">
                      <Link href={`/menu/edit?id=${menu.id}`}>
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-auto bg-yellow-400 text-neutral-950 px-3 py-1.5 h-auto rounded-md"
                        >
                          Edit
                        </Button>
                      </Link>
                      <span className="px-1.5">||</span>
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto inline-block bg-red-500 text-neutral-50 px-3 py-1.5 h-auto rounded-md"
                        onClick={() => handleDelete(menu.id)}
                      >
                        Delete
                      </Button>
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
