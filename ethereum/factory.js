import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x49Bf852BAe20d44f0BAa6F761F5f2d846E2DBa9c',
)

export default instance
