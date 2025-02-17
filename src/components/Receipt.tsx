import React, { forwardRef } from "react";

interface ReceiptProps {
  transactionId: number;
  items: { name: string; harga: number; jumlah: number }[];
  total: number;
}

const Receipt = forwardRef<HTMLDivElement, ReceiptProps>(
  ({ transactionId, items, total }, ref) => {
    return (
      <div ref={ref} className="p-4 border w-[300px]">
        <h2 className="text-lg font-bold text-center">Struk Pembelian</h2>
        <p className="text-sm text-center">ID: {transactionId}</p>
        <hr className="my-2" />
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left">Item</th>
              <th className="text-right">Qty</th>
              <th className="text-right">Harga</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td className="text-right">{item.jumlah}</td>
                <td className="text-right">Rp {item.harga.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <hr className="my-2" />
        <p className="text-right font-bold">
          Total: Rp {total.toLocaleString()}
        </p>
        <p className="text-center text-sm mt-2">Terima Kasih!</p>
      </div>
    );
  }
);

Receipt.displayName = "Receipt";

export default Receipt;
