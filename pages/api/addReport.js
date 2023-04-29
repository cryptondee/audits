import dbConnect from "@/lib/dbConnect";
import Response from "@/models/Response";

export default async function myDB(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }
  await dbConnect();
  try {
    const newReport = await Response.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
