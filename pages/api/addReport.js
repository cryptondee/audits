import clientPromise from "@/lib/dbConnect";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test").collection("test");
    const result = db.insertOne(req.body);
    res.json(`added ${result.insertedId}`);
  } catch (err) {}
};
