import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import imagem from '../../assets/family2.jpg'
import check from '../../assets/check.png'
import logo from '../../assets/logo.png'
import { CastrationRequestInterface } from "../../types/CastrationRequestInterface";
import Input from "../../components/input/Input"
import { InputCombobox } from "../../components/input/InputCombobox";
import { InputBoolean } from "../../components/input/InputBoolean";
import { InputFile } from "../../components/input/InputFile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormMask } from "use-mask-input";
import { InputNumber } from "../../components/input/InputNumber";
import { FORMA_PAGAMENTO, GENERO, PORTE_ANIMAIS, TIPO_ANIMAIS } from "../../services/Constantes";
import { Pawbackground } from "../../components/pawbackground/Pawbackground";
import { WaitingListFormSchema, WaitingListRequestSchema } from "../../schemas/WaitingListRequestSchema";
import {publicPost } from "../../services/Axios";
import { EsperaCastracao } from "../../types/EsperaCastracao";




export const CastrationRequest = () => {
    const topRef = useRef<HTMLDivElement | null>(null);
    useEffect(()=>{
        topRef.current?.scrollIntoView({
            behavior: 'smooth', // faz a rolagem suave
            block: 'start',     // garante que o elemento fique no topo da tela
          });
    },[])

    const { register, handleSubmit, formState: { errors, isValid, isSubmitted }, control, watch } = useForm<WaitingListFormSchema>({
        defaultValues: {
            // nome: "Tim",
            // sobrenome: "Maia",
            // cpf: "04263284003",
            // telefone: "51999696596",
            // rua: "Rua das Flores",
            // numero: "123",
            // bairro: "Centro",
            // tipoAnimal: "CACHORRO",
            // nomeAnimal: "Rex",
            // racaAnimal: "Vira-lata",
            // pesoAnimal: '4.5',
            // descricaoAnimal: "Animal dócil e brincalhão",

             animalVacinado: true,
            // porteAnimal: "PEQUENO",
        },
        resolver: zodResolver(WaitingListRequestSchema),
        mode: "onChange"
    });

    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null);
    const [submittedData, setSubmittedData] = useState<EsperaCastracao | null>(null);
    const formValues = watch();

    const registerWithMask = useHookFormMask(register);

    // const { openModal } = useModal();

    const onSubmit: SubmitHandler<CastrationRequestInterface> = data => {
        let headers = {
            'Content-Type': 'multipart/form-data'
        }
        const formData = new FormData();
        if (file?.file) {
            formData.append("file", file?.file);
        }
        formData.append("dto", new Blob([JSON.stringify(data)], { type: "application/json" }));
        publicPost<EsperaCastracao>('/public/castration', formData, headers, (resp) => {
            setSubmittedData(resp);
        })
    };
    const handleFile = (name: string, files: FileList | null) => {
        if (files && files.length > 0) {
            setFile({ fileName: files[0].name, file: files[0] });
        } else {
            setFile(null);
        }
    }
    const renderConfirmacaoCastracao = () => {
        return (
            <div className="border border-gray-300 p-4 mt-5 rounded-md">
                <div className="mensagem-topo bg-green-100 text-green-800 p-4 rounded mb-6 flex items-center space-x-4">
                    <img src={check} alt="Check logo" className="w-20" />
                    <p className="font-bold md:text-md text-sm">
                        Sua solicitação de castração foi registrada e você está na lista de espera. Avisaremos pelo celular assim que a SOS Animais agendar uma nova data.
                    </p>
                </div>
                <h3 className="text-lg/7 font-semibold text-gray-900 border-b border-gray-900/10 pb-5 mt-10">
                    Resumo da solicitação
                </h3>
                <ul className="mt-2 space-y-2">
                    <li><strong>Nome:</strong> {submittedData?.nome}</li>
                    <li><strong>Sobrenome:</strong> {submittedData?.sobrenome}</li>
                    <li><strong>CPF:</strong> {submittedData?.cpf}</li>
                    <li><strong>Telefone:</strong> {submittedData?.telefone}</li>
                    <li><strong>Rua:</strong> {submittedData?.rua}</li>
                    <li><strong>Número:</strong> {submittedData?.numero}</li>
                    <li><strong>Bairro:</strong> {submittedData?.bairro}</li>
                    <li><strong>Tipo de Animal:</strong> {submittedData?.tipoAnimal}</li>
                    <li><strong>Nome do Animal:</strong> {submittedData?.nomeAnimal}</li>
                    <li><strong>Raça do Animal:</strong> {submittedData?.racaAnimal}</li>
                    <li><strong>Peso do Animal:</strong> {submittedData?.pesoAnimal}</li>
                    <li><strong>Animal Vacinado:</strong> {submittedData?.animalVacinado ? "Sim" : "Não"}</li>
                    <li><strong>Descrição:</strong> {submittedData?.descricaoAnimal}</li>
                </ul>
         

            </div>
        );
    };
    const renderFormCastracao = () => {
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="border-b border-gray-900/10 pb-5 mt-5">

                    <h2 className="text-lg/7 font-semibold text-gray-900">Informações Pessoais</h2>
                    <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                        <div className="sm:col-span-2">

                            <Input id="nomeidx"
                                label="Nome"
                                type="text"
                                errors={errors.nome}
                                {...register('nome')}

                            />

                        </div>
                        <div className="sm:col-span-2">

                            <Input id="sobrenomeidx"
                                label="Sobrenome"
                                type="text"
                                errors={errors.sobrenome}
                                {...register('sobrenome')} />
                        </div>
                        <div className="sm:col-span-2">
                            <Input id="cpfidx"
                                label="CPF"
                                type="text"
                                {...registerWithMask('cpf', '999.999.999-99', { autoUnmask: true })}
                                errors={errors.cpf}
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <Input id="telefoneIdx"
                                label="Telefone"
                                type="text"
                                {...registerWithMask('telefone', '(99) 99999-9999', { autoUnmask: true })}
                                errors={errors.telefone}
                            />
                        </div>

                    </div>
                </div>
                <div className="border-b border-gray-900/10 pb-5 mt-5">
                    <h2 className="text-lg/7 font-semibold text-gray-900">Endereço</h2>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-1 ">
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
                        <div className="sm:col-span-2">
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
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-1 mt-3">
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
                            <InputCombobox id="porteAnimalIdx"
                                label="Porte do Animal"
                                comboboxValues={PORTE_ANIMAIS}
                                valueKey="value"
                                arrayKey="label"
                                errors={errors.porteAnimal}
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
                        <div className="sm:col-span-5">
                            <Input id="descricaoAnimalIdx"
                                label="Descrição do Animal (comportamento)"
                                type="textarea"
                                lines={4}
                                errors={errors.descricaoAnimal}
                                {...register('descricaoAnimal')}
                            />

                        </div>
                        <div className="sm:col-span-2">
                            <InputBoolean id='animalVacinadoIdx' name='animalVacinado' label='Animal é vacinado' control={control} />
                        </div>
                    </div>
                    <div className="col-span-full mt-5">
                        <InputFile id="file-upload" name="file-upload" types=".jpeg, .png, .jpg" label="Foto do Animal" value={file} onChange={handleFile} />
                    </div>
                    <div className="sm:col-span-1 mt-3">
                        <InputCombobox id="formaPagamentoIdx"
                            label="Forma de Pagamento"
                            valueKey="value"
                            arrayKey="label"
                            comboboxValues={FORMA_PAGAMENTO}
                            errors={errors.formaPagamento}
                            {...register('formaPagamento')} />
                    </div>
                    <div className="sm:col-span-1 mt-3">
                        <Input id="observacoesIdx"
                                label="Observações"
                                type="textarea"
                                lines={4}
                                errors={errors.observacoes}
                                {...register('observacoes')}
                            />
                    </div>
                </div>
                <div className="border-b border-t border-gray-900/10 py-5 mt-5">
                <h2 className="text-lg/7 font-semibold text-gray-900">Orientações</h2>
                <p className="mt-2 text-gray-700">
                Confira atentamente os dados antes de enviar a solicitação, especialmente as informações de contato (telefone). 
                Sua solicitação será adicionada à fila de espera e, assim que uma data for definida para a castração do seu animal, a <strong>SOS Animais entrará em contato por esse número</strong> para fornecer as novas orientações
                </p>
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
                    </pre> */}
                {!isValid && isSubmitted && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 mt-3 border border-red-200 rounded-lg">
                    ⚠️ Por favor, preencha todos os campos corretamente antes de enviar.
                    </div>
                )}
                <div className="mt-3 flex justify-center">
                    <button type="submit" className="bg-indigo-500 text-white w-60 px-4 rounded-xl py-2 mb-5 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:w-1/5 w-full">
                        Enviar
                    </button>
                </div>
            </form>
        )
    }
    return (
        <Pawbackground>
            <div className="border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white" ref={topRef}>
                <div className="pt-5">
                    <img src={logo} alt="Imagem logo SOS Animais" className="size-1/3   mx-auto" />
                </div>
                {submittedData !== null ? renderConfirmacaoCastracao() : renderFormCastracao()}
            </div>
        </Pawbackground>

    )
}