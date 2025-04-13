import { Dispatch, type SetStateAction } from "react";

interface MenuComponentProps {
  menuIndex: string;
  menuID: number;
  images: string;
  name: string;
  hargaJual: number;
  setDataTransaksi: Dispatch<SetStateAction<TransaksiProps[]>>;
}

interface TransaksiProps {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
}

export function MenuComponent({
  menuIndex,
  menuID = 0,
  images = "",
  name = "",
  hargaJual = 0,
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
      className="pb-2 border border-neutral-300 rounded-md"
      onClick={() =>
        handleAddToTransaction({
          id: menuID,
          name: name,
          harga: hargaJual,
          jumlah: 1,
        })
      }
    >
      <div className="relative h-36 w-full rounded-t overflow-hidden top-0">
        <img src={images} alt="Bakso" className="object-cover w-full h-full" />
      </div>
      {/* <div className="mt-2 text-center">
        <h5 className="text-sm font-bold px-2">{name}</h5>
        <h6 className="text-sm font-bold text-green-600 mt-1">
          {hargaJual.toLocaleString()}
        </h6>
      </div> */}
    </button>
  );
}
