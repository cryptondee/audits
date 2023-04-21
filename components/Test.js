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

alchemy.ws.on(filter, (log, event) => {
  const tokenA = substring(log.topics[1])
  const tokenB = log.topics[2]
  console.log(log);
  console.log(`---`);
  console.log('topic, method')
  console.log(log.topics[0]);
  console.log('token a')
  console.log(log.topics[1]);
  console.log('token b')
  console.log(log.topics[2]);
  console.log('tx hash')
  console.log(log.transactionHash);
  console.log('report')
  const baseURL = 'https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses='
  if ()
  

});

function Test() {
  return <div>test</div>;
}

export default Test;
