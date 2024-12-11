import DataTable, { TableColumn } from 'react-data-table-component'
import dog from '../../assets/cachorro.jpg'
import cat2 from '../../assets/cat-svgrepo-com.svg'
import graph from '../../assets/graph.svg'
import pawBackground from "../../assets/paw.jpg"
import { FcInfo } from "react-icons/fc";
import { FcOvertime } from "react-icons/fc";
import { EsperaCastracao } from '../../types/EsperaCastracao'
import { useState } from 'react'
import { Modal } from '../../components/modal/Modal'

export const FilaEspera = () => {

    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => {
        setShowModal(true);
    }
    const columns: TableColumn<EsperaCastracao>[] = [
        { name: 'Nome do Requerente', selector: (row: EsperaCastracao) => row.nomeRequerente, sortable: true, sortField: 'nomeRequerente', },
        { name: 'Tipo do Animal', selector: (row: EsperaCastracao) => row.tipoAnimal },
        { name: 'Nome do Animal', selector: (row: EsperaCastracao) => row.nomeAnimal },
        { name: 'Porte do Animal', selector: (row: EsperaCastracao) => row.porteAnimal },
        { name: 'Data da Solicitação', selector: (row: EsperaCastracao) => row.dataSolicitacao },
        { name: 'Ações', cell: (row: EsperaCastracao) => <button onClick={handleShowModal}><FcInfo size={30} /></button> }
    ]
    const data = [
        {
            nomeRequerente: 'João da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'João da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'João da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'João da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'João da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'Maria da Silva',
            tipoAnimal: 'Gato',
            nomeAnimal: 'Bichano',
            porteAnimal: 'Pequeno',
            dataSolicitacao: '12/10/2021'
        },
        {
            nomeRequerente: 'José da Silva',
            tipoAnimal: 'Cachorro',
            nomeAnimal: 'Rex',
            porteAnimal: 'Grande',
            dataSolicitacao: '12/10/2021'
        },

    ]
    const renderModal = () => {
        return (
            <Modal isModalOpen={showModal} closeModal={() => setShowModal(false)} modalSize='medium'>
                <p>
                    TESTE
                </p>
            </Modal>
        )
    }
    return (
        <div style={{ backgroundImage: `url(${pawBackground})`,
        minHeight: '100%'}} >
         {/* <div style={{ background: '#F9F9F9', minHeight:'100%'}}> */}
            <div className="container sm:max-w-full  md:max-w-6xl mx-auto  shadow-md pt-3">
                <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white'>

                    <div className="rounded px-2 pt-4 flex items-center  border-b border-gray-900/10 pb-5">
                        <FcOvertime size={35} />

                        <h1 className="text-2xl ml-3  poppins-semibold">Fila de Espera</h1>
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
                        <div>
                            <DataTable
                                columns={columns}
                                data={data}
                                pagination={true}
                                expandableRows={true}
                                expandableRowsComponent={(row: any) => <div>
                                    <p>Descrição: {row.data.nomeRequerente}</p>
                                    <p>Porte: </p>
                                </div>}
                                paginationComponentOptions={
                                    {
                                        rowsPerPageText: 'Registros por página',
                                        rangeSeparatorText: 'de',
                                        selectAllRowsItem: true,
                                        selectAllRowsItemText: 'Todos',
                                    }
                                }
                            />
                        </div>
                        {renderModal()}

                    </div>
                </div>
            </div>
        </div>

    )
}