import { SubmitHandler, useForm } from "react-hook-form";
import { WaitingListFormSchema, WaitingListRequestSchema } from "../../schemas/WaitingListRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { EsperaCastracao } from "../../types/EsperaCastracao";
import { useHookFormMask } from "use-mask-input";
import { CastrationRequestInterface } from "../../types/CastrationRequestInterface";
import { useNavigate, useParams } from "react-router-dom";
import { request } from "../../services/Axios";
import  InputCombobox  from "../../components/input/InputCombobox";
import { FORMA_PAGAMENTO, GENERO, PORTE_ANIMAIS, TIPO_ANIMAIS } from "../../services/Constantes";
import  InputBoolean  from "../../components/input/InputBoolean";
import  InputNumber  from "../../components/input/InputNumber";
import Input from "../../components/input/Input";
import { FaixaValor } from "../../types/FaixaValor";
import  Button  from "../../components/button/Button";
import { GrLinkPrevious } from "react-icons/gr";
import { FaSave } from "react-icons/fa";
import { openAlertSuccess } from "../../services/Alert";
import { formatDateYYYYMMDD, formatValorMoeda } from "../../services/Util";

const CastrationRequestEdit = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, control, watch } = useForm<WaitingListFormSchema>({
        resolver: zodResolver(WaitingListRequestSchema),
        mode: "onChange"
    });
    const { id } = useParams<{ id: string | undefined }>()
    const [faixaValores, setFaixaValores] = useState<FaixaValor[]>([])
    const formValues = watch();
    const navigate = useNavigate();
    const registerWithMask = useHookFormMask(register);

    const getData = useCallback(
        async () => {
            let response = await request<EsperaCastracao>('get', '/castration/waitingList/' + id)
            reset({
                nome: response?.nome,
                sobrenome: response?.sobrenome,
                cpf: response?.cpf,
                telefone: response?.telefone,
                rua: response?.rua,
                numero: response?.numero,
                bairro: response?.bairro,
                tipoAnimal: response?.tipoAnimal,
                nomeAnimal: response?.nomeAnimal,
                racaAnimal: response?.racaAnimal,
                pesoAnimal: formatValorMoeda(response?.pesoAnimal||0, false),
                descricaoAnimal: response?.descricaoAnimal,
                animalVacinado: response?.animalVacinado,
                porteAnimal: response?.porteAnimal,
                urlImagem: response?.urlImagem,
                formaPagamento: response?.formaPagamento,
                idFaixa: String(response?.idFaixa),
                generoAnimal: response?.generoAnimal,
                observacoes: response?.observacoes,
            })
        }
        , [id, reset])
    useEffect(() => {
        getData();
        getFaixasPreco();
    }, [getData])

    const getFaixasPreco = async () => {
        let response = await request<FaixaValor[]>('get', '/faixapreco/ativos')
        let data = response || []
        data.unshift({ id: null, descricao: 'Não Informado', valor: '0', dataInicio: formatDateYYYYMMDD(new Date()) })
        setFaixaValores(data)
    }
    const onSubmit: SubmitHandler<CastrationRequestInterface> = async data => {
        console.log(data)
        let resposta = await request('put', '/castration/waitingList/' + id, data)
        console.log(resposta)
        openAlertSuccess('Dados atualizados')

    };


    return (
        <div className="pb-12 px-10 bg-[#f3f4f6] flex flex-col grow">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-5 mt-5">

                    <h2 className="text-lg/7 font-semibold text-gray-900">Informações Pessoais</h2>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                        <div className="sm:col-span-1">

                            <Input id="nomeidx"
                                label="Nome"
                                type="text"
                                errors={errors.nome}
                                {...register('nome')}

                            />

                        </div>
                        <div className="sm:col-span-1">

                            <Input id="sobrenomeidx"
                                label="Sobrenome"
                                type="text"
                                errors={errors.sobrenome}
                                {...register('sobrenome')} />
                        </div>
                        <div className="sm:col-span-1">
                            <Input id="cpfidx"
                                label="CPF"
                                type="text"
                                {...registerWithMask('cpf', '999.999.999-99', { autoUnmask: true })}
                                errors={errors.cpf}
                            />
                        </div>
                        <div className="sm:col-span-1">
                            <Input id="telefoneIdx"
                                label="Telefone"
                                type="text"
                                {...registerWithMask('telefone', '(99) 99999-9999', { autoUnmask: true })}
                                errors={errors.telefone}
                            />
                        </div>

                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-5 mt-5 pb-5 mt-5">
                    <h2 className="text-lg/7 font-semibold text-gray-900">Endereço</h2>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-1 ">
                        <div className="sm:col-span-2">
                            <Input id="ruaidx"
                                label="Rua"
                                type="text"
                                errors={errors.rua}
                                {...register('rua')} />
                        </div>
                        <div className="sm:col-span-1">
                            <Input id="numeroidx"
                                label="Número"
                                type="text"
                                errors={errors.numero}
                                {...register('numero')} />
                        </div>
                        <div className="sm:col-span-1">
                            <Input id="bairroidx"
                                label="Bairro"
                                type="text"
                                errors={errors.bairro}
                                {...register('bairro')} />
                        </div>
                    </div>
                </div>

                <div className="border-b border-gray-900/10 pb-5 mt-5">
                    <h2 className="text-lg/7 font-semibold text-gray-900">Dados do Animal</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-5 mt-3 space-x-6">
                        <div className="sm:col-span-1">
                            {/* <InputFile id="file-upload" name="file-upload" types=".jpeg, .png, .jpg" label="Foto do Animal" value={file} onChange={handleFile} /> */}
                            <div className="relative flex items-start flex-col justify-start h-full">
                                <div className="space-y-2 w-full">
                                    <span className="font-bold">Foto do animal</span>
                                    {formValues.urlImagem && <img className="rounded-lg shadow-lg max-w-72" src={formValues.urlImagem} alt="animal" />}
                                    {!formValues.urlImagem && <div>
                                        <svg className="text-gray-300 w-2/3 h-2/3 " viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />

                                        </svg></div>}
                                </div>

                            </div>

                        </div>
                        <div className="sm:col-span-4">
                            <Input id="nomeAnimalidx"
                                label="Nome do Animal"
                                type="text"
                                errors={errors.nomeAnimal}
                                {...register('nomeAnimal')} />
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="sm:col-span-1">
                                    <InputCombobox id="tipoAnimalidx"
                                        label="Tipo de Animal"
                                        comboboxValues={TIPO_ANIMAIS}
                                        errors={errors.tipoAnimal}
                                        valueKey="value"
                                        arrayKey="label"
                                        {...register('tipoAnimal')}
                                    />
                                </div>
                                <div className="sm:col-span-1">
                                    <InputCombobox id="porteAnimalIdx"
                                        label="Porte do Animal"
                                        comboboxValues={PORTE_ANIMAIS}
                                        valueKey="value"
                                        arrayKey="label"
                                        errors={errors.porteAnimal}
                                        //register={register} />
                                        {...register('porteAnimal')} />
                                </div>
                                <div className="sm:col-span-1">
                                    <InputCombobox id="generoAnimalIdx"
                                        label="Gênero do Animal"
                                        comboboxValues={GENERO}
                                        valueKey="value"
                                        arrayKey="label"
                                        errors={errors.generoAnimal}
                                        {...register('generoAnimal')} />
                                </div>
                            </div>




                            <Input id="racaAnimalIdx"
                                label="Raça do Animal"
                                type="text"
                                errors={errors.racaAnimal}
                                {...register('racaAnimal')} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="sm:col-span-1">
                                    <InputNumber id="pesoIdx"
                                        name="pesoAnimal"
                                        value={formValues.pesoAnimal}
                                        label="Peso Aproximado (kg)"
                                        type="numeric2decimals"
                                        control={control}
                                        errors={errors.pesoAnimal} />
                                </div>
                                <div className="sm:col-span-1">
                                    <InputBoolean id='animalVacinadoIdx' name='animalVacinado' label='Animal é vacinado' control={control} />
                                </div>
                            </div>






                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <Input id="descricaoAnimalIdx"
                                    label="Descrição do Animal (comportamento)"
                                    type="textarea"
                                    lines={4}
                                    errors={errors.descricaoAnimal}
                                    {...register('descricaoAnimal')}
                                />
                                <Input id="observacoesIdx"
                                    label="Observações"
                                    type="textarea"
                                    lines={4}
                                    errors={errors.observacoes}
                                    {...register('observacoes')}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="pb-5 mt-5">

                    <h2 className="text-lg/7 font-semibold text-gray-900 mt-2">Dados do Animal</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-1 sm:gap-x-6  gap-y-1 mt-3">

                        <div className="sm:col-span-1">
                            <InputCombobox id="formaPagamentoIdx"
                                label="Forma de Pagamento"
                                valueKey="value"
                                arrayKey="label"
                                comboboxValues={FORMA_PAGAMENTO}
                                errors={errors.formaPagamento}
                                {...register('formaPagamento')} />

                        </div>
                        <div className="sm:col-span-1">
                            <InputCombobox
                                id="faixaValorIdx"
                                comboboxValues={faixaValores}
                                label="Faixa de preço"
                                value={formValues.idFaixa || ''}
                                {...register('idFaixa')}
                                valueKey="id"
                                arrayKey="descricao"

                            />
                        </div>
                    </div>
                </div>


                {/* <pre className="mt-5">
                    <p className="font-bold">
                        Valores formulário
                    </p>

                    <p>Nome: {formValues.nome}</p>
                    <p>Sobrenome: {formValues.sobrenome}</p>
                    <p>CPF: {formValues.cpf}</p>
                    <p>Telefone: {formValues.telefone}</p>
                    <p>Rua: {formValues.rua}</p>
                    <p>Número: {formValues.numero}</p>
                    <p>Bairro: {formValues.bairro}</p>
                    <p>Tipo de Animal: {formValues.tipoAnimal}</p>
                    <p>Porte do Animal: {formValues.porteAnimal}</p>
                    <p>Nome do Animal: {formValues.nomeAnimal}</p>
                    <p>Raça do Animal: {formValues.racaAnimal}</p>
                    <p>Peso do Animal: {formValues.pesoAnimal}</p>
                    <p>Animal Vacinado: {`${formValues.animalVacinado ? 'Sim' : 'Não'}`}</p>
                    <p>Descricao do Animal: {formValues.descricaoAnimal}</p>
                    <p>FILE: {file?.fileName}</p>
                    <p>Forma de Pagamento: {formValues.formaPagamento}</p>
                    <p>ID faixa valor: {formValues.idFaixa}</p>
                </pre> */}

                {!isValid && isSubmitted && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 mt-3 border border-red-200 rounded-lg">
                        ⚠️ Por favor, preencha todos os campos corretamente antes de enviar.
                    </div>
                )}
                <div className="mt-3 flex justify-center gap-2">
                    <Button text="Voltar" onClick={() => navigate(-1)} icon={<GrLinkPrevious />} type="neutral" />
                    <Button text="Salvar" buttonType="submit" class="w-40 text-center" icon={<FaSave />} type="default" />
                </div>
            </form>
        </div>
    )
}
CastrationRequestEdit.displayName = 'CastrationRequestEdit'
export default CastrationRequestEdit
