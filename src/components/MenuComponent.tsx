import { Dispatch, type SetStateAction } from "react";

interface MenuComponentProps {
  menuIndex: string;
  menuID: number;
  images: string;
  name: string;
  hargaJual: number;
  hargaPokok: number;
  setDataTransaksi: Dispatch<SetStateAction<TransaksiProps[]>>;
}

interface TransaksiProps {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
  grand_modal: number;
}

export function MenuComponent({
  menuIndex,
  menuID = 0,
  images = "",
  name = "",
  hargaJual = 0,
  hargaPokok = 0,
  setDataTransaksi,
}: MenuComponentProps) {
  function handleAddToTransaction(menu: TransaksiProps) {
    setDataTransaksi((prevTransaksi: TransaksiProps[]) => {
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
    <button
      key={`${menuID}${menuIndex + 1}`}
      type="button"
      className="border border-neutral-300 relative"
      onClick={() =>
        handleAddToTransaction({
          id: menuID,
          name: name,
          harga: hargaJual,
          jumlah: 1,
          grand_modal: hargaPokok,
        })
      }
    >
      <div className="relative h-36 bg-black w-full mt-0">
        <img src={images} alt="Bakso" className="object-cover w-full h-full" />
      </div>

      <h5 className="text-sm font-bold px-2 py-4">{name}</h5>
      {/* <div className="mt-2 text-center absolute bg-neutral-900/70 w-full bottom-0 py-2"> */}
      {/* <h5 className="text-sm font-bold px-2 text-neutral-50">{name}</h5> */}
      {/* <h6 className="text-sm font-bold text-green-600 mt-1">
          {hargaJual.toLocaleString()}
        </h6> */}
      {/* </div> */}
    </button>
  );
}
