import { z } from "zod";
export const AdoptionSchema = z.object({
    id: z.string().optional(),
    imagens: z.array(
        z.object({
            id: z.number().optional(),
            principal: z.boolean().optional(),
            file: z.instanceof(File, { message: "Arquivo inválido" })
        })
    ).min(1, { message: "Pelo menos uma imagem é obrigatória" })
    .max(4, { message: "Máximo de 4 imagens" }),
    nome: z.string().min(1, "Nome é obrigatório"),
    descricao: z.string().min(1, "Descrição é obrigatória"),
    idade: z.string().min(1, "Idade é obrigatória"),
    telefone: z.string().min(1, {message: 'O telefone deve ter 11 dígitos.'}).regex(/^\d{11}$/,'Número de telefone inválido.',),
    porte: z.enum(["PEQUENO", "MEDIO", "GRANDE"], { errorMap: () => ({ message: "Tamanho é obrigatório" }) }),
    raca: z.string().min(1, "Raça é obrigatória"),
    genero: z.enum(["MACHO", "FEMEA"], { errorMap: () => ({ message: "Gênero é obrigatório" }) }),
    situacao: z.enum(["DISPONIVEL", "ADOTADO"], { errorMap: () => ({ message: "Situação é obrigatória" }) }),
    tipoAnimal: z.enum(["CACHORRO", "GATO"], { errorMap: () => ({ message: "Tipo de animal é obrigatório" }) }),
});

export type AdoptionType = z.infer<typeof AdoptionSchema>;