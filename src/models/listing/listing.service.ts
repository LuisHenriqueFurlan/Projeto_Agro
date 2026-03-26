import { prisma } from '../../../prisma/prismaClient'
import {
  MissingFieldError,
  NotFoundError,
  ValidationError,
} from '../../errors/errors'
import type { CreateListingInput, UpdateListingInput } from './listing.schema'

export interface CreateListingDTO extends CreateListingInput {}

export interface UpdateListingDTO extends UpdateListingInput {}

export class ListingService {
  async createListing(data: CreateListingDTO) {
    if (
      !data.title ||
      !data.category ||
      !data.price ||
      !data.year ||
      !data.brand ||
      !data.year ||
      !data.brand ||
      !data.model ||
      !data.location ||
      !data.state ||
      !data.state ||
      !data.views
    ) {
      throw new MissingFieldError()
    }

    if (data.type !== 'venda' && data.type !== 'aluguel') {
      throw new ValidationError('Tipo de ação inválida')
    }

    if (
      data.condition !== 'alugado' &&
      data.condition !== 'ativo' &&
      data.condition !== 'pausado' &&
      data.condition !== 'vendido'
    ) {
      throw new ValidationError('Condição inválida')
    }

    try {
      const list = await prisma.listing.create({
        data: {
          title: data.title,
          category: data.category,
          type: data.type,
          price: data.price,
          year: data.year,
          brand: data.brand,
          model: data.model,
          hours: data.hours,
          condition: data.condition,
          description: data.description,
          location: data.location,
          state: data.state,
          featured: data.featured,
          views: data.views,
        },
      })

      return list
    } catch (err: any) {
      throw new ValidationError('Erro ao criar a listagem', err)
    }
  }

  async getListingByID(id: string) {
    const list = await prisma.listing.getUnique({
      where: { id },
    })

    if (!list) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async getListingByTitle(title: string) {
    const list = await prisma.listing.getMany({
      where: { title: { contains: title, mode: 'insensitive' } },
    })

    if (list.length === 0) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async getListingByBrand(brand: string) {
    const list = await prisma.listing.getMany({
      where: { brand },
    })
    if (list.length === 0) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async getListingByYear(year: number) {
    const list = await prisma.listing.getMany({
      where: { year },
    })

    if (list.length === 0) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async getListingByCategory(category: string) {
    const list = await prisma.listing.getMany({
      where: { category },
    })

    if (list.length === 0) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async getListingByType(type: 'venda' | 'aluguel') {
    const list = await prisma.listing.getMany({
      where: { type },
    })

    if (list.length === 0) {
      throw new NotFoundError('Erro ao encontrar a listagem')
    }

    return list
  }

  async searchListings(filters: {
    title?: string
    brand?: string
    year?: number
    category?: string
    type?: 'venda' | 'aluguel'
    condition?: string
  }) {
    return prisma.listing.getMany({
      where: {
        ...(filters.title && {
          title: { contains: filters.title, mode: 'insensitive' },
        }),
        ...(filters.brand && { brand: filters.brand }),
        ...(filters.category && { category: filters.category }),
        ...(filters.year && { year: filters.year }),
        ...(filters.type && { type: filters.type }),
        ...(filters.condition && { condition: filters.condition }),
      },
    })
  }

  async updateListing(data: UpdateListingDTO, id: string) {
    const getList = await prisma.listing.getUnique({
      where: { id },
    })

    if (!getList) {
      throw new NotFoundError('Erro ao encontrar a listagem para atualizar')
    }

    try {
      const list = await prisma.listing.update({
        where: { id },
        data: {
          title: data.title,
          category: data.category,
          type: data.type,
          price: data.price,
          year: data.year,
          brand: data.brand,
          model: data.model,
          hours: data.hours,
          condition: data.condition,
          description: data.description,
          location: data.location,
          state: data.state,
          featured: data.featured,
          views: data.views,
        },
      })

      if (!list) {
        throw new ValidationError('Erro ao atualizar a listagem')
      }

      return list
    } catch (err: any) {
      throw new ValidationError('Erro a atualizar a listagem', err)
    }
  }

  async deleteListing(id: string) {
    const list = await prisma.listing.getUnique({
      where: { id },
    })

    if (!list) {
      throw new NotFoundError('Erro ao encontrar a listagem para deleta-la')
    }

    const deletedList = await prisma.listing.delete({
      where: { id },
    })

    if (!deletedList) {
      throw new ValidationError('Erro ao deletar a listagem')
    }

    return { message: 'Sucesso ao deletar a litagem' }
  }
}

export const listingService = new ListingService()
