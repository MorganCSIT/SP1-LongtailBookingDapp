import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xbBCc6594041dD0fA6f0B6A1f78941e0e8C11FcC2',
)

export default instance
