import { useState } from "react";
import { AnimalRequestFilter } from "../../types/AnimalRequestFilter";
import InputCombobox from "../input/InputCombobox";
const AdoptionFilter = ({ onFilterChange, filtrarSituacao }: { onFilterChange: (filtro: AnimalRequestFilter) => void, filtrarSituacao: boolean }) => {

    const [filtro, setFiltro] = useState<AnimalRequestFilter>({});
    const handleChangeFiltro = (newFiltro: AnimalRequestFilter) => {
        setFiltro(newFiltro);
        onFilterChange(newFiltro);
    };
    return (
        <div className="w-full sm:w-2/3">
            <div className="flex gap-2 sm:gap-10 flex-col sm:flex-row">
                <InputCombobox
                    id="tipoAnimalIdx"
                    comboboxValues={[{ label: 'Todos', value: null }, { label: 'Cachorro', value: 'CACHORRO' }, { label: 'Gato', value: 'GATO' }]}
                    name="tipoAnimalAdoptionFilter"
                    className="text-xs"
                    value={filtro.tipoAnimal || ''}
                    label="Tipo de animal"
                    valueKey="value"
                    arrayKey="label"
                    onChange={(e: any) => handleChangeFiltro({ ...filtro, tipoAnimal: e.target.value })}
                />
                <InputCombobox
                    id="sexoAnimalIdx"
                    comboboxValues={[{ label: 'Todos', value: null }, { label: 'Macho', value: 'MACHO' }, { label: 'Fêmea', value: 'FEMEA' }]}
                    name="sexoAnimalAdoptionFilter"
                    className="text-xs"
                    value={filtro.sexoAnimal || ''}
                    label="Macho/Fêmea"
                    valueKey="value"
                    arrayKey="label"
                    onChange={(e: any) => handleChangeFiltro({ ...filtro, sexoAnimal: e.target.value })}
                />
                {filtrarSituacao && <InputCombobox
                    id="situacAdocaoIdx"
                    comboboxValues={[{ label: 'Todos', value: null }, { label: 'Disponíveis', value: 'DISPONIVEL' }, { label: 'Adotados', value: 'ADOTADO' }]}
                    name="situacaoAdocaoAdoptionFilter"
                    className="text-xs"
                    value={filtro.situacaoAdocao || ''}
                    label="Situação de adoção"
                    valueKey="value"
                    arrayKey="label"
                    onChange={(e: any) => handleChangeFiltro({ ...filtro, situacaoAdocao: e.target.value })}
                />}
            </div>
        </div>
    );
}
AdoptionFilter.displayName = 'AdoptionFilter';
export default AdoptionFilter;