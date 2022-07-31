import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xE24F29932A2B1878af995F193fe9Ae67d2967b03',
)

export default instance
