const { default: axios } = require("axios");

const baseURL =
  "https://api.gopluslabs.io/api/v1/token_security/1?contract_addresses=";
const token = "0x6982508145454Ce325dDbE47a25d4ec3d2311933";
const getRes = async () => {
  const res = await axios.get(`${baseURL}${token}`);
  const obj = await res.data.result;
  const clean = displayNested(obj);
  console.log(JSON.stringify(clean, null, 2));
};

const displayNested = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      newObj[key] = displayNested(obj[key]);
    } else {
      newObj[key] = obj[key];
    }
  });
  return newObj;
};
getRes();
