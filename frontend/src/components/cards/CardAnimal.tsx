import { FaCheck, FaTimes } from "react-icons/fa";
import { CardButton } from "../../types/CardButton";
import { CardEsperaCastracao } from "../../types/CardEsperaCastracao";
import { Button } from "../button/Button";
import { formatDate, formatFormaPagamento, formatNumeroTelefone, formatValorMoeda } from "../../services/Util";

export const CardAnimal = (props:{castracao:CardEsperaCastracao, options?:CardButton[], selecionado?:boolean}) => {
    const {castracao, selecionado=false} = props
    const renderButton = (b:CardButton)=>{
        if(!b.isRender || b.isRender(castracao)===true){
            const {onClick,isRender, ...rest} = b;
            return  <Button {...rest} onClick={onClick?()=>onClick(castracao):undefined} />
        }
    }
    return (
        <div className={`bg-white shadow-lg rounded-2xl p-4 flex gap-4 border border-gray-200 flex flex-col ${selecionado?'bg-sky-200':''}`}>
            {castracao.urlImagem && (
                <img
                    src={castracao.urlImagem}
                    alt={castracao.nomeAnimal}
                    className=" w-4/5 h-auto rounded-xl shadow-lg m-auto"
                />
            )}
            <div className="flex flex-col w-full space-y-2">
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">{castracao.nomeAnimal} ({castracao.tipoAnimal})</h2>
                    {selecionado && <div className="bg-green-500 flex items-center gap-2 px-2 rounded rounded-md text-white"><FaCheck/>Selecionado</div>}
                </div>
                <p className="text-sm font-bold text-gray-800">Data da Solicitação: {formatDate(castracao.dataSolicitacao) || "A definir"}</p>
                <p className="text-sm text-gray-600">Requerente: {castracao.nomeRequerente}</p>
                <p className="text-sm text-gray-600">Contato: {formatNumeroTelefone(castracao.telefone)}</p>
                {/* <p className="text-sm text-gray-600">Endereço: {castracao.rua}, {castracao.numero}, {castracao.bairro}</p> */}
                <p className="text-sm text-gray-600">Porte: {castracao.porteAnimal} | Raça: {castracao.racaAnimal || "Não informado"}</p>
                <p className="text-sm text-gray-600">Peso: {castracao.pesoAnimal ? `${castracao.pesoAnimal} kg` : "Não informado"}</p>
                <p className="text-sm text-gray-600">Forma de Pagamento: {formatFormaPagamento(castracao.formaPagamento)}</p>
                {castracao.idFaixa && (
                    <p className="text-sm text-gray-600">Faixa de peso: {castracao.descricaoFaixa +' - '+formatValorMoeda(castracao.valorFaixa||0, true)}</p>
                )}
                <p className={"text-sm font-semibold "+(castracao.paga?'text-green-500':'text-red-500')}>
                    {castracao.paga ?  <span><FaCheck className="inline" size={24}/><span className="ml-2">Pagamento Realizado</span></span> : <span><FaTimes className="inline" size={24}/><span className="ml-2">Pagamento Pendente</span></span>}
                </p>

            </div>
            <div className="flex flex-col w-full space-y-1.5">
                {props.options && props.options.map((b)=>(
                    renderButton(b)
                ))}
            </div>
        </div>
    );
}