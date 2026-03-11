const routes = async (fastify, options) => {

  fastify.get('/', async (request, reply) => {
    return { message: "API funcionando" }
  })

}

module.exports = routes