import { z } from "zod";

export const CastrationSchema = z.object({
    nome: z.string().min(1, {message: 'Campo obrigatório'}),
    sobrenome: z.string().min(1, {message: 'Campo obrigatório'}),
    cpf: z.string().min(1, {message: 'Campo obrigatório'}).regex(/^\d{11}$/ , {message: 'CPF inválido'}),
    telefone: z.string().min(1, {message: 'Campo obrigatório'}),
    rua: z.string().min(1, {message: 'Campo obrigatório'}),
    numero: z.string().min(1, {message: 'Campo obrigatório'}),
    bairro: z.string().min(1, {message: 'Campo obrigatório'}),
    tipoAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    nomeAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    racaAnimal: z.string().optional(),
    pesoAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    animalVacinado: z.boolean().optional(),
    descricaoAnimal: z.string().optional(),
    porteAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
})

export type CastrationFormSchema = z.infer<typeof CastrationSchema>;