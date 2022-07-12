import web3 from "./web3";
import TripFactory from "./build/TripFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  "0x798661E4bB0a23a5D36a997e0D2dF7b4b85FCF9c"
);

export default instance;
