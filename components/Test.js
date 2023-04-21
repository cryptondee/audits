import React from "react";
import { Alchemy, AlchemySubscription, Network } from "alchemy-sdk";

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

alchemy.ws.on(filter, (log, event) => console.log(log));

function Test() {
  return <div>test</div>;
}

export default Test;
