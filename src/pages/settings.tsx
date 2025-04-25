import { InformasiToko } from "@components/settings/InformasiToko";
import { PengaturanKasir } from "@components/settings/PengaturanKasir";

export default function SettingsStruk() {
  return (
    <div className="pb-20">
      {/* Settings info shop */}
      <InformasiToko />

      {/* Settings Cashier */}
      <PengaturanKasir />
    </div>
  );
}
