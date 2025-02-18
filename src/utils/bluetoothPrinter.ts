export const connectToBluetoothPrinter =
  async (): Promise<BluetoothDevice | null> => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["000018f0-0000-1000-8000-00805f9b34fb"], // UUID ESC/POS
      });

      console.log("Perangkat terhubung:", device.name);
      return device;
    } catch (error) {
      console.error("Gagal terhubung ke printer:", error);
      return null;
    }
  };

export const printReceipt = async (device: BluetoothDevice, text: string) => {
  try {
    const server = await device.gatt?.connect();
    const service = await server?.getPrimaryService(
      "000018f0-0000-1000-8000-00805f9b34fb"
    );
    const characteristic = await service?.getCharacteristic(
      "00002af1-0000-1000-8000-00805f9b34fb"
    );

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    await characteristic?.writeValue(data);
    console.log("Struk berhasil dikirim ke printer");
  } catch (error) {
    console.error("Gagal mencetak struk:", error);
  }
};
