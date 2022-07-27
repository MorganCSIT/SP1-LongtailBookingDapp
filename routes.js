const routes = require('next-routes')()

routes
  .add('/trips/new', '/trips/new')
  .add('/trips/:address', '/trips/show')
  .add('/trips/:address/votes', '/trips/votes/index')

module.exports = routes
