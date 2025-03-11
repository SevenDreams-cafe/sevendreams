import React, { useEffect, useState } from "react";

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

import { CategoriProps } from "@type/categoris";

import { supabase } from "@utils/supabase";
import Swal from "sweetalert2";

import { EditCategoriDialog } from "@components/categori/EditCategoriDialog";
import { InsertCategori } from "@components/categori/InsertCategori";
import { SearchIcon } from "@components/icons/SearchIcon";

export default function Categori() {
  const [loading, setLoading] = useState(true);
  const [dataCategori, setDataCategori] = useState<CategoriProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleNewItem(item: CategoriProps) {
    setDataCategori((prevItems) => [...prevItems, item]);
  }

  async function fetchCategori() {
    try {
      const response = await fetch("/api/categori/getCategori");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setDataCategori(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchCategori();
  }, []);

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
            .from("tbl_categori")
            .delete()
            .eq("id", id);

          if (error) {
            throw error;
          }

          // Hapus dari state lokal setelah berhasil dihapus dari Supabase
          setDataCategori((prev) => prev.filter((item) => item.id !== id));

          // Sweatalert ketika data sukses di hapus
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

  const filteredCategori = dataCategori.filter((categori) =>
    categori.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <section className="w-full p-8 bg-slate-900 rounded-md text-slate-200">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-slate-700 bg-slate-700 w-full pl-8 text-sm text-slate-300"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-slate-300" />
            </div>

            <InsertCategori onNewItem={handleNewItem} />
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow className="text-center border-slate-600">
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead className="lg:w-[400px]">Nama Kategori</TableHead>
                  <TableHead className="lg:w-[120px] text-center">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategori.map((categori, index) => (
                  <TableRow
                    key={categori.id}
                    tabIndex={index}
                    className="even:bg-slate-800 border-slate-600"
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{categori.name}</TableCell>
                    <TableCell className="text-center">
                      <EditCategoriDialog
                        categoryId={categori.id}
                        currentName={categori.name}
                        onCategoryUpdated={fetchCategori}
                      />
                      <span className="px-1.5">||</span>
                      <Button
                        variant="secondary"
                        type="button"
                        className="w-auto bg-red-500 text-xs md:text-sm text-slate-200 px-3 py-1.5 h-auto rounded-md"
                        onClick={() => handleDelete(categori.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCategori.length === 0 && (
              <h2 className="text-center mt-4">No data available</h2>
            )}
          </div>
        </section>
      )}
    </>
  );
}
