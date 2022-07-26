import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xA614BB4d44996E6BCb794ed71df18Af50cc23391',
)

export default instance
