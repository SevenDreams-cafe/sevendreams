import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import { Input } from "@components/shadcn/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/shadcn/Select";

import { MenuProps } from "@type/menu";
import { supabase } from "@utils/supabase";

import { TransaksiDialog } from "@components/TransaksiDialog";

import { MenuComponent } from "@components/MenuComponent";
import { SearchIcon } from "@components/icons/SearchIcon";
import { TrashIcon } from "@components/icons/TrashIcon";

interface TransaksiProps {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
  grand_modal: number;
}

interface DataCategoriProps {
  id: number;
  name: string;
}

interface DaftarMenuProps extends MenuProps {
  tbl_categori: DataCategoriProps;
}

export default function Cashier() {
  const router = useRouter();
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps[]>([]);
  const [dataCategori, setDataCategori] = useState<DataCategoriProps[]>([]);
  const [dataMenu, setDataMenu] = useState<DaftarMenuProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Semua Kategori"
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Form Input
  const [customers, setCustomers] = useState("");
  const [isBayar, setBayar] = useState(0);

  // Fetching Kategori
  async function fetchCategori() {
    try {
      const response = await fetch("/api/categori/getCategori");
      if (!response.ok) throw new Error("Failed to fetch categories");

      const data: DataCategoriProps[] = await response.json();
      setDataCategori(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  async function fetchMenu() {
    try {
      const response = await fetch("/api/menu/getMenu");
      if (!response.ok) throw new Error("Failed to fetch menu");

      const menus: DaftarMenuProps[] = await response.json();
      setDataMenu(menus);
    } catch (error) {
      console.error("Error fetching menu:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategori();
    fetchMenu();
  }, []);

  // Filter Menu atau Search Menu
  const filteredMenu = useMemo(() => {
    return dataMenu.filter((menu) => {
      const searchMatch = menu.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const categoryMatch =
        selectedCategory === "Semua Kategori" ||
        menu.tbl_categori.name === selectedCategory;
      return searchMatch && categoryMatch;
    });
  }, [dataMenu, searchTerm, selectedCategory]);

  const checkoutTransaksi = dataTransaksi.reduce(
    (acc, item) => acc + item.harga * item.jumlah,
    0
  );

  const checkTax = checkoutTransaksi * (12 / 100);

  // Menambah Transaksi
  async function handleTransaksi(e: FormEvent) {
    e.preventDefault();

    const kembalian = isBayar - checkoutTransaksi;

    // Data Total Modal
    const grandModal = dataTransaksi.reduce((total, item) => {
      return total + item.grand_modal * item.jumlah;
    }, 0);

    try {
      const { data: transaksi, error } = await supabase
        .from("tbl_transaksi")
        .insert([
          {
            grand_total: checkoutTransaksi,
            grand_modal: grandModal,
            dibayar: isBayar,
            kembalian,
            customers: customers,
          },
        ])
        .select();

      if (error) throw error;

      const transaksiID = transaksi[0].id;

      // Data Kode Acak
      // const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const kodeRandom = `${String(transaksiID).padStart(4, "0")}`; // Contoh datanya nanti 00200

      const { error: updateError } = await supabase
        .from("tbl_transaksi")
        .update({ kode: kodeRandom })
        .eq("id", transaksiID);

      if (updateError) throw error;

      const transaksiDetail = dataTransaksi.map((item) => ({
        kd_transaksi: kodeRandom,
        id_menu: item.id,
        jumlah: item.jumlah,
        harga: item.harga,
      }));

      const { error: detailError } = await supabase
        .from("tbl_transaksi_detail")
        .insert(transaksiDetail);
      if (detailError) throw detailError;

      // Encode data transaksi untuk dikirim ke halaman cetak struk
      const encodedData = encodeURIComponent(JSON.stringify(dataTransaksi));
      router.push(
        `/cetak-struk?data=${encodedData}&dibayar=${isBayar}&kembalian=${kembalian}&customers=${customers}`
      );

      setDataTransaksi([]);
      setBayar(0);
    } catch (error) {
      console.error("Error saat menyimpan transaksi:", error);
      alert("Gagal menyimpan transaksi");
    }
  }

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="flex flex-col md:flex-row items-start gap-y-4 md:gap-x-4 lg:gap-x-6">
          {/* Bagian Menu Kasir */}
          <section className=" bg-neutral-50 rounded-md w-full md:w-[55%] xl:w-[65%] items-start">
            <div className="bg-blue-700 rounded-t-md py-3 px-4">
              <h2 className="font-bold text-neutral-50 text-lg">Kasir</h2>
            </div>

            <div className="px-2 py-4">
              <div className="grid grid-cols-2 gap-x-4 items-center">
                <div className="flex items-center relative lg:w-full">
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="border outline-none focus:ring-0 focus:ring-offset-0 text-sm focus:border-blue-500 duration-150 text-neutral-600">
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectItem value="Semua Kategori">
                          Semua Kategori
                        </SelectItem>
                        {dataCategori.map((categori) => (
                          <SelectItem key={categori.id} value={categori.name}>
                            {categori.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center relative lg:w-full">
                  <Input
                    type="text"
                    className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-neutral-200 bg-neutral-50 w-full pl-8"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-neutral-700" />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-6 ">
                {filteredMenu.map((menu, menuIndex) => (
                  <MenuComponent
                    key={menuIndex}
                    menuIndex={`${menu.id}${menuIndex + 1}`}
                    menuID={menu.id}
                    name={menu.name}
                    hargaJual={menu.harga_jual}
                    hargaPokok={menu.harga_pokok}
                    images={menu.image_url}
                    setDataTransaksi={setDataTransaksi}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Bagian Cek Transaksi */}
          <section className="bg-neutral-50 rounded-md w-full md:w-[45%] xl:w-[35%]">
            <form onSubmit={(e) => handleTransaksi(e)}>
              <div className="bg-blue-700 rounded-t-md py-3 px-4">
                <h2 className="font-bold text-neutral-50 text-lg">Transaksi</h2>
              </div>

              <div className="py-4">
                <table className="w-full border-spacing-2 border-separate">
                  <tbody>
                    {dataTransaksi.map((transaksi, transaksiIndex) => (
                      <tr key={`${transaksi.id}${transaksiIndex + 1}`}>
                        <td className="text-sm font-bold flex">
                          {transaksi.jumlah}x
                        </td>
                        <td className="text-sm">
                          <h4 className="font-bold">{transaksi.name}</h4>
                          <h6>00{transaksi.id}</h6>
                        </td>
                        <td className="text-center w-20 text-sm font-bold">
                          {transaksi.harga.toLocaleString()}
                        </td>
                        <td className="mt-3 text-end w-5">
                          <button
                            type="button"
                            onClick={() =>
                              setDataTransaksi((prev) =>
                                prev.filter((item) => item.id !== transaksi.id)
                              )
                            }
                            className="w-5"
                          >
                            {<TrashIcon className="w-4 fill-red-600" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* <div>
                  <Label className="after:content-['*'] after:ml-0.5 after:text-red-500">
                    Customer
                  </Label>
                  <Input
                    type="text"
                    className="border outline-none focus-visible:ring-0 focus-visible:ring-offset-0 mt-1 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600 h-auto py-2"
                    placeholder="Masukkan nama customer..."
                    value={customers}
                    onChange={(e) => setCustomers(e.target.value)}
                    required
                  />
                </div> */}
              </div>

              <div className="border-y mb-6 px-4 py-2 flex items-center justify-between">
                <h5 className="font-bold text-sm">ADD</h5>
                <div className="">
                  <h6 className="text-sm font-semibold">Note</h6>
                </div>
              </div>

              <div className="grid gap-y-3 px-4 pb-4 text-sm">
                <div className="flex justify-between flex-wrap font-bold">
                  <h6>Sub Total</h6>
                  <h6>{checkoutTransaksi.toLocaleString()}</h6>
                </div>

                <div className="flex justify-between flex-wrap">
                  <h6>Diskon</h6>
                  <h6>{checkTax.toLocaleString()}</h6>
                </div>

                <div className="flex justify-between flex-wrap">
                  <h6>Pajak</h6>
                  <h6>{checkTax.toLocaleString()}</h6>
                </div>

                <div className="flex justify-between flex-wrap mt-2 text-xl font-extrabold">
                  <h6>Total</h6>
                  <h6>{(checkoutTransaksi - checkTax).toLocaleString()}</h6>
                </div>
              </div>

              <div className="px-2 pb-3">
                <TransaksiDialog
                  customers={customers}
                  dibayar={isBayar}
                  setCustomers={setCustomers}
                  setDibayar={setBayar}
                />
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
