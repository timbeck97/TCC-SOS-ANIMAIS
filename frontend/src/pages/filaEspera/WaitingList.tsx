import dog from '../../assets/cachorro.jpg'
import cat2 from '../../assets/cat-svgrepo-com.svg'
import graph from '../../assets/graph.svg'
import { FcInfo, FcOvertime } from "react-icons/fc";
import  Pawbackground  from '../../components/pawbackground/Pawbackground';
import { request } from '../../services/Axios';
import { useEffect, useState } from 'react';
import { CastrationRequestTotal } from '../../types/CastrationRequestTotal';
import  Title  from '../../components/title/Title';
import  Table  from '../../components/table/Table';
import  Column  from '../../components/table/Column';
import { EsperaCastracao } from '../../types/EsperaCastracao';
import { formatNumeroTelefone, formatPorteAnimal, formatTipoAnimal } from '../../services/Util';
import { WaitListModal } from '../../components/WaitListModal/WaitListModal';
import { useDevice } from '../../context/DeviceContext';
import  CardAnimal  from '../../components/cards/CardAnimal';
import  Loading  from '../../components/loading/Loading';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { Dropdown } from 'flowbite-react';
import { LuPencil } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';



const WaitingList = () => {

    const [data, setData] = useState<EsperaCastracao[]>([])

    useEffect(() => {
    
        Promise.all([getTotais(), fetchCastracoes()])
        .then(result=>{
            setTotais(result[0] || {} as CastrationRequestTotal);
            setData(result[1] || [])
            setLoading(false)
        })
    }, [])

    const [totais, setTotais] = useState<CastrationRequestTotal>({ total: 0, totalCats: 0, totalDogs: 0 });
    const [waitListSelect, setWaitListSelect] = useState<EsperaCastracao | null>(null)
    const { isMobile } = useDevice();
    const [loading, setLoading] = useState(true)
    const [animalDelete, setAnimalDelete] = useState<EsperaCastracao | null>(null)
    const navigate = useNavigate();
    const getTotais = async () => {
        return request<CastrationRequestTotal>('get', '/castration/waitingList/totais')
       
    }
    const fetchCastracoes = async () => {
        return  request<EsperaCastracao[]>('get', '/castration/waitingList')
    }
    const deleteCastracao = async () => {
        if(animalDelete!=null){
            await request('delete', `/castration/waitingList/delete/${animalDelete.id}`)
            setAnimalDelete(null)
            setData(data.filter(x => x.id !== animalDelete.id))
            let totais = await getTotais()
            if(totais){
                setTotais(totais)
            }
        }
    }
    const renderDadosAnimal = (row: EsperaCastracao) => {
            return (
                <div className="w-full">
                    <div className="flex flex-col items-center ">
                        <span className="poppins-bold">{row.nomeAnimal}</span>
                        <span className="poppins-bold text-indigo-500">{formatTipoAnimal(row.tipoAnimal)}</span>
                        <span>{formatPorteAnimal(row.porteAnimal)}</span>
                    </div>
                </div>
            )
        }
     const renderNome = (idx: number, row: EsperaCastracao) => {
        return (
            <div className="flex flex-col items-center">
                <span className="poppins-bold">{row.nomeRequerente}</span>
                <span className="poppins-bold text-indigo-500">{formatNumeroTelefone(row.telefone)}</span>
            </div>
        )
    }
     const renderAcoes = (idx:number, row: any) => {
            return (
                <div className="">
                    <Dropdown
                        placement="top"
                        inline
                        arrowIcon={false}
                        id={row.id}
                        itemID={row.id}
                        key={idx}
                        className="mt-3 w-100"
                        label={
                            <span
                                className="bg-indigo-500 float-right text-white flex items-center px-2 rounded-md py-1 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <LuPencil />
                                <span>&nbsp;Ações</span>
                            </span>
                        }
                    >
                        <Dropdown.Item icon={FcInfo} onClick={() => setWaitListSelect(row)}>Abrir</Dropdown.Item>
                        <Dropdown.Item icon={FaEdit} onClick={() => navigate('/gerenciar/filaEspera/' + row.id)}>Editar</Dropdown.Item>
                        <Dropdown.Item icon={FaTrashAlt} onClick={() => setAnimalDelete(row)}>Remover</Dropdown.Item>
                    </Dropdown>
                </div>
            )
        }
    return (
        <Pawbackground>

            <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white relative'>

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
                        {isMobile? <div className='space-y-2'>{data.map((x,idx) => <CardAnimal key={idx} castracao={x}/>)}</div>
                        :
                        <Table id='tableAnimaisIdx' data={data} enablePagination={true}>
                            <Column field="nomeRequerente" align='center' label="Nome do Requerente" component={renderNome} />
                            <Column<EsperaCastracao> label="Animal" align="center" component={(idx, row) => renderDadosAnimal(row)} />
                            <Column field="dataSolicitacao" align='center'  label="Data da Solicitação" format="data" />
                            <Column field="formaPagamento" align='center' label="Forma de Pagamento" format="formaPagamento" />
                            <Column label="Ações"   component={(idx, row)=>renderAcoes(idx, row)} />

                        </Table>
                        }
                        <WaitListModal show={waitListSelect !== null} handleClose={() => setWaitListSelect(null)} obj={waitListSelect} />
                    </div>


                </div>
                <Loading loading={loading} />
                  <ConfirmModal
                        show={animalDelete !== null}
                        confirm={() => deleteCastracao()}
                        close={() => setAnimalDelete(null)}
                        title="Remover animal"
                        text="Deseja realmente remover este animal da lista de espera das castrações?"
                    />
            </div>
        </Pawbackground>


    )
}
WaitingList.displayName = 'WaitingList';
export default WaitingList;