import { ImageInterface } from "./ImageInterface";

export interface AnimalAdoption {
    id?: string;
    imagens: ImageInterface[];
    nome: string;
    descricao: string;
    idade: string;
    telefone: string;
    porte: 'PEQUENO' | 'MEDIO' | 'GRANDE';
    raca: string;
    genero: 'MACHO' | 'FEMEA';
    situacao: 'DISPONIVEL' | 'ADOTADO';
}