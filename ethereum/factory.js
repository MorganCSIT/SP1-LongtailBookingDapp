import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x80F6BA8A4Df583DF14Cc89D996C6eae9abEccC3d',
)

export default instance
