import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xC9aA14D2f40F929BcD7Bb8C80C66a24b88ca7553',
)

export default instance
