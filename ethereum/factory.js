import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xFb797ea8Bc10b296D605655d90AB076f425e5A92',
)

export default instance
