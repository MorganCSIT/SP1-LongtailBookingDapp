import web3 from "./web3";
import TripFactory from "./build/TripFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  "0x179AEc5ca689F454e1210c6FcD60b0B9dE5860Cb"
);

export default instance;
