import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xfD61d7d67Da2aB81A20f1C4C2D012dE44927e522',
)

export default instance
