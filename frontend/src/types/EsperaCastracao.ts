export interface EsperaCastracao {
    id: number,
    nomeRequerente: string,
    tipoAnimal: string,
    nomeAnimal: string,
    porteAnimal: string,
    dataSolicitacao: Date,
    selected?: boolean,
    nome:string,
    sobrenome:string,
    cpf:string,
    rua:string,
    telefone:string,
    numero:string,
    bairro:string,
    racaAnimal?:string,
    pesoAnimal?:number,
    animalVacinado?:boolean,
    descricaoAnimal?:string,
    urlImagem?:string,

    
}