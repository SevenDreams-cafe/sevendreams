import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing ID" });
  }

  try {
    const { data, error } = await supabase
      .from("tbl_menu")
      .select(
        `id, name, harga_pokok, harga_jual, stock, image_url, tbl_categori( id, name )`
      )
      .eq("id", id)
      .single();

    if (error) {
      throw error;
    }

    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
