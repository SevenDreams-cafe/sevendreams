import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "@components/shadcn/Label";
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

import { MenuComponent } from "@components/MenuComponent";
import { SearchIcon } from "@components/icons/SearchIcon";

interface TransaksiProps {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
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

  function uangPas() {
    setBayar(checkoutTransaksi);
  }

  // Menambah Transaksi
  async function handleTransaksi(e: FormEvent) {
    e.preventDefault();

    const kembalian = isBayar - checkoutTransaksi;

    try {
      const { error } = await supabase.from("tbl_transaksi").insert([
        {
          grand_total: checkoutTransaksi,
          dibayar: isBayar,
          kembalian,
          customers: customers,
        },
      ]);

      if (error) throw error;

      const transaksiDetail = dataTransaksi.map((item, itemIndex) => ({
        id_transaksi: itemIndex + 1,
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
        <div className="flex flex-col lg:flex-row items-start gap-y-4 lg:gap-x-6">
          {/* Bagian Menu Kasir */}
          <section className=" bg-neutral-50 rounded-md lg:w-3/5 items-start">
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

              <div className="grid sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-5 gap-2 mt-6">
                {filteredMenu.map((menu, menuIndex) => (
                  <MenuComponent
                    key={menuIndex}
                    menuIndex={`${menu.id}${menuIndex + 1}`}
                    menuID={menu.id}
                    name={menu.name}
                    hargaJual={menu.harga_jual}
                    images={menu.image_url}
                    setDataTransaksi={setDataTransaksi}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Bagian Cek Transaksi */}
          <section className="bg-neutral-50 rounded-md lg:w-2/5">
            <form onSubmit={(e) => handleTransaksi(e)}>
              <div className="bg-blue-700 rounded-t-md py-3 px-4">
                <h2 className="font-bold text-neutral-50 text-lg">Transaksi</h2>
              </div>

              <div className="px-2 py-4">
                <div>
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
                </div>

                <div className="mt-6">
                  <h6 className="text-sm">List Keranjang</h6>

                  <table className="w-full text-xs mt-2">
                    <thead>
                      <tr className="[&>th]:text-start border-t border-b h-6">
                        <th className="w-6">#</th>
                        <th className="w-32">Nama</th>
                        <th className="w-28">Jumlah</th>
                        <th className="w-24">Harga</th>
                        <th className="w-10">#</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataTransaksi.map((transaksi, transaksiIndex) => (
                        <tr
                          className="text-start"
                          key={`${transaksi.id}${transaksiIndex + 1}`}
                        >
                          <td>{transaksiIndex + 1}</td>
                          <td>{transaksi.name}</td>
                          <td>
                            <div className="flex items-center gap-x-2">
                              <button
                                type="button"
                                className="px-1.5 py-0.5 rounded-sm h-auto bg-red-600 text-neutral-50 flex items-center justify-center"
                                onClick={() =>
                                  setDataTransaksi((prev) =>
                                    prev
                                      .map((item) =>
                                        item.id === transaksi.id
                                          ? { ...item, jumlah: item.jumlah - 1 }
                                          : item
                                      )
                                      .filter((item) => item.jumlah > 0)
                                  )
                                }
                              >
                                {"-"}
                              </button>
                              <Input
                                type="number"
                                className="border w-14 outline-none text-center focus-visible:ring-0 focus-visible:ring-offset-0 mt-1 text-sm focus-visible:border-blue-500 duration-150 text-neutral-600 h-auto py-2 disabled:bg-neutral-200 disabled:text-neutral-950 disabled:font-bold"
                                value={transaksi.jumlah}
                                disabled
                              />
                              <button
                                type="button"
                                className="px-1.5 py-0.5 rounded-sm h-auto bg-green-600 text-neutral-50 flex items-center justify-center"
                                onClick={() =>
                                  setDataTransaksi((prev) =>
                                    prev.map((item) =>
                                      item.id === transaksi.id
                                        ? { ...item, jumlah: item.jumlah + 1 }
                                        : item
                                    )
                                  )
                                }
                              >
                                {"+"}
                              </button>
                            </div>
                          </td>
                          <td>{transaksi.harga}</td>
                          <td>
                            <button
                              type="button"
                              onClick={() =>
                                setDataTransaksi((prev) =>
                                  prev.filter(
                                    (item) => item.id !== transaksi.id
                                  )
                                )
                              }
                            >
                              x
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid px-4 pb-4 text-sm">
                <table>
                  <tbody>
                    <tr>
                      <td>Sub Total</td>
                      <td className=" pb-1">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            Rp
                          </span>
                          <input
                            type="text"
                            value={checkoutTransaksi}
                            className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td className=" pb-1">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            Rp
                          </span>
                          <input
                            type="number"
                            value={0}
                            className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    <tr className="font-bold">
                      <td>Grand Total</td>
                      <td className=" pb-1">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            Rp
                          </span>
                          <input
                            type="text"
                            value={checkoutTransaksi}
                            className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    {dataTransaksi.length !== 0 && (
                      <>
                        <tr>
                          <td>Dibayar</td>
                          <td className=" pb-1">
                            <div className="relative">
                              <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                                Rp
                              </span>
                              <input
                                type="number"
                                value={isBayar === 0 ? "" : isBayar}
                                onChange={(e) =>
                                  setBayar(Number(e.target.value))
                                }
                                className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                                placeholder="Pembayaran..."
                              />
                            </div>
                          </td>
                        </tr>
                        <tr className="font-bold">
                          <td>Kembalian</td>
                          <td className="">
                            <div className="relative">
                              <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                                Rp
                              </span>
                              <input
                                type="text"
                                value={isBayar - checkoutTransaksi}
                                className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                                disabled
                              />
                            </div>
                          </td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="px-2 pb-3">
                {dataTransaksi.length !== 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="bg-green-700 hover:bg-green-600 duration-150 w-full py-2 px-2 text-sm h-auto text-neutral-50 mb-2"
                    onClick={uangPas}
                    disabled={
                      checkoutTransaksi === isBayar
                        ? true
                        : isBayar > checkoutTransaksi
                        ? true
                        : false
                    }
                  >
                    Uang Pas
                  </Button>
                )}
                <Button
                  type="submit"
                  variant="destructive"
                  className="bg-blue-700 hover:bg-blue-600 duration-150 w-full py-2 px-2 text-sm h-auto text-neutral-50"
                  disabled={
                    checkoutTransaksi === 0
                      ? true
                      : checkoutTransaksi > isBayar
                      ? true
                      : false
                  }
                >
                  Transaksi
                </Button>
              </div>
            </form>
          </section>
        </div>
      )}
    </>
  );
}
