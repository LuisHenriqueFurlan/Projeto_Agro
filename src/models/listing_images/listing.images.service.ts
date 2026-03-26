import { prisma } from '../../../prisma/prismaClient'
import { ValidationError } from '../../errors/errors'

export interface CreateListingImagesSchemaDTO {
  url: string
  position: number
  listing_id: string
}

export interface UpdateListingImagesSchemaDTO {
  url?: string
  position?: number
}

export class ListingImagesService {
  async createListingImage(data: CreateListingImagesSchemaDTO) {
    if (!data.url || !data.position) {
      throw new ValidationError('Dados faltando')
    }
    const listingImages = await prisma.listing_image.create({
      data: {
        url: data.url,
        position: data.position,
        listing_id: data.listing_id,
      },
      select: {
        id: true,
        listing_id: true,
        url: true,
        position: true,
      },
    }) 
      return listingImages
  }  
  async getListingImages(id: string) {
    const listing
  }
}
