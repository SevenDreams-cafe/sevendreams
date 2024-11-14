import Image from "next/image";

import { dataMenu } from "@datas/dataMenu";

export default function Cashier() {
  return (
    <main className="ml-[280px] mt-28 grid">
      <section className="mx-6 bg-neutral-50 rounded-md">
        <div className="bg-blue-700 rounded-t-md py-3 px-4">
          <h2 className="font-bold text-neutral-50 text-lg">Kasir</h2>
        </div>

        <div className="px-2 grid  grid-cols-6 py-4">
          {dataMenu.map((menu, menuIndex) => (
            <button
              className="p-2 border border-neutral-300 rounded-md"
              key={`${menu.id}${menuIndex + 1}`}
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
      </section>
    </main>
  );
}
