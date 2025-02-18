import { Aboreto } from "next/font/google";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
}

const ars_one_sans = Aboreto({ subsets: ["latin"], weight: "400" });

export default function CetakStruk() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [customers, setCustomers] = useState("");
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">(
    "desktop"
  );

  useEffect(() => {
    const cartData = searchParams.get("data");
    const bayarData = searchParams.get("dibayar");
    const kembalianData = searchParams.get("kembalian");
    const customersData = searchParams.get("customers");

    if (cartData) {
      const parsedCart: CartItem[] = JSON.parse(decodeURIComponent(cartData));
      setCart(parsedCart);

      const totalHarga = parsedCart.reduce(
        (sum, item) => sum + item.harga * item.jumlah,
        0
      );
      setTotal(totalHarga);
    }

    if (customersData) setCustomers(customersData);
    if (bayarData) setBayar(Number(bayarData));
    if (kembalianData) setKembalian(Number(kembalianData));

    // Deteksi apakah perangkat adalah mobile, tablet, atau desktop
    const userAgent = navigator.userAgent.toLowerCase();
    const width = window.innerWidth;

    if (/mobi|android/i.test(userAgent)) {
      setDeviceType("mobile");
    } else if (width >= 768 && width <= 1024) {
      setDeviceType("tablet");
    } else {
      setDeviceType("desktop");
    }

    // Jika perangkat mobile atau tablet, cetak otomatis setelah delay
    if (deviceType !== "desktop") {
      if (/mobi|android/i.test(userAgent) || (width >= 768 && width <= 1024)) {
        setTimeout(() => {
          window.print();
        }, 1000);
      }
    }
  }, [searchParams, router]);

  const Dates = new Date().getDate();
  const Month = new Date().getMonth() + 1;
  const Years = new Date().getFullYear();
  const Hours = new Date().getHours();
  const Minutes = new Date().getMinutes();

  return (
    <div
      className={`px-6 text-center mt-10 w-[30%] print:w-full mx-auto text-xs ${ars_one_sans.className}`}
    >
      <div className="flex gap-x-1 justify-end mb-4 ">
        <span>
          {Dates} - {Month} - {Years}
        </span>
        <span>
          {Hours}:{Minutes}
        </span>
      </div>
      <h1 className="text-base font-bold mb-4 uppercase">SevenDreams</h1>
      <p className=" text-center uppercase">
        JL. Kompleks YPPKG Blok. K3 A No 39, Paccerakkang, Kec. Biringkanayya
        90421
      </p>

      <div className="flex flex-col gap-y-2 mt-6 ">
        <div className="flex  justify-between">
          <p>Customer</p>
          <p>{customers}</p>
        </div>
        <div className="flex  justify-between">
          <p>Trace Number</p>
          <p>00000</p>
        </div>
        <div className="flex  justify-between">
          <p>Payment Method</p>
          <p>Cash</p>
        </div>
        <div className="flex  justify-between">
          <p>Cashier</p>
          <p>SEVEN DREAMS</p>
        </div>
        <div className="flex  justify-between">
          <p>Status</p>
          <p>Paid</p>
        </div>
        <hr className="border-black border border-dashed w-full my-4" />
        <ul className="flex flex-col gap-y-2 list-disc ml-5 ">
          {cart.map((transaksi, transaksiIndex) => (
            <li key={transaksiIndex + 1}>
              <ul>
                <li className="flex justify-between items-start text-start">
                  <h6 className="font-bold">{transaksi.name}</h6>
                </li>
                <li className="flex justify-between items-start text-start">
                  <div className="flex gap-x-2">
                    <span>{transaksi.jumlah}x</span>
                    <span>Rp. {transaksi.harga.toLocaleString()}</span>
                  </div>
                  <h6 className="font-bold">
                    Rp. {(transaksi.jumlah * transaksi.harga).toLocaleString()}
                  </h6>
                </li>
              </ul>
            </li>
          ))}
        </ul>
        <hr className="border-black border border-dashed w-full my-4" />
        <div className="flex  justify-between font-extrabold">
          <p>SubTotal ({cart.length} Items)</p>
          <p>Rp {total.toLocaleString()}</p>
        </div>
        <div className="flex  justify-between">
          <p>Cash</p>
          <p>Rp {bayar.toLocaleString()}</p>
        </div>
        <div className="flex  justify-between">
          <p>Change</p>
          <p>Rp {kembalian.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-center  font-semibold mt-10">
        Terima Kasih Atas Kunjungan Anda
      </p>

      {/* Tombol Cetak */}
      <button
        className="mt-4 bg-red-600 text-white px-3 py-2  rounded-md hover:bg-red-500 print:hidden mr-2"
        onClick={() => router.back()}
      >
        Kembali
      </button>
      <button
        className="mt-4 bg-blue-600 text-white px-3 py-2  rounded-md hover:bg-blue-500 print:hidden"
        onClick={() => window.print()}
      >
        Cetak Struk
      </button>
    </div>
  );
}
