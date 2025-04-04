import { Modal } from "flowbite-react"
import { EsperaCastracao } from "../../types/EsperaCastracao"
import { formatCpf, formatNumberInput, formatNumeroTelefone, formatPorteAnimal, formatTipoAnimal, formatValorMoeda } from "../../services/Util"

export const WaitListModal = ({ show, handleClose, obj }: {
    show: boolean,
    handleClose: () => void,
    obj: EsperaCastracao | null

}) => {




    return (
        <Modal show={show} size="4xl" onClose={handleClose}>
            <Modal.Header >
                Detalhes da Solicitação
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="mt-2"><span className="font-bold">Nome: </span>{obj?.nome}</p>
                        <p className="mt-2"><span className="font-bold">Sobrenome: </span>{obj?.sobrenome}</p>
                        <p className="mt-2"><span className="font-bold">CPF: </span>{formatCpf(obj?.cpf||'')}</p>
                        <p className="mt-2"><span className="font-bold">Telefone: </span>{formatNumeroTelefone(obj?.telefone||'')}</p>
                        <p className="mt-2"><span className="font-bold">Rua: </span>{obj?.rua}</p>
                        <p className="mt-2"><span className="font-bold">Número: </span>{obj?.numero}</p>
                        <p className="mt-2"><span className="font-bold">Bairro: </span>{obj?.bairro}</p>
                        <p className="mt-2"><span className="font-bold">Tipo do Animal: </span>{formatTipoAnimal(obj?.tipoAnimal)}</p>
                        <p className="mt-2"><span className="font-bold">Nome do Animal: </span>{obj?.nomeAnimal}</p>
                        <p className="mt-2"><span className="font-bold">Raça do Animal: </span>{obj?.racaAnimal}</p>
                        <p className="mt-2"><span className="font-bold">Peso do Animal: </span>{obj?.pesoAnimal?formatValorMoeda(obj?.pesoAnimal, false)+' KG':'' }</p>

                        <p className="mt-2"><span className="font-bold">Porte do Animal: </span>{formatPorteAnimal(obj?.porteAnimal)}</p>
                        <p className="mt-2"><span className="font-bold">Animal Vacinado: </span>{obj?.animalVacinado ? 'Sim' : 'Não'}</p>
                        <p className="mt-2"><span className="font-bold">Descrição do Animal: </span>{obj?.descricaoAnimal}</p>
                    </div>

                    <div className="mt-3 ">
                        {/* <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                        className="" alt="" /> */}
                        <img src={obj?.urlImagem ? obj?.urlImagem : 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='}
                            alt="" className="w-4/5 h-auto rounded-lg shadow-lg m-auto" />
                    </div>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <button type="submit" onClick={handleClose}
                    className="bg-indigo-500 float-right text-white px-4 rounded-xl py-1  float-right rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Fechar
                </button>
            </Modal.Footer>
        </Modal>
    )
}