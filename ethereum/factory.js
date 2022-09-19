import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x7a2712Bae334376324575bB19595f6285330A32e',
)

export default instance
