import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xcF4F0fB87eF66362Ac23B06844755090De880496',
)

export default instance
