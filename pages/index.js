import Test from "@/components/Test.jsx";
import React from "react";
import DisplayData from "@/components/DisplayData";
import clientPromise from "@/lib/dbConnect";

export default function Home({ data }) {
  return (
    <main>
      <div>
        <h2>Token audits</h2>
        <p>amount of tokens in the db: {data}</p>
      </div>
    </main>
  );
}
export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const reports = await db.collection("test").countDocuments();
    return {
      props: { data: JSON.parse(JSON.stringify(reports)) },
    };
  } catch (err) {
    console.error(err);
  }
}
