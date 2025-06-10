import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { kode } = req.query;

  if (!kode) {
    return res.status(400).json({ message: "Missing ID" });
  }

  try {
    const { data, error } = await supabase
      .from("tbl_transaksi")
      .select(
        `
            id,
            created_at,
            kode,
            customers,
            grand_total,
            grand_modal,
            tbl_transaksi_detail (
              id,
              kd_transaksi,
              jumlah,
              harga,
              tbl_menu (
                id,
                name,
                harga_pokok,
                harga_jual,
                tbl_categori (
                  id,
                  name
                )
              )
            )
          `
      )
      .eq("kode", kode)
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
