import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { data, error } = await supabase
      .from("tbl_menu")
      .select(
        `id, name, harga_pokok, harga_jual, stock, image_url, tbl_categori( id, name )`
      );
    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
