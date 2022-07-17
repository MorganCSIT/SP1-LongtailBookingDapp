const routes = require('next-routes')()

routes.add('/trips/new', '/trips/new').add('/trips/:address', '/trips/show')

module.exports = routes
