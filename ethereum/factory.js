import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xf5AF3BBd56118769C11E44BB4AA2a261a7b99CEF',
)

export default instance
