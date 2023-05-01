import React, { use, useEffect, useState } from "react";
import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import axios from "axios";

function Test() {
  const [items, setItems] = useState([]);
  const [tokenA, setA] = useState();
  const [tokenB, setB] = useState();
  const [hash, setHash] = useState();
  const [report, setReport] = useState();

  const config = {
    apiKey: process.env.alchemyAPI,
    network: Network.ETH_MAINNET,
  };

  const alchemy = new Alchemy(config);
  const filter = {
    address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
    topics: [
      "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9", // pairCreated
      //"0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c", // deposit
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
  });

  const getReport = async (tokenA, tokenB) => {
    const url = tokenA === weth ? `${baseURL}${tokenB}` : `${baseURL}${tokenA}`;
    const report = await axios.get(url).then((res) => res.data.result);
    const dataToSend = {
      url,
      tokenA,
      tokenB,
      report,
    };
    setReport(report);
    if (report !== null) {
      const response = await fetch("http://localhost:3000/api/addReport", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Response created:", responseData);
      } else {
        console.error("error creating response:", response.statusText);
      }
    }
  };
  useEffect(() => {
    getReport(tokenA, tokenB);
  }, [tokenA, tokenB]);

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
