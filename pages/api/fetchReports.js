import clientPromise from "@/lib/dbConnect";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test").collection("test");
    const result = await db.find({}).sort({ date: -1 }).limit(50).toArray();
    res.json(result);
  } catch (error) {
    console.error(error);
  }
};
