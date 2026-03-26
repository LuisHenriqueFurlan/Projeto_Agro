import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(1, 'O nome é obrigatório')
    .max(80, 'O nome pode ter no máximo 80 caracteres'),
  email: z
    .string()
    .min(1, 'O email é obrigatório')
    .max(255, 'Email excede a quantidade máxima de caracteres')
    .email('Formato de email inválido'),
  password: z.string().min(1, 'A senha é obrigatória'),
  cpf: z.string().min(1, 'O CPF é obrigatório').max(14, 'CPF inválido'),
  cep: z.string().min(1, 'O CEP é obrigatório').max(9, 'CEP inálido'),
  avatar_url: z.string().url('Avatar deve ser uma URL válida').optional(),
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
