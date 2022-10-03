import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x5b0361e28b8dc10328BdcE4434A7c143e91d649f',
)

export default instance
