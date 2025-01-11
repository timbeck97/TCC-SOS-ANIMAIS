import dog from '../../assets/cachorro.jpg'
import cat2 from '../../assets/cat-svgrepo-com.svg'
import graph from '../../assets/graph.svg'
import { FcOvertime } from "react-icons/fc";
import { TableWaitingList } from '../../components/tablewaitingList/TableWaitingList'
import { Pawbackground } from '../../components/pawbackground/Pawbackground';
import { get } from '../../services/Axios';
import { useEffect, useState } from 'react';
import { CastrationRequestTotal } from '../../types/CastrationRequestTotal';
import { Title } from '../../components/title/Title';



export const WaitingList = () => {
    

    useEffect(() => {
        getTotais();
    }, [])

    const [totais, setTotais] = useState<CastrationRequestTotal>({ total: 0, totalCats: 0, totalDogs: 0 });

    const getTotais = () => {
        get<CastrationRequestTotal>('/castration/waitingList/totais', {}, {}, (data) => {
            if(data){
                setTotais(data);
            }
        })
    }
    return (
        <Pawbackground>

            <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white'>

                <div className="rounded px-2 pt-4 flex items-center  border-b border-gray-900/10 pb-5">
        
                    <Title text="Fila de Espera" icon={<FcOvertime size={35} />} />
                </div>
                <div>
                    <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4 mt-5 border-b border-gray-900/10 pb-5">
                        <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                            <div className="flex-shrink-0">
                                <img src={graph} alt='Logo de gráfico' className="md:h-16 md:w-12 h-12 w-8" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm md:text-lg font-semibold text-gray-800">Total</h2>
                                <p className="text-sm text-gray-600">{totais.total} animais</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                            <div className="flex-shrink-0">
                                <img src={cat2} alt='Imagem de um gato' className="md:h-16 md:w-12 h-12 w-8" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm md:text-lg font-semibold text-gray-800">Gatos</h2>
                                <p className="text-sm text-gray-600">{totais.totalCats} animais</p>
                            </div>
                        </div>
                        <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                            <div className="flex-shrink-0">
                                <img src={dog} alt='Imagem de um cachorro' className="md:w-12 h-12 w-8" />
                            </div>
                            <div className="ml-4">
                                <h2 className="text-sm md:text-lg font-semibold text-gray-800">Cachorros</h2>
                                <p className="text-sm text-gray-600">{totais.totalDogs} animais</p>
                            </div>
                        </div>

                    </div>
                    <div>

                        <TableWaitingList selectAnimals={false} />
                    </div>


                </div>
            </div>
        </Pawbackground>


    )
}