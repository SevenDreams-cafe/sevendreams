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

import Swal from "sweetalert2";
import { supabase } from "@utils/supabase";

import { SearchIcon } from "@components/icons/SearchIcon";

interface TransaksiDetailProps {
  id: number;
  id_menu: number;
  jumlah: number;
  harga: number;
}

interface TransaksiProps {
  id: number;
  created_at: string;
  kode: string;
  grand_total: number;
  grand_modal: number;
  customers: string;
  tbl_transaksi_detail: TransaksiDetailProps[];
}

export default function Transaksi() {
  const PAGE_SIZE = 10;

  const [loading, setLoading] = useState(true);
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchTransaksi() {
    try {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      const { data, count, error } = await supabase
        .from("tbl_transaksi")
        .select(
          `id, created_at, kode, grand_total, grand_modal, dibayar, kembalian, customers, tbl_transaksi_detail (id, id_menu, jumlah, harga)`,
          { count: "exact" }
        )
        .range(from, to);

      if (error) {
        throw new Error("Failed to fetch menu");
      }

      setDataTransaksi(data || []);
      setTotalPages(Math.ceil((count || 1) / PAGE_SIZE));
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchTransaksi();
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
            .from("tbl_transaksi")
            .delete()
            .eq("id", id);

          if (error) {
            throw error;
          }

          // Hapus dari state lokal setelah berhasil dihapus dari Supabase
          setDataTransaksi((prev) => prev.filter((item) => item.id !== id));

          // Sweatalert ketika data sukses di hapus
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

  const filteredTransaksi = dataTransaksi.filter(
    (transaksi) =>
      transaksi.grand_total
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      transaksi.customers.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {loading && <p>Loading...</p>}
      {!loading && (
        <section className="w-full p-8 bg-neutral-50 rounded-md">
          <div className="flex items-center justify-end gap-x-5">
            <div className="flex items-center relative lg:w-1/4">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 w-full pl-8 text-xs"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-slate-300" />
            </div>
          </div>
          <div className="mt-5">
            <Table>
              <TableHeader>
                <TableRow className="text-center border-neutral-200">
                  <TableHead className="w-[60px]">#</TableHead>
                  <TableHead>Kode Transaksi</TableHead>
                  <TableHead className="lg:w-[200px]">Atas Nama</TableHead>
                  <TableHead className="text-center">Kasir</TableHead>
                  <TableHead className="text-center">Tanggal</TableHead>
                  <TableHead className="text-center w-[80px]">Qty</TableHead>
                  <TableHead className="text-center w-[150px]">
                    Grand Modal
                  </TableHead>
                  <TableHead className="text-center w-[150px]">
                    Grand Jual
                  </TableHead>
                  <TableHead className="text-center w-[350px] xl:w-[200px]">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransaksi.map((transaksi, index) => {
                  const date = new Date(transaksi.created_at);

                  return (
                    <TableRow
                      key={index + 1}
                      tabIndex={index}
                      className="even:bg-slate-200 border-slate-200"
                    >
                      <TableCell>
                        {(page - 1) * PAGE_SIZE + index + 1}
                      </TableCell>
                      <TableCell>{transaksi.kode}</TableCell>
                      <TableCell>{transaksi.customers}</TableCell>
                      <TableCell className="text-center">SevenDreams</TableCell>
                      <TableCell className="text-center">
                        {date.toLocaleDateString("id-ID").split("T")[0]}{" "}
                        {date.toLocaleTimeString("id-ID").split("T")[0]}
                      </TableCell>
                      <TableCell className="text-center">20</TableCell>
                      <TableCell className="text-center">Rp 50,000</TableCell>
                      <TableCell className="text-center">Rp 50,000</TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-auto inline-block bg-blue-500 text-neutral-50 px-3 py-1.5 h-auto text-xs xl:text-sm rounded-md"
                        >
                          Detail
                        </Button>
                        <span className="mx-1.5">||</span>
                        <Button
                          variant="secondary"
                          type="button"
                          className="w-auto inline-block bg-red-500 text-neutral-50 px-3 py-1.5 h-auto text-xs xl:text-sm rounded-md"
                          onClick={() => handleDelete(transaksi.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {filteredTransaksi.length === 0 && (
              <h2 className="text-center mt-4">No data available</h2>
            )}

            <div className="flex justify-between mt-4">
              <span className="text-xs">
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
