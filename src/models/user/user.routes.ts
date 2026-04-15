import type { FastifyInstance } from 'fastify'
import { userController } from './user.controller.js'

export async function userRoutes(app: FastifyInstance) {
  // Criar usuário
  app.post('/users', async (request, reply) => {
    return userController.createUser(request, reply)
  })

  // Obter usuário por ID
  app.get('/users/:id', async (request, reply) => {
    return userController.getUserByID(request, reply)
  })

  // Atualizar usuário
  app.put('/users/:id', async (request, reply) => {
    return userController.updateUser(request, reply)
  })

  // Deletar usuário
  app.delete('/users/:id', async (request, reply) => {
    return userController.deleteUser(request, reply)
  })
}
