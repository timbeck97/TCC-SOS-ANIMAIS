import { EsperaCastracao } from "./EsperaCastracao"

export interface CastrationModel {
    id: number,
    data: string,
    quantidadeAnimais: number,
    observacao: string
    animais?: EsperaCastracao[]
}