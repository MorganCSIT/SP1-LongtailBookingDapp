import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xA5fd761Babbb0aC52543C7D5560EbDB259513966',
)

export default instance
