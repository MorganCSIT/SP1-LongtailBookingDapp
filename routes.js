const routes = require('next-routes')()

routes
  .add('/trips/new', '/trips/new')
  .add('/trips/:address', '/trips/show')
  .add('/trips/:address/votes', '/trips/captain/index')
  .add('/trips/:address/captain', '/trips/captain/index')

module.exports = routes
