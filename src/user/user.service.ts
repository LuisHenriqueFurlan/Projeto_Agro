import { ValidationError } from '../errors/errors'
import { prisma } from '../../prisma/prismaClient'
import bcrypt from 'bcrypt'

const BCRYPT_ROUNDS = 10

export interface CreateUserSchemaDTO {
  name: string
  email: string
  password: string
  cpf: string
  cep: string
  phone: string
  avatar_url?: string
}

export interface UpdateUserSchemaDTO {
  name: string
  email: string
  password?: string
  cep?: string
  phone?: string
  avatar_url?: string
  rating?: number
  verified?: boolean
}

interface PrismaUniqueError {
  code: string
  meta?: { target?: string[] }
}

export class UserService {
  async createUser(data: CreateUserSchemaDTO) {
    if (
      !data.name ||
      !data.email ||
      !data.password ||
      !data.cpf ||
      !data.cep ||
      !data.phone
    ) {
      throw new ValidationError('Dados faltando')
    }
    if (data.password.length < 6) {
      throw new ValidationError('Senha curta demais')
    }

    try {
      const password_hash = await bcrypt.hash(data.password, BCRYPT_ROUNDS)

      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password_hash,
          cep: data.cep,
          cpf: data.cpf,
          phone: data.phone,
          avatar_url: data.avatar_url,
        },
        select: {
          id: true,
          name: true,
          email: true,
          cep: true,
          cpf: true,
          phone: true,
          avatar_url: true,
          rating: true,
          verified: true,
        },
      })

      return user
    } catch (error) {
      const err = error as PrismaUniqueError
      if (err.code === 'P2002') {
        const field = err.meta?.target?.[0]
        if (field === 'email') {
          throw new ValidationError('Email já registrado')
        } else if (field === 'cpf') {
          throw new ValidationError('CPF já registrado')
        }
      }
      throw error
    }
  }

  async getUserByID(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        cep: true,
        cpf: true,
        phone: true,
        avatar_url: true,
        rating: true,
        verified: true,
      },
    })

    return user
  }

  async updateUser(data: UpdateUserSchemaDTO, id: string) {
    try {
      const updateData: Partial<Omit<UpdateUserSchemaDTO, 'password'>> & {
        password_hash?: string
      } = {}

      if (data.name) updateData.name = data.name
      if (data.email) updateData.email = data.email
      if (data.cep) updateData.cep = data.cep
      if (data.phone) updateData.phone = data.phone
      if (data.avatar_url) updateData.avatar_url = data.avatar_url
      if (data.rating !== undefined) updateData.rating = data.rating
      if (data.verified !== undefined) updateData.verified = data.verified

      if (data.password) {
        updateData.password_hash = await bcrypt.hash(
          data.password,
          BCRYPT_ROUNDS
        )
      }

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          email: true,
          cep: true,
          cpf: true,
          phone: true,
          avatar_url: true,
          rating: true,
          verified: true,
        },
      })

      return user
    } catch (error) {
      const err = error as PrismaUniqueError
      if (err.code === 'P2002') {
        const field = err.meta?.target?.[0]
        if (field === 'email') {
          throw new ValidationError('Email já em uso')
        } else if (field === 'cpf') {
          throw new ValidationError('CPF já em uso')
        }
      }
      throw error
    }
  }

  async deleteUser(id: string) {
    await prisma.user.delete({
      where: { id },
    })

    return { message: 'User deletado com sucesso' }
  }

  async verifyPassword(password: string, password_hash: string) {
    return bcrypt.compare(password, password_hash)
  }
}

export const userService = new UserService()
