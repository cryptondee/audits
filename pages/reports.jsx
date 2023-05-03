import React from "react";
import clientPromise from "@/lib/dbConnect";
import DisplayData from "@/components/DisplayData";

export default function Reports({ data }) {
  return <DisplayData data={data} />;
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const reports = await db
      .collection("test")
      .find({})
      .sort({ date: -1 })
      .limit(50)
      .toArray();
    return {
      props: { data: JSON.parse(JSON.stringify(reports)) },
    };
  } catch (err) {
    console.error(err);
  }
}
