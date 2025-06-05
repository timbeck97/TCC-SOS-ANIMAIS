export interface AnimalRequestFilter {
    tipoAnimal?: 'CACHORRO' | 'GATO' | null;
    sexoAnimal?: 'MACHO' | 'FEMEA' | null;
    situacaoAdocao?: 'DISPONIVEIS' | 'ADOTADOS' | null;
}