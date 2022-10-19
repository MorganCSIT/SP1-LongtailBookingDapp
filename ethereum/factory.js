import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xa94eFA25d2202b9A3A6f3c608b69377d20fE939C',
)

export default instance
