import web3 from './web3'
import TripFactory from './build/TripFactory.json'

const instance = new web3.eth.Contract(
  JSON.parse(TripFactory.interface),
  '0xbbF023Fb6c3A2E679225033Ff32f56a6d1cDa8D3',
)

export default instance
