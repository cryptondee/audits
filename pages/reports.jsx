import React from "react";
import clientPromise from "@/lib/dbConnect";

export default function Reports({ reports }) {
  return (
    <>
      <div>
        <h1> Reports hi</h1>
        <ul>
          {reports.map((report) => {
            <li>
              <h4>report.date</h4>
              <h4>report.tokenA</h4>
              <h4>report.tokenB</h4>
              <p>report.report</p>
            </li>;
          })}
        </ul>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const reports = await db
      .collection("test")
      .find({})
      .sort({ date: -1 })
      .limit(25)
      .toArray();
    return {
      props: { reports: JSON.parse(JSON.stringify(reports)) },
    };
  } catch (err) {
    console.error(err);
  }
}
