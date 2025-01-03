import { EsperaCastracao } from "./EsperaCastracao"

export interface CastrationModel {
    id?: number,
    data: string,
    quantidadeAnimais: number,
    observacao: string
    animais?: EsperaCastracao[]
    situacao?: string,
    //atributos frontend
    quantidadeCaixasPequenas?: number,
    quantidadeCaixasGrandes?: number,
    quantidadeCaixasMedias?: number,
}