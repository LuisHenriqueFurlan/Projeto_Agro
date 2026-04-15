import type { FastifyInstance } from 'fastify'
import { ListingImagesController } from './listing.images.controller'

const listingImagesController = new ListingImagesController()

export async function ListingImagesRoutes(app: FastifyInstance) {
  // CREATE
  app.post('/listing-images', (request, reply) =>
    listingImagesController.createListingImages(request, reply)
  )

  // READ - Get by ID
  app.get('/listing-images/:id', (request, reply) =>
    listingImagesController.getImageByID(request, reply)
  )

  // UPDATE
  app.put('/listing-images/:id', (request, reply) =>
    listingImagesController.updateListingImagem(request, reply)
  )

  // DELETE
  app.delete('/listing-images/:id', (request, reply) =>
    listingImagesController.deleteListingImages(request, reply)
  )
}
