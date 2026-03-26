import { success } from 'zod'
import {
  MissingFieldError,
  NotFoundError,
  ValidationError,
} from '../../errors/errors'
import {
  userService,
  type CreateUserSchemaDTO,
  type UpdateUserSchemaDTO,
} from './user.service'
import type { FastifyRequest, FastifyReply } from 'fastify'

export interface ParamsInterface {
  id: string
}

export class UserController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateUserSchemaDTO

    if (!data || Object.keys(data).length === 0) {
      throw new MissingFieldError()
    }

    const user = await userService.createUser(data)

    return reply.status(201).send({
      success: true,
      message: 'Sucesso ao criar o usuário',
      data: user,
    })
  }

  async getUserByID(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as ParamsInterface

    const user = await userService.getUserByID(id)

    if (!user) {
      throw new NotFoundError('Erro ao encontrar o usuário')
    }

    return reply.status(200).send({
      status: success,
      message: 'Usuário encontrado com sucesso',
      data: user,
    })
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as UpdateUserSchemaDTO
    const { id } = request.params as ParamsInterface

    const user = await userService.updateUser(data, id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao atualizar o usuário',
      data: user,
    })
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as ParamsInterface

    const result = await userService.deleteUser(id)

    const test = await userService.getUserByID(id)

    if (test) {
      throw new ValidationError('Erro ao deletar o produto')
    }

    return reply.send({
      success: true,
      message: result.message,
    })
  }
}

export const userController = new UserController()
