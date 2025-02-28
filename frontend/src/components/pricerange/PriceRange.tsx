import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { FaixaValor } from "../../types/FaixaValor";
import { InputNumberNoValidation } from "../../components/input/InputNumberNoValidation";
import { Button } from "../../components/button/Button";
import { VscTrash } from "react-icons/vsc";
import { GoPencil } from "react-icons/go";
import { Subtitle } from "../../components/title/Subtitle";
import { deleteRequest, get, post } from "../../services/Axios";

export const PriceRange = () => {
    useEffect(() => {
        carregarFaixas();
    }, [])
    const [showAdicionarFaixaPreco, setShowAdicionarFaixaPreco] = useState<boolean>(false)
    const [faixaValor, setFaixaValor] = useState<FaixaValor>({ descricao: '', valor: '' })
    const [listaValores, setListaValores] = useState<FaixaValor[]>([
        { descricao: 'Até 5KG', valor: '70.0' },
        { descricao: '5kg até 10kg', valor: '90.0' },
        { descricao: '10kg até 15kg', valor: '110.0' },
        { descricao: '15kg até 20kg', valor: '120.0' },
        { descricao: '20kg até 25kg', valor: '150.0' },
    ])
    const carregarFaixas = async () => {
        let response = await get<FaixaValor[]>('faixapreco', {}, {})
        setListaValores(response?.data)
    }
    const deletarFaixa = (id: number) => {
        deleteRequest('faixapreco/' + id, () => {
            carregarFaixas();
        })
    }
    const editarFaixa = (faixa: FaixaValor) => {
        setFaixaValor(faixa);
        setShowAdicionarFaixaPreco(true);
    }
    const adicionarFaixaValor = () => {
        post<FaixaValor>('/faixapreco', faixaValor, {}, (data) => {
            let valores = listaValores
            valores.push(data)
            setListaValores(valores);
            setShowAdicionarFaixaPreco(false)
            setFaixaValor({ descricao: '', valor: '' })
        })
    }
    const formatValue = (valorString: string) => {
        const valor = parseFloat(valorString);
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    return (
        <div>
            <div className="sm:col-span-2 space-y-4 mt-3">
                <Subtitle text="Preços da Castração" extraClasses="mb-3" />
                <hr />
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-300 w-full text-left">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Descrição</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Valor</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaValores.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{row.descricao}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatValue(row.valor)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{
                                        <div className="flex items-center space-x-2">
                                            <VscTrash color="red" size={25} cursor={'pointer'} onClick={() => deletarFaixa(row.id || 0)} />
                                            <GoPencil cursor={'pointer'} onClick={() => editarFaixa(row)} />
                                        </div>
                                    }</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <Button text="Adicionar" onClick={() => setShowAdicionarFaixaPreco(true)} type="neutral" />
                </div>


            </div>
            <Modal show={showAdicionarFaixaPreco} onClose={() => setShowAdicionarFaixaPreco(false)}>
                <Modal.Header >
                    Cadastrar nova faixa de valor
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Input id="descricaoIdx"
                            label="Descrição"
                            type="text"
                            name="descricao"
                            value={faixaValor.descricao}
                            onChange={(e: any) => setFaixaValor({ ...faixaValor, descricao: e.target.value })}

                        />
                        <InputNumberNoValidation id="idxValor"
                            name="valor"
                            value={faixaValor.valor}
                            label="Valor"
                            type="numeric2decimals"
                            onChange={(name: string, value: string) => setFaixaValor({ ...faixaValor, valor: value })}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div className="w-full space-x-2 flex justify-end">

                        <Button text="Fechar" onClick={() => setShowAdicionarFaixaPreco(false)} type="neutral" />
                        <Button text="Confirmar" onClick={adicionarFaixaValor} type="default" />
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    )
}