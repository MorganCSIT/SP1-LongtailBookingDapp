import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x5F16F3806a31F2f813048a77B45AB667d0d58575',
)

export default instance
