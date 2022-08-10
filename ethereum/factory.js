import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xc14c85d659800e678DbAA100a6bB99efab276174',
)

export default instance
