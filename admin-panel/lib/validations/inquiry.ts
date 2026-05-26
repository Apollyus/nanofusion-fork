import { z } from 'zod'

export const inquirySchema = z.object({
  name: z.string().min(2, 'Zadejte celé jméno (min. 2 znaky)'),
  email: z.string().email('Neplatná e-mailová adresa'),
  phone: z
    .string()
    .regex(
      /^(\+420)?\s?\d{3}\s?\d{3}\s?\d{3}$/,
      'Neplatné číslo (formát: 603 123 456 nebo +420 603 123 456)'
    ),
  message: z.string().min(10, 'Zpráva musí mít alespoň 10 znaků'),
  address: z.string().min(5, 'Zadejte adresu pro výpočet vzdálenosti dojezdu'),
  service: z.string().optional(),
  distance_km: z.number().optional(),
  travel_cost_czk: z.number().optional(),
})

export type InquiryInput = z.infer<typeof inquirySchema>
