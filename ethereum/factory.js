import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xd22c3F63EAEdd7A491D13dA8abDe42A45655d495',
)

export default instance
