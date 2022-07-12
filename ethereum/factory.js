import web3 from "./web3";
import TripFactory from "./build/TripFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  "0xFf4C7dAdFFf579ae8fA0D980f54008103966447C"
);

export default instance;
