import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface CartItem {
  id: number;
  name: string;
  harga: number;
  jumlah: number;
}

export default function CetakStruk() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [kembalian, setKembalian] = useState(0);
  const [customers, setCustomers] = useState("");

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

    // Event listener untuk kembali ke halaman transaksi setelah cetak
    const handleAfterPrint = () => {
      router.push("/cashier"); // Redirect ke halaman transaksi
    };

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [searchParams, router]);

  const Dates = new Date().getDate();
  const Month = new Date().getMonth() + 1;
  const Years = new Date().getFullYear();
  const Hours = new Date().getHours();
  const Minutes = new Date().getMinutes();
  const Seconds = new Date().getSeconds();

  return (
    <div className="max-w-md mx-auto p-6 border rounded-md shadow-md text-center">
      <div className="flex gap-x-1 justify-end mb-2">
        <span>
          {Dates} - {Month} - {Years}
        </span>
        <span>
          {Hours}:{Minutes}:{Seconds}
        </span>
      </div>
      <h1 className="text-2xl font-bold mb-4 uppercase">SevenDreams</h1>
      <p className="text-sm mx-16 uppercase">
        JL. Kompleks YPPKG Blok. K3 A No 39, Paccerakkang, Kec. Biringkanayya
        90421
      </p>

      <div className="flex flex-col gap-y-2 mt-6">
        <div className="flex text-sm justify-between">
          <p>Customer</p>
          <p>{customers}</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Trace Number</p>
          <p>00000</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Payment Method</p>
          <p>Cash</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Cashier</p>
          <p>SEVEN DREAMS</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Status</p>
          <p>Paid</p>
        </div>

        <hr className="border-black border border-dashed w-full my-4" />

        <ul className="flex flex-col gap-y-2 list-disc ml-5 text-sm">
          {cart.map((transaksi, transaksiIndex) => (
            <li key={transaksiIndex + 1}>
              <ul>
                <li className="flex justify-between items-start text-start">
                  <h6 className="font-bold">{transaksi.name}</h6>
                  <h6>Rp. {transaksi.harga.toLocaleString()}</h6>
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

        <div className="flex text-base justify-between font-extrabold">
          <p>SubTotal ({cart.length} Items)</p>
          <p>Rp {total.toLocaleString()}</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Cash</p>
          <p>Rp {bayar.toLocaleString()}</p>
        </div>
        <div className="flex text-sm justify-between">
          <p>Change</p>
          <p>Rp {kembalian.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-center text-sm font-semibold mt-10">
        Terima Kasih Telah Memesan Menu Kami
      </p>

      {/* Tombol Cetak */}
      <button
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 print:hidden"
        onClick={() => window.print()}
      >
        Cetak Struk
      </button>
    </div>
  );
}
