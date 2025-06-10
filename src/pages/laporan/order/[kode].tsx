import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface CategoriProps {
  id: number;
  name: string;
}

// Interface menu
interface MenuProps {
  id: number;
  name: string;
  harga_pokok: number;
  harga_jual: number;
  tbl_categori: CategoriProps;
}

// Interface detail transaksi
interface TransaksiDetail {
  id: number;
  jumlah: number;
  harga: number;
  kd_transaksi: string;
  tbl_menu: MenuProps;
}

// Interface transaksi utama
interface TransaksiProps {
  id: number;
  created_at: string;
  kode: string;
  customers: string;
  grand_total: number;
  grand_modal: number;
  tbl_transaksi_detail: TransaksiDetail[];
}

export default function OrderPage() {
  const router = useRouter();
  const kode = router.query.kode as string;

  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps | null>(
    null
  );

  useEffect(() => {
    if (!router.isReady || !kode) return;

    async function fetchData() {
      try {
        const response = await fetch(`/api/getOrders?kode=${kode}`);
        if (!response.ok) throw new Error("Gagal mengambil data menu");
        const data = await response.json();
        setDataTransaksi(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [router.isReady, kode]);
  return (
    <div className="flex flex-col md:flex-row items-start gap-y-4 md:gap-x-4 lg:gap-x-6">
      <section className=" bg-neutral-50 rounded-md w-full md:w-[40%] xl:w-[30%] items-start">
        <div className="bg-blue-700 rounded-t-md py-3 px-4">
          <h2 className="font-bold text-neutral-50 text-lg">Detail Pesanan</h2>
        </div>
        <div className="p-4">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="px-2 py-3">No. Bon</td>
                <td>{dataTransaksi?.kode}</td>
              </tr>
              <tr className="bg-neutral-200">
                <td className="px-2 py-3">Atas Nama</td>
                <td>{dataTransaksi?.customers}</td>
              </tr>
              <tr>
                <td className="px-2 py-3">Status Pembayaran</td>
                <td className="text-green-600 font-bold">Lunas</td>
              </tr>
              <tr>
                <td className="px-2 py-3">Jenis Order</td>
                <td className="text-slate-600">Ditempat</td>
              </tr>
              <tr>
                <td className="px-2 py-3">Tanggal dan Waktu</td>
                <td>
                  {dataTransaksi?.created_at
                    ? new Date(dataTransaksi.created_at).toLocaleString(
                        "id-ID",
                        {
                          dateStyle: "long",
                          timeStyle: "short",
                        }
                      )
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className=" bg-neutral-50 rounded-md w-full md:w-[60%] xl:w-[70%] items-start">
        <div className="bg-blue-700 rounded-t-md py-3 px-4">
          <h2 className="font-bold text-neutral-50 text-lg">List Pesanan</h2>
        </div>

        <div className="p-4 overflow-x-auto overflow-y-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-center text-xs lg:text-sm">
                <th className="py-2.5">No</th>
                <th>Kode Menu</th>
                <th>Kategori</th>
                <th>Nama</th>
                <th>Catatan</th>
                <th>Qty</th>
                <th>Sub Total</th>
              </tr>
            </thead>
            <tbody>
              {dataTransaksi?.tbl_transaksi_detail.map((items, itemsIndex) => (
                <tr
                  className="text-center text-xs lg:text-sm odd:bg-slate-200"
                  key={`${items.id}${itemsIndex + 1}`}
                >
                  <td className="py-2.5 w-16">{itemsIndex + 1}</td>
                  <td className="w-28">{items.tbl_menu.id}</td>
                  <td className="w-36">{items.tbl_menu.tbl_categori.name}</td>
                  <td className="w-52">{items.tbl_menu.name}</td>
                  <td className="w-52"></td>
                  <td className="w-20">{items.jumlah}</td>
                  <td className="w-36">
                    {(items.harga * items.jumlah).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
