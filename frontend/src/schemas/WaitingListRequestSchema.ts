import { z } from "zod";

export const WaitingListRequestSchema = z.object({
    nome: z.string().min(1, {message: 'Campo obrigatório'}),
    sobrenome: z.string().min(1, {message: 'Campo obrigatório'}),
    cpf: z.string().refine((cpf) => validarCPF(cpf), {message: "CPF inválido"}),
    telefone: z.string().min(1, {message: 'O telefone deve ter 11 dígitos.'}).regex(/^\d{11}$/,'Número de telefone inválido.',),
    rua: z.string().min(1, {message: 'Campo obrigatório'}),
    numero: z.string().min(1, {message: 'Campo obrigatório'}),
    bairro: z.string().min(1, {message: 'Campo obrigatório'}),
    tipoAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    nomeAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    racaAnimal: z.string().optional(),
    generoAnimal: z.enum(['MACHO','FEMEA'],{errorMap: () => ({ message: 'Necessário informar o gênero do animal' })}),
    pesoAnimal: z.string().optional(),
    animalVacinado: z.boolean().optional(),
    descricaoAnimal: z.string().optional(),
    porteAnimal: z.string().min(1, {message: 'Campo obrigatório'}),
    formaPagamento: z.string().min(1, {message: 'Campo obrigatório'}),
    idFaixa:z.string().nullable().optional(),
    urlImagem:z.string().nullable().optional(),
    observacoes:z.string().nullable().optional()
})
function validarCPF(cpf:string) {
    cpf = cpf.replace(/[^\d]/g, "");
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  
    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
  
    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
  }
export type WaitingListFormSchema = z.infer<typeof WaitingListRequestSchema>;