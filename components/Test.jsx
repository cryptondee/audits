import React, { useEffect, useState } from "react";
import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import axios from "axios";
import mongoose from "mongoose";

function Test() {
  const [items, setItems] = useState([]);
  const [tokenA, setA] = useState();
  const [tokenB, setB] = useState();
  const [hash, setHash] = useState();
  const [report, setReport] = useState();

  mongoose.connect(
    "mongodb+srv://ndwong2012:lfQB9KI8vSRSp0OD@cluster0.fwdsenb.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const responseSchema = new mongoose.Schema({
    url: { type: String, required: true },
    tokenA: { type: String, required: true },
    tokenB: { type: String, required: true },
    report: { type: Object, required: true },
  });

  const Response = mongoose.model("Response", responseSchema);

  const config = {
    apiKey: process.env.alchemyAPI,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);
  const filter = {
    address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    topics: [
      "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9", // pairCreated
      "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c", // deposit
    ],
  };
  const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
  const baseURL =
    "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=";

  alchemy.ws.on(filter, async (log, event) => {
    const zero = "0x";
    const tokenA = zero.concat(log.topics[1].substring(26));
    const tokenB = zero.concat(log.topics[2].substring(26));
    console.log("token A");
    console.log(tokenA);
    console.log("token B");
    console.log(tokenB);
    console.log("tx hash");
    console.log(log.transactionHash);
    console.log("report");
    setA(tokenA);
    setB(tokenB);
    setHash(log.transactionHash);
    getReport(tokenA, tokenB);
  });

  const getReport = async (tokenA, tokenB) => {
    if (tokenA === weth) {
      const url = `${baseURL}${tokenB}`;
      const report = await axios
        .get(`${url}`)
        .then((res) => res.data)
        .then((data) => console.log(data.result));
      setReport(report);
      const newResponse = new Response({ url, tokenA, tokenB, report });
      await newResponse.save();
    } else {
      const url = `${baseURL}${tokenA}`;
      const report = await axios
        .get(`${url}`)
        .then((res) => res.data)
        .then((data) => console.log(data.result));
      setReport(report);
      const newResponse = new Response({ url, tokenA, tokenB, report });
      await newResponse.save();
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h2>Token A</h2>
      {tokenA}
      <h2>Token B</h2>
      {tokenB}
      <h2>hash</h2>
      {hash}
      <h2>Report</h2>
      {JSON.stringify(report, null, 2)}
    </div>
  );
}

export default Test;
