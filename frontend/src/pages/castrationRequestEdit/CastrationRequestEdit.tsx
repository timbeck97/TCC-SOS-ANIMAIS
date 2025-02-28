import { SubmitHandler, useForm } from "react-hook-form";
import { WaitingListFormSchema, WaitingListRequestSchema } from "../../schemas/WaitingListRequestSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EsperaCastracao } from "../../types/EsperaCastracao";
import { useHookFormMask } from "use-mask-input";
import { CastrationRequestInterface } from "../../types/CastrationRequestInterface";
import { useParams } from "react-router-dom";
import { get } from "../../services/Axios";
import { InputFile } from "../../components/input/InputFile";
import { InputCombobox } from "../../components/input/InputCombobox";
import { FORMA_PAGAMENTO, PORTE_ANIMAIS, TIPO_ANIMAIS } from "../../services/Constantes";
import { InputBoolean } from "../../components/input/InputBoolean";
import { InputNumber } from "../../components/input/InputNumber";
import Input from "../../components/input/Input";
import { FaixaValor } from "../../types/FaixaValor";

export const CastrationRequestEdit = () => {

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, reset, control, watch } = useForm<WaitingListFormSchema>({
        resolver: zodResolver(WaitingListRequestSchema),
        mode: "onChange"
    });
    const { id } = useParams<{ id: string | undefined }>()
    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null);
    const [submittedData, setSubmittedData] = useState<EsperaCastracao | null>(null);
    const [faixaValores, setFaixaValores] = useState<FaixaValor[]>([])
    const formValues = watch();

    const registerWithMask = useHookFormMask(register);
    useEffect(() => {
        getData();
        getFaixasPreco();
    }, [reset, id])
    const getData = async() => {
        let response=await get<EsperaCastracao>('/castration/waitingList/' + id, {}, {})
        reset({
            nome: response.data.nome,
            sobrenome: response.data.sobrenome,
            cpf: response.data.cpf,
            telefone: response.data.telefone,
            rua: response.data.rua,
            numero: response.data.numero,
            bairro: response.data.bairro,
            tipoAnimal: response.data.tipoAnimal,
            nomeAnimal: response.data.nomeAnimal,
            racaAnimal: response.data.racaAnimal,
            pesoAnimal: String(response.data.pesoAnimal),
            descricaoAnimal: response.data.descricaoAnimal,
            animalVacinado: response.data.animalVacinado,
            porteAnimal: response.data.porteAnimal,
        })
    }
    const getFaixasPreco = async () => {
        let response = await get<FaixaValor[]>('/faixapreco', {}, {})
        let data=response?.data;
        data.unshift({ id: 0, descricao: 'Não Informado', valor: '0' })
        setFaixaValores(data)
    }
    const onSubmit: SubmitHandler<CastrationRequestInterface> = data => {
        let headers = {
            'Content-Type': 'multipart/form-data'
        }
        const formData = new FormData();
        if (file?.file) {
            formData.append("file", file?.file);
        }
        formData.append("dto", new Blob([JSON.stringify(data)], { type: "application/json" }));

    };
    const handleFile = (name: string, files: FileList | null) => {
        if (files && files.length > 0) {
            setFile({ fileName: files[0].name, file: files[0] });
        } else {
            setFile(null);
        }
    }

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
                                {...register('telefone')}
                                errors={errors.telefone}
                            />
                        </div>

                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-5 mt-5">
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
                <div className="boder-b border-gray-900/10 pb-5 mt-5">
                    <h2 className="text-lg/7 font-semibold text-gray-900">Dados do Animal</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-1 mt-3">
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
                        <div className="sm:col-span-2">
                            <Input id="nomeAnimalidx"
                                label="Nome do Animal"
                                type="text"
                                errors={errors.nomeAnimal}
                                {...register('nomeAnimal')} />
                        </div>
                        <div className="sm:col-span-2">
                            <Input id="racaAnimalIdx"
                                label="Raça do Animal"
                                type="text"
                                errors={errors.racaAnimal}
                                {...register('racaAnimal')} />

                        </div>
                        <div className="sm:col-span-2">
                            <InputNumber id="pesoIdx"
                                name="pesoAnimal"
                                value={formValues.pesoAnimal}
                                label="Peso Aproximado (kg)"
                                type="numeric2decimals"
                                control={control}
                                errors={errors.pesoAnimal} />
                        </div>
                        <div className="sm:col-span-2">
                            <InputCombobox id="porteAnimalIdx"
                                label="Porte do Animal"
                                comboboxValues={PORTE_ANIMAIS}
                                valueKey="value"
                                arrayKey="label"
                                errors={errors.porteAnimal}
                                //register={register} />
                                {...register('porteAnimal')} />
                        </div>

                        <div className="sm:col-span-2">
                            <InputBoolean id='animalVacinadoIdx' name='animalVacinado' label='Animal é vacinado' control={control} />
                        </div>
                    </div>
                    <div className="border-b border-gray-900/10 pb-5 mt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-1 mt-3">
                            <div className="sm:col-span-5">
                                <Input id="descricaoAnimalIdx"
                                    label="Descrição do Animal (comportamento)"
                                    type="textarea"
                                    lines={4}
                                    errors={errors.descricaoAnimal}
                                    {...register('descricaoAnimal')}
                                />

                            </div>
                        </div>
                        <div className="col-span-full mt-5">
                            {/* <InputFile id="file-upload" name="file-upload" types=".jpeg, .png, .jpg" label="Foto do Animal" value={file} onChange={handleFile} /> */}
                            <div className="relative">

                                <svg className="size-60  text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />

                                </svg>
                                <span className="absolute top-0">teste</span>
                            </div>
                        </div>
                    </div>
                    <div className="boder-b border-gray-900/10 pb-5 mt-5">

                        <h2 className="text-lg/7 font-semibold text-gray-900">Dados do Animal</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-6 gap-x-6 gap-y-1 mt-3">

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
                                    {...register('idFaixa')}
                                    valueKey="id"
                                    arrayKey="descricao"

                                />
                            </div>
                        </div>
                    </div>

                </div>
                 <pre className="mt-5">
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
                    </pre>
               
                {!isValid && isSubmitted && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 mt-3 border border-red-200 rounded-lg">
                        ⚠️ Por favor, preencha todos os campos corretamente antes de enviar.
                    </div>
                )}
                <div className="mt-3 flex justify-center">
                    <button type="submit" className="bg-indigo-500 text-white w-60 px-4 rounded-xl py-2 mb-5 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Enviar
                    </button>
                </div>
            </form>
        </div>
    )
}