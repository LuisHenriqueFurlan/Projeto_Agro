import { z } from 'zod'

export const createListingSchema = z.object({
  title: z.string().max(100),
  category: z.string().max(30),
  type: z.enum(['venda', 'aluguel']),
  price: z.number(),
  year: z.number(),
  brand: z.string().max(50),
  model: z.string().max(50),
  hours: z.number().optional(),
  condition: z.enum(['ativo', 'vendido', 'alugado', 'pausado']),
  description: z.string().optional(),
  location: z.string().max(60),
  state: z.string().max(2),
  featured: z.boolean(),
  views: z.number(),
})

export const listingParamsSchema = z.object({
  id: z.uuid('o ID deve ser um UUID válido'),
})

export const updateListingSchema = z.object({
  title: z.string().max(100).optional(),
  category: z.string().max(30).optional(),
  type: z.enum(['venda', 'aluguel']).optional(),
  price: z.number().optional(),
  year: z.number().optional(),
  brand: z.string().max(50).optional(),
  model: z.string().max(50).optional(),
  hours: z.number().optional(),
  condition: z.enum(['ativo', 'vendido', 'alugado', 'pausado']).optional(),
  description: z.string().optional(),
  location: z.string().max(60).optional(),
  state: z.string().max(2).optional(),
  featured: z.boolean().optional(),
  views: z.number().optional(),
})

export type CreateListingInput = z.infer<typeof createListingSchema>
export type UpdateListingInput = z.infer<typeof updateListingSchema>
