import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xC7A5eE1E0A940aF7848EdFF15CbCa0aCce9FA1A1',
)

export default instance
