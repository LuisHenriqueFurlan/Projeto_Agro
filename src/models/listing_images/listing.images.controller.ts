import type { FastifyRequest, FastifyReply } from 'fastify'
import {
  listingImagesService,
  type CreateListingImagesSchemaDTO,
  type UpdateListingImagesSchemaDTO,
} from './listing.images.service'
import { MissingFieldError } from '../../errors/errors'

export class ListingImagesController {
  async createListingImages(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as CreateListingImagesSchemaDTO

    if (!data || Object.keys(data).length === 0) {
      throw new MissingFieldError()
    }

    const imagem = await listingImagesService.createListingImage(data)

    return reply.status(201).send({
      success: true,
      message: 'Sucesso ao criar a imagem',
      data: imagem,
    })
  }

  async getImageByID(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    const imagem = await listingImagesService.getListingImages(id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao encontrar a imagem',
      data: imagem,
    })
  }

  async updateListingImagem(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as UpdateListingImagesSchemaDTO
    const { id } = request.params as { id: string }

    const imagem = await listingImagesService.updateListingImages(data, id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao atualizar a imagem',
      data: imagem,
    })
  }

  async deleteListingImages(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string }

    await listingImagesService.deleteListingImages(id)

    return reply.status(200).send({
      success: true,
      message: 'Sucesso ao deletar a imagem',
    })
  }
}
