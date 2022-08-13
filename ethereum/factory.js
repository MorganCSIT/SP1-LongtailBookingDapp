import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0x8cFd31870f7fc3C601F592f944b90A5786e68bea',
)

export default instance
