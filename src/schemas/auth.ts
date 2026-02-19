import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().min(1, 'Email обязателен').email('Некорректный формат email'),

  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
})

export const RegisterSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов'),
  email: z.string().min(1, 'Email обязателен').email('Некорректный формат email'),
  password: z.string().min(8, 'Пароль должен быть не короче 8 символов'),
})