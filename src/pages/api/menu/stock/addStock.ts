import { supabase } from "@utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // const supabase = createServerSupabaseClient({ req, res });
  const { id, quantity, minimumStock } = req.body;

  if (!id || !quantity) {
    return res.status(400).json({ error: "ID and name are required" });
  }

  const { data, error } = await supabase
    .from("tbl_menu")
    .update({ minimum_stock: minimumStock, quantity_stock: quantity })
    .eq("id", id);

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json(data);
}
