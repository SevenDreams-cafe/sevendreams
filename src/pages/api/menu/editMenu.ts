import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id, name, harga_pokok, harga_jual, image_url, tbl_categori } =
    req.body;

  if (
    !id ||
    !name ||
    !harga_pokok ||
    !harga_jual ||
    !image_url ||
    !tbl_categori
  ) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const { error } = await supabase
      .from("tbl_menu")
      .update({
        name,
        harga_pokok,
        harga_jual,
        image_url,
        tbl_categori_id: tbl_categori.id, // Misalkan kategori direferensikan dengan ID
      })
      .eq("id", id);

    if (error) {
      throw error;
    }

    return res.status(200).json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
