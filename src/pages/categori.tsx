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

import { CategoriProps } from "../types/categoris";

import { EditCategoriDialog } from "@components/categori/EditCategoriDialog";
import { InsertCategori } from "@components/categori/InsertCategori";
import { SearchIcon } from "@components/icons/SearchIcon";

import { supabase } from "@utils/supabase";

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
    const confirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus kategori ini?"
    );
    if (!confirmed) return;

    try {
      const { error } = await supabase
        .from("tbl_categori")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }

      // Hapus dari state lokal setelah berhasil dihapus dari Supabase
      setDataCategori((prev) => prev.filter((item) => item.id !== id));
      alert("Kategori berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Gagal menghapus kategori. Silakan coba lagi.");
    }
  };

  const filteredCategori = dataCategori.filter((categori) =>
    categori.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
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

            <InsertCategori onNewItem={handleNewItem} />
          </div>
          <div className="mt-5">
            {filteredCategori.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="text-center">
                    <TableHead className="w-[60px]">#</TableHead>
                    <TableHead className="w-[400px]">Nama Kategori</TableHead>
                    <TableHead className="lg:w-[120px] text-center">
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCategori.map((categori, index) => (
                    <TableRow key={categori.id} tabIndex={index}>
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
                          className="w-auto bg-red-500 text-xs md:text-sm text-neutral-50 px-3 py-1.5 h-auto rounded-md"
                          onClick={() => handleDelete(categori.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-center text-neutral-500">
                No categories found.
              </p>
            )}
          </div>
        </section>
      )}
    </>
  );
}
