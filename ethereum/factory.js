import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x5286BC2A7B66181fE13C50B69295371182C1E031',
)

export default instance
