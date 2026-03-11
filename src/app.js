const Fastify = require('fastify')
const routes = require('./routes')

const app = Fastify()

app.register(routes)

module.exports = app