import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x00036b5b03cCcd8CB91695E9131ba38bEC30C7E2',
)

export default instance
