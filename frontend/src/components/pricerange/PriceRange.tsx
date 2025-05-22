import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import Input from "../../components/input/Input";
import { FaixaValor } from "../../types/FaixaValor";
import  Button  from "../../components/button/Button";
import { VscTrash } from "react-icons/vsc";
import { GoPencil } from "react-icons/go";
import  Subtitle  from "../../components/title/Subtitle";
import { deleteRequest, get, request } from "../../services/Axios";
import { formatDate, formatDateYYYYMMDD, formatValorMoeda, parseStringToDate } from "../../services/Util";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import  InputNumber  from "../input/InputNumber";

const PriceRange = () => {
    useEffect(() => {
        carregarFaixas();
    }, [])
 
    const [showAdicionarFaixaPreco, setShowAdicionarFaixaPreco] = useState<boolean>(false)
    const [listaValores, setListaValores] = useState<FaixaValor[]>([ ])

    const faixaValorSchema = z.object({
        descricao: z.string().min(1, { message: 'Descrição é obrigatória' }),
        valor: z.string().min(1, { message: 'Valor é obrigatório' }),
        dataInicio: z.string().min(1, { message: 'Data inicial é obrigatória' }),
        dataFim: z.string().nullable(),
        id: z.number().nullable().optional()
      });
    type FaixaValorForm = z.infer<typeof faixaValorSchema>;
    const { register, handleSubmit, formState: { errors }, watch, control, reset } = useForm<FaixaValorForm>({
        resolver: zodResolver(faixaValorSchema),
        defaultValues: {
          dataInicio: formatDateYYYYMMDD(new Date()),
          dataFim: null,
          descricao: '',
          valor: '',
          id: null
        }
      });
   
    const formValues = watch();

    const carregarFaixas = async () => {
        let response = await get<FaixaValor[]>('faixapreco', {}, {})
        setListaValores(response?.data.map(x=>({...x,valor:formatValorMoeda(parseFloat(x.valor), false)})));
        
    }
    const deletarFaixa = (id: number) => {
        deleteRequest('faixapreco/' + id, () => {
            carregarFaixas();
        })
    }
    const editarFaixa = (faixa: FaixaValor) => {
        reset({
            id: faixa.id,
            descricao: faixa.descricao,
            valor: faixa.valor,
            dataInicio: faixa.dataInicio,
            dataFim: faixa.dataFim ? faixa.dataFim : null
        })
        setShowAdicionarFaixaPreco(true);
    }
    const adicionarFaixaValor = async (faixaValor:FaixaValor) => {
        const req=faixaValor.id?'put':'post'
        const url=faixaValor.id?'/faixapreco/'+faixaValor.id:'/faixapreco'
        let result = await request<FaixaValor>(req, url, {...faixaValor, dataInicio:parseStringToDate(faixaValor.dataInicio), dataFim:faixaValor.dataFim?parseStringToDate(faixaValor.dataFim):null})
        if(!result)return;
        setShowAdicionarFaixaPreco(false)
        reset()
        carregarFaixas();
    }
    const formatValue = (valorString: string) => {
        const valor = parseFloat(valorString);
        return valor.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        });
    }
    const fechar = ()=>{
        setShowAdicionarFaixaPreco(false)
        reset()
    }
    const onSubmit = (data: any) => {
        const { descricao, valor, dataInicio, dataFim, id } = data;
        const faixaValor: FaixaValor = {
            descricao,
            valor,
            dataInicio:dataInicio,
            dataFim: dataFim ? dataFim : undefined,
            id: id
        };
        adicionarFaixaValor(faixaValor);
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
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Período Inicial</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100">Período Final</th>
                                <th className="border border-gray-300 px-4 py-2 bg-gray-100 w-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listaValores && listaValores.map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 px-4 py-2">{row.descricao}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatValue(row.valor)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{formatDate(row.dataInicio)}</td>
                                    <td className="border border-gray-300 px-4 py-2">{row.dataFim?formatDate(row.dataFim):''}</td>
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
                    <Button text="Adicionar" onClick={() =>{
                        setShowAdicionarFaixaPreco(true)
                        reset({
                            descricao: '',
                            valor: '',
                            dataInicio: formatDateYYYYMMDD(new Date()),
                            dataFim: null,
                            id: null
                        })
                    }} type="neutral" />
                </div>


            </div>
            <Modal show={showAdicionarFaixaPreco} onClose={() => setShowAdicionarFaixaPreco(false)}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Modal.Header >
                        Faixa de valor
                    </Modal.Header>
                    <Modal.Body>
                    
                            <Input id="descricaoIdx"
                                label="Descrição"
                                type="text"
                                errors={errors.descricao}
                                {...register('descricao')}

                            />
                            <InputNumber id="idxValor"
                                name="valor"
                                value={formValues.valor}
                                label="Valor"
                                type="numeric2decimals"
                                control={control}
                                errors={errors.valor} 
                                
                            />
                        <Input id="dataInicioIdx"
                                label="Data Inicial"
                                type="date"
                                errors={errors.dataInicio}
                                {...register('dataInicio')}

                            />
                        <Input id="dataFimIdx"
                                label="Data Final"
                                type="date"
                                errors={errors.dataFim}
                                {...register('dataFim')}
                        />
                            {/* <pre>
                                {JSON.stringify(formValues, null, 2)}
                            </pre> */}
                    
                    </Modal.Body>
                    <Modal.Footer>
                        <div className="w-full space-x-2 flex justify-end">

                            <Button text="Fechar" onClick={fechar} type="neutral" />
                            <Button text="Confirmar" type="default" buttonType="submit" />
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}
PriceRange.displayName = 'PriceRange';
export default PriceRange;