import React, { use, useEffect, useState } from "react";
import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import axios from "axios";

function Test() {
  const [items, setItems] = useState([]);
  const [tokenA, setA] = useState();
  const [tokenB, setB] = useState();
  const [hash, setHash] = useState();
  const [report, setReport] = useState();
  const [prevTokenA, setPrevTokenA] = useState();
  const [prevTokenB, setPrevTokenB] = useState();
  const [gpUrl, setGpUrl] = useState();

  const config = {
    apiKey: process.env.alchemyAPI,
    network: Network.ETH_MAINNET,
  };

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

  const getReport = async (tokenA, tokenB) => {
    const url = tokenA === weth ? `${baseURL}${tokenB}` : `${baseURL}${tokenA}`;
    try {
      const res = await axios.get(url);
      const report = res.data.result;
      const dataToSend = {
        date: new Date(),
        url,
        tokenA,
        tokenB,
        report,
      };
      setGpUrl(url);
      setReport(report);
      if (report !== null) {
        const res = await fetch(`api/addReport`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataToSend),
        });
        if (res.ok) {
          const responseData = await res.json();
          console.log("Response created: ", responseData);
        } else {
          console.error("Error creating response: ", response.statusText);
        }
      }
    } catch (err) {
      console.error("error fetching report: ", err);
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      if (
        tokenA &&
        tokenB &&
        (tokenA !== prevTokenA || tokenB !== prevTokenB)
      ) {
        getReport(tokenA, tokenB);
        setPrevTokenA(tokenA);
        setPrevTokenB(tokenB);
      }
    }, 20000);
  }, [tokenA, tokenB]);

  useEffect(() => {
    const alchemy = new Alchemy(config);
    try {
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
    } catch (error) {
      console.error("Error handling subscription event: ", error);
    }

    return () => {
      alchemy.ws.off(filter);
    };
  }, []);

  function renderObject(obj) {
    return Object.keys(obj).map((key) => {
      const value = obj[key];
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key}>
            <h2>{key}</h2>
            {renderObject(value)}
          </div>
        );
      } else {
        return (
          <div key={key}>
            <h2>{key}</h2>
            <p>{value}</p>
          </div>
        );
      }
    });
  }

  return (
    <div>
      <h2>Token A</h2>
      {tokenA}
      <h2>Token B</h2>
      {tokenB}
      <h2>hash</h2>
      {hash}
      <h2>Report</h2>
      <a href={gpUrl}>{gpUrl}</a>
      {typeof report === "string" && renderObject(JSON.parse(report))}
    </div>
  );
}
export default Test;
