import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xFeE5A11e456968e85652b1d71dD5493235168AE2',
)

export default instance
