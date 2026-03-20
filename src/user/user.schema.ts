import { z } from 'zod'

export const createUserSchema = z.object({
  name: z.string().max(80, 'O nome pode ter no máximo 80 caracteres'),
  email: z
    .string()
    .max(255, 'Email excede a quantidade máxima de caracteres')
    .email('Formato de email inválido'),
  password: z.string(),
  cpf: z.string().max(14, 'CPF inválido'),
  cep: z.string().max(9, 'CEP inálido'),
  avatar_url: z.string().url('Avatar deve ser uma URL válida').optional(),
  rating: z.number(),
  verified: z.boolean(),
})

export const userParamsSchema = z.object({
  id: z.uuid('Formato de id inválido'),
})

export const updateUserSchema = z.object({
  name: z.string().max(80, 'O nome pode ter no máximo 80 caracteres'),
  email: z.string().max(255, 'Email excede a quantidade máxima de caracteres'),
  password: z.string(),
  cep: z.string().max(9, 'CEP inálido').optional(),
  avatar_url: z
    .string()
    .url('Avatar deve ser uma URL válida')
    .optional()
    .optional(),
  rating: z.number().optional(),
  verified: z.boolean().optional(),
})

export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUsernput = z.infer<typeof updateUserSchema>
