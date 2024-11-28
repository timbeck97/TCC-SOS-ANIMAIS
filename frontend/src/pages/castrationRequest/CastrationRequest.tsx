import { SubmitHandler, useForm } from "react-hook-form";
import pawBackground from "../../assets/paw.jpg"
import imagem from '../../assets/family2.jpg'
import { CastrationRequestInterface } from "../../types/CastrationRequestInterface";
import Input from "../../components/input/Input"
import { InputBoolean } from "../../components/inputboolean/InputBoolean";
import { InputCombobox } from "../../components/InputCombobox/InputCombobox";
import { useState } from "react";
import { InputFile } from "../../components/inputfile/InputFile";

export const CastrationRequest = () => {

    const [file, setFile] = useState<{ fileName: string, file: File } | null>(null);
    const { register, handleSubmit, formState: { errors }, control, watch } = useForm<CastrationRequestInterface>({
        defaultValues: {
            nome: "",
            sobrenome: "Morgenstern",
            cpf: "04263284003",
            rua: "Lajeado",
            numero: "99",
            bairro: "Centro",
            tipoAnimal: "GATO",
            nomeAnimal: "Jeremias",
            animalVacinado: true
        }
    });

    const formValues = watch();

    // const { openModal } = useModal();

    const onSubmit: SubmitHandler<CastrationRequestInterface> = data => {
        alert(JSON.stringify(data, null, '\t'));
    };

    const handleFile = (name: string, files:FileList) => {
        if (file && files.length > 0) {
            setFile({ fileName: files[0].name, file: files[0] });
        }else{
            setFile(null);
        }
    }
    return (
        <div style={{ backgroundImage: `url(${pawBackground})` }}>
            <div className="container sm:max-w-full  md:max-w-4xl	 mx-auto ">
                <div className="border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white">
                    <div className="pt-5">
                        <img src={imagem} alt="Imagem logo SOS Animais" className="size-1/4  rounded-full mx-auto" />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="border-b border-gray-900/10 pb-5 mt-5">

                            <h2 className="text-lg/7 font-semibold text-gray-900">Informações Pessoais</h2>
                            <div className="mt-3 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4">
                                <div className="sm:col-span-2">

                                    <Input id="nomeidx"
                                        label="Nome"
                                        name="nome"
                                        type="text"
                                        required
                                        errors={errors.nome}
                                        register={register}
                                        onChange={(name, value) => console.log(name, value)}
                                    />

                                </div>
                                <div className="sm:col-span-2">

                                    <Input id="sobrenomeidx"
                                        name="sobrenome"
                                        label="Sobrenome"
                                        type="text"
                                        required
                                        errors={errors.sobrenome}
                                        register={register} />
                                </div>
                                <div className="sm:col-span-2">
                                    <Input id="cpfidx"
                                        name="cpf"
                                        label="CPF"
                                        type="text"
                                        format="cpf"
                                        required
                                        errors={errors.cpf}
                                        register={register} />
                                </div>

                            </div>
                        </div>
                        <div className="border-b border-gray-900/10 pb-5 mt-5">
                            <h2 className="text-lg/7 font-semibold text-gray-900">Endereço</h2>
                            <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-1 ">
                                <div className="sm:col-span-2">
                                    <Input id="ruaidx"
                                        name="rua"
                                        label="Rua"
                                        type="text"
                                        required
                                        onChange={(name, value) => console.log(name, value)}
                                        errors={errors.rua}
                                        register={register} />
                                </div>
                                <div className="sm:col-span-1">
                                    <Input id="numeroidx"
                                        name="numero"
                                        label="Número"
                                        type="text"
                                        required
                                        //onChange={(name, value)=>console.log(name,value)}
                                        errors={errors.numero}
                                        register={register} />
                                </div>
                                <div className="sm:col-span-2">
                                    {/* <Input id="bairroidx" name="bairro" type="text" label="Bairro" value={form.bairro} onChange={onChangeForm} /> */}
                                    <Input id="bairroidx"
                                        name="bairro"
                                        label="Bairro"
                                        type="text"
                                        required
                                        //onChange={(name, value)=>console.log(name,value)}
                                        errors={errors.bairro}
                                        register={register} />
                                </div>
                            </div>
                        </div>
                        <div className="boder-b border-gray-900/10 pb-5 mt-5">
                            <h2 className="text-lg/7 font-semibold text-gray-900">Dados do Animal</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-5 gap-x-6 gap-y-1 mt-3">
                                <div className="sm:col-span-1">

                                    <InputCombobox id="tipoAnimalidx" name="tipoAnimal"
                                        label="Tipo de Animal" onChange={() => console.log('alterando valor')}

                                        comboboxValues={[{ label: 'Cachorro', value: 'CACHORRO' }, { label: 'Gato', value: 'GATO' }]}
                                        errors={errors.tipoAnimal}
                                        register={register} />
                                </div>
                                <div className="sm:col-span-2">
                                    <Input id="nomeAnimalidx"
                                        name="nomeAnimal"
                                        label="Nome do Animal"
                                        type="text"
                                        required
                                        //onChange={(name, value)=>console.log(name,value)}
                                        errors={errors.nomeAnimal}
                                        register={register} />
                                </div>
                                <div className="sm:col-span-2">
                                    <Input id="racaAnimalIdx"
                                        name="racaAnimal"
                                        label="Raça do Animal"
                                        type="text"
                                        required
                                        //onChange={(name, value)=>console.log(name,value)}
                                        errors={errors.racaAnimal}
                                        register={register} />

                                </div>
                                <div className="sm:col-span-2">
                                    <InputBoolean id='animalVacinadoIdx' name='animalVacinado' label='Animal é vacinado' control={control} />
                                </div>
                            </div>
                            <div className="col-span-full mt-5">
                                <InputFile id="file-upload" name="file-upload" label="Foto do Animal" value={file} onChange={handleFile} />
                            </div>
                        </div>


                        <pre className="mt-5">
                            <p className="font-bold">
                                Valores formulário
                            </p>

                            <p>Nome: {formValues.nome}</p>
                            <p>Sobrenome: {formValues.sobrenome}</p>
                            <p>CPF: {formValues.cpf}</p>
                            <p>Rua: {formValues.rua}</p>
                            <p>Número: {formValues.numero}</p>
                            <p>Bairro: {formValues.bairro}</p>
                            <p>Tipo de Animal: {formValues.tipoAnimal}</p>
                            <p>Nome do Animal: {formValues.nomeAnimal}</p>
                            <p>Raça do Animal: {formValues.racaAnimal}</p>
                            <p>Animal Vacinado: {`${formValues.animalVacinado ? 'Sim' : 'Não'}`}</p>

                        </pre>
                     
                        <div className="border-t border-gray-900/10 mt-5 flex justify-center    ">
                            <button type="submit" className="bg-indigo-500 mt-8 text-white w-60 px-4 rounded-xl py-2 mb-5 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}