import { z } from "zod";

export const CastrationFormSchema = z.object({
    data: z.string().refine((data) => {
        const date = new Date(data)
        return !isNaN(date.getTime());
    }, { message: 'Data inválida' }),
    observacao: z.string().optional(),
    
})

export type CastrationFormType = z.infer<typeof CastrationFormSchema>;