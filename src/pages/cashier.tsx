import { useEffect, useState } from "react";
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
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps[]>([]);
  const [dataCategori, setDataCategori] = useState<DataCategoriProps[]>([]);
  const [dataMenu, setDataMenu] = useState<DaftarMenuProps[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Semua Kategori"
  );
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetching Kategori
  async function fetchCategori() {
    const response = await fetch("/api/categori/getCategori");
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    setDataCategori(data);
  }

  // Fetch Menu
  async function fetchMenu() {
    try {
      const response = await fetch("/api/menu/getMenu");

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

  useEffect(() => {
    fetchCategori();
    fetchMenu();
  }, []);

  // Filter Menu atau Search Menu
  const filteredMenu = dataMenu.filter((menu) => {
    const search =
      menu.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      menu.harga_pokok
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      menu.harga_jual
        .toLocaleString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const isInCategory =
      selectedCategory === "Semua Kategori" ||
      menu.tbl_categori.name === selectedCategory;

    return search && isInCategory;
  });

  return (
    <>
      {loading ? (
        "Loading"
      ) : (
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-x-6">
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

              <div className="grid  grid-cols-4 gap-2 mt-6">
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
            <form>
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

              <div className="grid px-4 pb-4">
                <table>
                  <tbody className="text-sm">
                    <tr>
                      <td>Sub Total</td>
                      <td className=" pb-1">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            Rp
                          </span>
                          <input
                            type="text"
                            value={dataTransaksi.reduce(
                              (acc, item) => acc + item.harga,
                              0
                            )}
                            className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>PPN (0%)</td>
                      <td className=" pb-1">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            %
                          </span>
                          <input
                            type="number"
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
                      <td>Total</td>
                      <td className="">
                        <div className="relative">
                          <span className="w-10 font-bold text-neutral-700 h-full absolute bg-neutral-300 rounded-l-md flex items-center justify-center">
                            Rp
                          </span>
                          <input
                            type="text"
                            value={dataTransaksi.reduce(
                              (acc, item) => acc + item.harga * item.jumlah,
                              0
                            )}
                            className="w-full py-1.5 pl-12 pr-4 border border-neutral-300 text-start justify-start flex outline-none rounded-md"
                            disabled
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-2 pb-3">
                <Button
                  type="button"
                  variant="destructive"
                  className="bg-green-700 hover:bg-green-600 duration-150 w-full py-2 px-2 text-sm h-auto text-neutral-50"
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
