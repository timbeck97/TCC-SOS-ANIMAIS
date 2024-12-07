import { z } from "zod";

export const CastrationSchema = z.object({
    nome: z.string().min(1, {message: 'Campo obrigatório'}),
    sobrenome: z.string().min(1, {message: 'Campo obrigatório'}),
    cpf: z.string().min(1, {message: 'Campo obrigatório'}).regex(/\d{3}\.\d{3}\.\d{3}-\d{2}/, {message: 'CPF inválido'}),
    rua: z.string().min(1, {message: 'Campo obrigatório'}),
    numero: z.string().min(1, {message: 'Campo obrigatório'}),
    bairro: z.string().min(1, {message: 'Campo obrigatório'}),
    tipoAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    nomeAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    racaAnimal: z.string().optional(),
    animalVacinado: z.boolean().optional(),
    descricaoAnimal: z.string().optional(),
})

export type CastrationFormSchema = z.infer<typeof CastrationSchema>;