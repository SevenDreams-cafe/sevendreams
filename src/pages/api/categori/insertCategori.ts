// pages/api/insertItem.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@utils/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name } = req.body;

    // Validasi input (optional)
    if (!name) {
      return res.status(400).json({ message: "Name and price are required." });
    }

    // Insert data ke tabel Supabase
    const { data, error } = await supabase
      .from("tbl_categori")
      .insert([{ name }])
      .select();

    if (error) {
      return res.status(500).json({ message: error.message });
    }

    return res
      .status(200)
      .json({ message: "Item inserted successfully", data });
  } else {
    // Jika metode selain POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
