import React from "react";
import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";
import axios from "axios";

const config = {
  apiKey: process.env.alchemyAPI,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(config);
const filter = {
  address: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  topics: [
    "0x0d3648bd0f6ba80134a33ba9275ac585d9d315f0ad8355cddefde31afa28d0e9",
  ],
};
const weth = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const baseURL =
  "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=";

alchemy.ws.on(filter, async (log, event) => {
  const zero = "0x";
  const tokenA = zero.concat(log.topics[1].substring(26));
  const tokenB = zero.concat(log.topics[2].substring(26));
  console.log(log);
  console.log(`---`);
  console.log("topic, method");
  console.log(log.topics[0]);
  console.log("token a");
  console.log(log.topics[1]);
  console.log(tokenA);
  console.log("token b");
  console.log(log.topics[2]);
  console.log(tokenB);
  console.log("tx hash");
  console.log(log.transactionHash);
  console.log("report");
  if (tokenA === weth) {
    const report = await axios
      .get(`${baseURL}${tokenB}`)
      .then((res) => res.data)
      .then((data) => console.log(data));
  } else {
    const report = await axios
      .get(`${baseURL}${tokenA}`)
      .then((res) => res.data)
      .then((data) => console.log(data));
  }
});

function Test() {
  return <div>test</div>;
}

export default Test;
