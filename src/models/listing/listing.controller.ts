import type { FastifyRequest, FastifyReply } from 'fastify'
import {
  listingService,
  type CreateListingDTO,
  type UpdateListingDTO,
} from './listing.service'
import { MissingFieldError } from '../../errors/errors'

interface filter {
  title?: string
  brand?: string
  year?: number
  category?: string
  type?: 'venda' | 'aluguel'
  condition?: string
}

export class ListingController {
  async createListing(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateListingDTO

    if (!data || Object.keys(data).length === 0) {
      throw new MissingFieldError()
    }

    const list = await listingService.createListing(data)

    return reply.status(201).send({
      success: true,
      message: 'Sucesso ao criar a listagem',
      data: list,
    })
  }

  async getListingByID(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const list = await listingService.getListingByID(id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao enconstrar a listagem',
      data: list,
    })
  }

  async getListingByTitle(request: FastifyRequest, reply: FastifyReply) {
    const { title } = request.body as { title: string }

    const list = await listingService.getListingByTitle(title)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async getListingByBrand(request: FastifyRequest, reply: FastifyReply) {
    const { brand } = request.body as { brand: string }

    const list = await listingService.getListingByBrand(brand)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async getListingByYear(request: FastifyRequest, reply: FastifyReply) {
    const { year } = request.body as { year: number }

    const list = await listingService.getListingByYear(year)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async getListingByCategory(request: FastifyRequest, reply: FastifyReply) {
    const { category } = request.body as { category: string }

    const list = await listingService.getListingByID(category)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async getListingByType(request: FastifyRequest, reply: FastifyReply) {
    const { type } = request.body as { type: 'venda' | 'aluguel' }

    const list = await listingService.getListingByID(type)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async searchListing(request: FastifyRequest, reply: FastifyReply) {
    const filter = request.body as filter

    const list = await listingService.searchListings(filter)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a listagem',
      data: list,
    })
  }

  async updateListing(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }
    const data = request.body as UpdateListingDTO

    const list = await listingService.updateListing(data, id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao atualizar a listagem',
      data: list,
    })
  }

  async deleteListing(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    await listingService.deleteListing(id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao deletar a listagem',
    })
  }
}
