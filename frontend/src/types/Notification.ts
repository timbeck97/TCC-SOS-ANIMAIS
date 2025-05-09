export interface Notification{
    id:number,
    mensagem:string,
    tipo:string,
    data:Date,
    dataLeitura:Date,
    lida:boolean,
    usuario:string
}