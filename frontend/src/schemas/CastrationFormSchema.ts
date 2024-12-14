import { z } from "zod";

export const CastrationFormSchema = z.object({
    data: z.string().refine((data) => {
        const date = new Date(data)
        return !isNaN(date.getTime());
    }, { message: 'Data inválida' }),
    observacao: z.string().optional(),
    quantidadeCaixasPequenas: z.preprocess((val) => Number(val), z.number().int({ message: 'Informa um número inteiro' }).min(0, { message: 'Quantidade de caixas pequenas inválida' })),
    quantidadeCaixasMedias: z.preprocess((val) => Number(val), z.number().int({ message: 'Informa um número inteiro' }).min(0, { message: 'Quantidade de caixas médias inválida' })),
    quantidadeCaixasGrandes: z.preprocess((val) => Number(val), z.number().int({ message: 'Informa um número inteiro' }).min(0, { message: 'Quantidade de caixas grandes inválida' })),
})

export type CastrationFormType = z.infer<typeof CastrationFormSchema>;