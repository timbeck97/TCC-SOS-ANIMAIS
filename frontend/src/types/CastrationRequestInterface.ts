export interface CastrationRequestInterface{
    nome:string,
    sobrenome:string,
    cpf:string,
    rua:string,
    numero:string,
    bairro:string,
    tipoAnimal:string,
    nomeAnimal:string,
    racaAnimal?:string,
    animalVacinado?:boolean,
    descricaoAnimal?:string,
}