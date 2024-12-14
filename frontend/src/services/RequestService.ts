import {MOCK_CASTRACAO, MOCK_FILA_ESPERA } from "./Constantes"

export const getWaitingList =  async() => {
    return MOCK_FILA_ESPERA;
}
export const getWaitingCastration =  async(id:number) => {
    return MOCK_CASTRACAO;
}