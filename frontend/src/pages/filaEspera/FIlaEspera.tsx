import dog from '../../assets/cachorro.jpg'
import cat2 from '../../assets/cat-svgrepo-com.svg'
import graph from '../../assets/graph.svg'
import pawBackground from "../../assets/paw.jpg"

export const FilaEspera = () => {
    return (
        <div style={{ backgroundImage: `url(${pawBackground})` }} className='h-full'>

            <div className="container sm:max-w-full  md:max-w-6xl mx-auto  shadow-md">
                <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white'>

                    <div className="text-center rounded px-2 pt-4  border-b border-gray-900/10 pb-5">
                        <h1 className="text-3xl  poppins-bold">Fila de Espera</h1>
                    </div>
                    <div>
                        <div className="grid  grid-cols-1 sm:grid-cols-3 gap-4 mt-5 border-b border-gray-900/10 pb-5">
                            <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                                <div className="flex-shrink-0">
                                    <img src={graph} alt='Logo de gráfico' className="h-16 w-12" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Total</h2>
                                    <p className="text-sm text-gray-600">45 animais</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                                <div className="flex-shrink-0">
                                    <img src={cat2} alt='Imagem de um gato' className="h-16 w-12" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Gatos</h2>
                                    <p className="text-sm text-gray-600">10 animais</p>
                                </div>
                            </div>
                            <div className="flex items-center bg-white shadow-md  rounded-lg p-4">
                                <div className="flex-shrink-0">
                                    <img src={dog} alt='Imagem de um cachorro' className="h-16 w-12" />
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-lg font-semibold text-gray-800">Cachorros</h2>
                                    <p className="text-sm text-gray-600">35 animais</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}