import { useState } from "react";
import Image from "next/image";
import { Button } from "@components/shadcn/Button";
import { Input } from "@components/shadcn/Input";
import { Label } from "@components/shadcn/Label";

import { SearchIcon } from "@components/icons/SearchIcon";

import { dataMenu } from "@datas/dataMenu";

interface TransaksiProps {
  id: string;
  name: string;
  harga: number;
  jumlah: number;
}

export default function Cashier() {
  const [dataTransaksi, setDataTransaksi] = useState<TransaksiProps[]>([]);

  function handleAddToTransaction(menu: TransaksiProps) {
    setDataTransaksi((prevTransaksi) => {
      const existingItem = prevTransaksi.find((item) => item.id === menu.id);

      if (existingItem) {
        return prevTransaksi.map((item) =>
          item.id === menu.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      } else {
        return [...prevTransaksi, { ...menu, jumlah: 1 }];
      }
    });
  }
  return (
    <div className="flex gap-x-6">
      {/* Bagian Menu Kasir */}
      <section className=" bg-neutral-50 rounded-md w-3/5 items-start">
        <div className="bg-blue-700 rounded-t-md py-3 px-4">
          <h2 className="font-bold text-neutral-50 text-lg">Kasir</h2>
        </div>

        <div className="px-2 py-4">
          <div className="grid grid-cols-2">
            <div className="flex items-center relative lg:w-full">
              <Input
                type="text"
                className="outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 border-neutral-200 bg-neutral-50 w-full pl-8"
                placeholder="Search..."
              />
              <SearchIcon className="absolute w-4 h-4 ml-2.5 fill-neutral-700" />
            </div>
          </div>

          <div className="grid  grid-cols-4 gap-2 mt-6">
            {dataMenu.map((menu, menuIndex) => (
              <button
                key={`${menu.id}${menuIndex + 1}`}
                type="button"
                className="p-2 border border-neutral-300 rounded-md"
                onClick={() =>
                  handleAddToTransaction({
                    id: menu.id,
                    name: menu.name,
                    harga: menu.hargaJual,
                    jumlah: 1,
                  })
                }
              >
                <div className="relative h-36 w-full overflow-hidden">
                  <div className="w-full h-full">
                    <Image
                      src={menu.images}
                      alt="Bakso"
                      className="object-cover"
                      fill
                    />
                  </div>
                </div>
                <div className="mt-2 text-center">
                  <h5 className="text-sm font-bold">{menu.name}</h5>
                  <h6 className="text-sm font-bold text-green-600 mt-1">
                    Rp. {menu.hargaJual}
                  </h6>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bagian Cek Transaksi */}
      <section className="bg-neutral-50 rounded-md w-2/5">
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
                              prev.filter((item) => item.id !== transaksi.id)
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

          <div className="grid justify-end px-4 pb-4">
            <table>
              <tbody className="text-sm">
                <tr>
                  <td>Sub Total</td>
                  <td className="px-2">:</td>
                  <td>
                    Rp.{" "}
                    {dataTransaksi.reduce((acc, item) => acc + item.harga, 0)}
                  </td>
                </tr>
                <tr>
                  <td>PPN (0%)</td>
                  <td className="px-2">:</td>
                  <td>Rp. 0,-</td>
                </tr>
                <tr>
                  <td>Discount</td>
                  <td className="px-2">:</td>
                  <td className="text-red-600 font-bold">0</td>
                </tr>
                <tr className="text-base font-bold">
                  <td>Total</td>
                  <td className="px-2">:</td>
                  <td>
                    Rp.{" "}
                    {dataTransaksi.reduce(
                      (acc, item) => acc + item.harga * item.jumlah,
                      0
                    )}
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
  );
}
