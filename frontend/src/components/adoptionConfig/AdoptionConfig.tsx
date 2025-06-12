import { IoIosMale, IoIosPaw } from "react-icons/io";
import { IoFemale } from "react-icons/io5";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { AiTwotoneHeart } from "react-icons/ai";
import Pawbackground from "../pawbackground/Pawbackground";
import Title from "../title/Title";
import { MdOutlinePets } from "react-icons/md";
import Button from "../button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { AnimalAdoption } from "../../types/AnimalAdoption";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AdoptionSchema, AdoptionType } from "../../schemas/AdoptionSchema";
import { BsCamera } from "react-icons/bs";
import Input from "../input/Input";
import { GENERO, PORTE_ANIMAIS, SITUACAO_ADOCAO, TIPO_ANIMAIS } from "../../services/Constantes";
import InputCombobox from "../input/InputCombobox";
import ConfirmModal from "../modal/ConfirmModal";
import { request } from "../../services/Axios";
import { openAlertSuccess } from "../../services/Alert";
import Loading from "../loading/Loading";
import { ImageInterface } from "../../types/ImageInterface";
import { FaSearch, FaStar, FaTrash } from "react-icons/fa";
import { useHookFormMask } from "use-mask-input";
import AdoptionFilter from "../adoptionFilter/AdoptionFilter";
import { AnimalRequestFilter } from "../../types/AnimalRequestFilter";
import { AxiosRequestConfig } from "axios";
import { PaginatedData } from "../../types/PaginatedData";
import { PaginationConfig } from "../../types/PaginationConfig";



const AdoptionsConfig = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string | undefined }>()
    const { register, setValue, handleSubmit, formState: { errors }, watch, reset, trigger } = useForm<AdoptionType>({
        resolver: zodResolver(AdoptionSchema),
        mode: "onChange"
    });
    const [filtro, setFiltro] = useState<AnimalRequestFilter>({ tipoAnimal: null });
    const [paginacao, setPaginacao] = useState<PaginationConfig>({ quantidadeRegistros: 9, numeroPagina: 0, totalElements: 0, totalPages: 0 });
    const registerWithMask = useHookFormMask(register);
    const fileList = watch("imagens");
    const [lastFile, setLastFile] = useState<ImageInterface[] | null>(null);
    const [previewUrl, setPreviewUrl] = useState<ImageInterface[] | null>(null);
    const [cfmDeleteAdoption, setCfmDeleteAdoption] = useState<boolean>(false);
    const [adoptions, setAdoptions] = useState<AnimalAdoption[]>([]);
    const [loading, setLoading] = useState(false);
    const [urlsRevoke, setUrlsRevoke] = useState<Set<string>>(new Set(''));
    useEffect(() => {
        if (id && id !== 'novo') {
            getAdoption(id);
        }
        getAllAdoptions();
        // eslint-disable-next-line
        return () => {
            urlsRevoke.forEach((url: string) => {
                URL.revokeObjectURL(url);
                console.log('revoked url: ', url);
            });
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        getAllAdoptions();
    // eslint-disable-next-line
    }, [filtro])

    useEffect(() => {
        if (fileList && fileList.length > 0) {
            let imagens = fileList.map((file: ImageInterface) => {
                if (file.file) {
                    return {
                        ...file,
                        url: URL.createObjectURL(file.file)
                    }
                }
                return file;
            })
            setPreviewUrl(imagens);

        } else {
            setPreviewUrl(null);
        }
    }, [fileList]);
    const getAllAdoptions = async () => {
        let list = await getAdoptions({
            params: {
                tipoAnimal: filtro.tipoAnimal,
                genero: filtro.sexoAnimal,
                situacaoAdocao: filtro.situacaoAdocao,
                quantidadeRegistros: paginacao.quantidadeRegistros,
            }
        });
        setAdoptions(list.data);
        setPaginacao({
            numeroPagina: 0,
            quantidadeRegistros: paginacao.quantidadeRegistros,
            totalElements: list.totalElements,
            totalPages: list.totalPages
        })
    }
    const getAdoptions = async (config: AxiosRequestConfig | {}): Promise<PaginatedData<AnimalAdoption>> => {
        setLoading(true);
        const adoptions = await request<PaginatedData<AnimalAdoption>>('get', '/adoption', null, config);
        if (adoptions) {
            setLoading(false);
            return adoptions
        }
        setLoading(false);
        return { data: [], totalElements: 0, totalPages: 0 }
    }
    const getAdoptionImage = async (adoptionImage: ImageInterface) => {
        const resp = await fetch(adoptionImage.url || '');
        const blob = await resp.blob();
        const file = new File([blob], 'imagem.jpg', { type: blob.type });
        const objectUrl = URL.createObjectURL(blob);
        return { ...adoptionImage, url: objectUrl, file: file };

    }
    const getAdoption = async (id: string) => {
        setLoading(true);
        const resp = await request<AnimalAdoption>('get', '/adoption/' + id);
        if (resp) {
            setValue("id", String(resp.id));
            setValue("nome", resp.nome);
            setValue("descricao", resp.descricao);
            setValue("idade", resp.idade);
            setValue("porte", resp.porte);
            setValue("raca", resp.raca);
            setValue("genero", resp.genero);
            setValue("situacao", resp.situacao);
            setValue("telefone", resp.telefone);
            resp.imagens = await Promise.all(resp.imagens.map((adoptionImage) => getAdoptionImage(adoptionImage)));
            resp.imagens = resp.imagens.map((adoptionImage, idx) => { return { ...adoptionImage, number: idx + 1 } })
            setLastFile(resp.imagens);
            setValue("imagens", resp.imagens, { shouldValidate: false });
            setPreviewUrl(resp.imagens);
            setValue("tipoAnimal", resp.tipoAnimal);
            setUrlsRevoke((prev) => {
                resp.imagens.forEach((adoptionImage) => {
                    if (adoptionImage.url) {
                        prev.add(adoptionImage.url);
                    }
                });
                return prev;
            });


            trigger();
        }
        setLoading(false);
        navigate('/gerenciar/adocao/' + id);
    }
    const deleteAdoptionRequest = async () => {
        await request('delete', '/adoption/' + id);
        setAdoptions((prev) => {
            return prev.filter((a) => String(a.id) !== id);
        });
        openAlertSuccess("Animal removido com sucesso");
        setCfmDeleteAdoption(false);
        navigate('/gerenciar/adocao');

    }
    const handleAbrir = (animalAdoption: AnimalAdoption) => {
        getAdoption(String(animalAdoption.id));
    }
    const onSubmit = async (data: any) => {
        setLoading(true);
        const formData = new FormData();
        for (const key in data) {
            if (key !== 'imagens') {
                formData.append(key, data[key]);
            }
        }

        for (let i = 0; i < data.imagens.length; i++) {
            formData.append(`files[${i}].file`, data.imagens[i].file);
            formData.append(`files[${i}].principal`, String(data.imagens[i].principal));
            if (data.imagens[i].id) {
                formData.append(`files[${i}].id`, String(data.imagens[i].id));
            }
            if (data.imagens[i].alterou) {
                formData.append(`files[${i}].alterou`, String(data.imagens[i].alterou));
            }
        }

        let method: 'put' | 'post' = id && id !== 'novo' ? 'put' : 'post';
        let uri: string = id && id !== 'novo' ? '/adoption/' + id : '/adoption';
        let resp = await request<AnimalAdoption>(method, uri, formData);
        if (resp) {
            setAdoptions((prev) => {
                const existingIndex = prev.findIndex((a) => a.id === resp?.id);
                if (existingIndex !== -1) {
                    const updated = [...prev];
                    updated[existingIndex] = resp || ({} as AnimalAdoption);
                    return updated;
                }
                return [...prev, resp || ({} as AnimalAdoption)];
            });
            openAlertSuccess("Animal cadastrado com sucesso");
            reset();
            navigate('/gerenciar/adocao');
        } else {
            return;
        }
        setLoading(false);

    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            let fileSelected = Array.from(files)[0];
            let imagemArray = fileList ? [...fileList] : [];
            let imagem: ImageInterface = {
                number: imagemArray.length + 1,
                file: fileSelected,
                principal: imagemArray.length === 0,
                url: URL.createObjectURL(fileSelected)
            }
            imagemArray.push(imagem);
            setLastFile(imagemArray);
            setValue("imagens", imagemArray, { shouldValidate: true });
            setPreviewUrl(imagemArray);
            setUrlsRevoke((prev) => {
                if (imagem.url) {
                    prev.add(imagem.url);
                }
                return prev;
            });

        } else if (lastFile) {
            setValue("imagens", lastFile, { shouldValidate: false });
        }

    };
    const changeImagePrincipal = (imagemSelecionada: ImageInterface, idx: number) => {
        if (!previewUrl) return;
        let idxPrincipal = previewUrl.findIndex(image => image.principal);
        const updated = previewUrl.map(image => ({
            ...image,
            principal: image.number === imagemSelecionada.number,
        }));
        const temp = updated[idx];
        updated[idx] = updated[idxPrincipal];
        updated[idxPrincipal] = temp;
        setPreviewUrl(updated);
        setValue("imagens", updated, { shouldValidate: true });
    };
    const removeImage = (image: ImageInterface) => {
        if (previewUrl) {
            const newPreviewUrl = previewUrl.filter((img) => {
                return img.number !== image.number;
            });
            setPreviewUrl(newPreviewUrl);
            setValue("imagens", newPreviewUrl, { shouldValidate: true });
        }
    }
    const handleChangeFiltro = (filtro: AnimalRequestFilter) => {
        setFiltro(filtro);
    }
    const handleCarregarMais = async () => {
        setPaginacao((prev) => {
            return { ...prev, numeroPagina: prev.numeroPagina + 1 };
        });
        const newAdoptions = await getAdoptions({
            params: {
                tipoAnimal: filtro.tipoAnimal,
                genero: filtro.sexoAnimal,
                situacaoAdocao: filtro.situacaoAdocao,
                quantidadeRegistros: paginacao.quantidadeRegistros,
                numeroPagina: paginacao.numeroPagina + 1
            }
        });
        setAdoptions((prev) => {
            return [...prev, ...newAdoptions.data];
        });
        setPaginacao((prev) => {
            return {
                ...prev,
                totalElements: newAdoptions.totalElements,
                totalPages: newAdoptions.totalPages
            }
        });
    }
    const renderAdoptionList = () => {
        return (
            <Pawbackground>
                <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white relative'>
                    <div className="rounded px-2 pt-4 flex items-center justify-between  border-b border-gray-900/10 pb-5">
                        <Title text="Animais para adoção" icon={<MdOutlinePets size={35} color="#464549" />} />
                        <Button text="Cadastrar Animal" type="default" buttonType="button" onClick={() => {
                            navigate('/gerenciar/adocao/novo');
                            reset();
                        }} />
                    </div>
                    <div className="w-full flex items-center justify-center mt-5  border-b border-gray-900/10 pb-5">
                        <AdoptionFilter onFilterChange={(filtro: AnimalRequestFilter) => handleChangeFiltro(filtro)} filtrarSituacao={true}/>
                    </div>
                    <div className="grid  hd:grid-cols-3 mobile:grid-cols-1 fullhd:grid-cols-3 justify-items-center gap-4 p-4">
                        {adoptions.map((pet, idx) => (
                            <div key={idx} className="flex flex-col justify-between bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                                <img
                                    className="w-full h-96 object-cover"
                                    src={pet.imagens.find(x => x.principal)?.url || ''}
                                    alt={`Foto de ${pet.nome}`}
                                />
                                <div className="p-4">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{pet.nome}</h2>
                                    <p className="text-gray-600 text-sm mb-3">{pet.descricao}</p>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li className="flex gap-1 items-center"><LiaBirthdayCakeSolid size={20} /><span>{pet.idade}</span></li>
                                        <li className="flex gap-1 items-center"><IoIosPaw /> <span>{pet.porte}</span></li>
                                        <li className="flex gap-1 items-center"><AiTwotoneHeart /><span>{pet.raca}</span></li>
                                        <li className="flex gap-1 items-center">{pet.genero === 'MACHO' ? <IoIosMale /> : <IoFemale />}{pet.genero}</li>
                                    </ul>
                                </div>
                                <div className="flex justify-center mb-4 px-5">
                                    <Button text="Abrir" onClick={() => handleAbrir(pet)} type="default" class="w-full" />
                                </div>
                            </div>

                        ))}
                    </div>

                    {paginacao.totalElements > 0 && paginacao.totalElements > adoptions.length &&
                        <div className="flex justify-center mb-4 px-5">
                            <Button text="Carregar mais" class=" w-full sm:w-1/3" onClick={handleCarregarMais} type="success" icon={<FaSearch />} />
                        </div>
                    }

                </div>
            </Pawbackground>
        )
    }

    const renderAdoption = () => {
        return (
            <Pawbackground className="max-w-2xl mx-auto">
                <div className='relative  bg-white p-6 rounded shadow mt-3'>
                    <div className="rounded px-2 pt-4 flex justify-between  border-b border-gray-900/10 pb-5">
                        <Title text="Cadastro de animal para adoção" icon={<MdOutlinePets size={35} color="#464549" />} />
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto mt-2">
                        <div className="mb-8">
                            <div className="flex flex-col items-center justify-center mb-4">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl.find(x => x.principal)?.url || ''}
                                        alt="Preview da imagem"
                                        className="max-w-full max-h-96 object-contain rounded mb-2 shadow-md"
                                    />
                                ) : (
                                    <>
                                        <div className="w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 mb-2 rounded">
                                            Nenhuma imagem selecionada
                                        </div>
                                        <label className="cursor-pointer" htmlFor="adoptionAnimalInput">
                                            <div className="h-24 w-36 bg-gray-100 flex flex-col items-center justify-center text-gray-400 mb-2 rounded">

                                                <BsCamera color="gray" size={40} />

                                                <span>
                                                    <p className="text-gray-500 text-sm">Adicionar Imagem</p>
                                                </span>
                                            </div>
                                        </label>
                                    </>
                                )}


                            </div>
                            {previewUrl &&

                                <ul className="flex gap-4 relative flex-wrap justify-center sm:justify-start">
                                    {previewUrl.filter(p => !p.principal).map((image, idx) => {

                                        return (
                                            <li key={image.id || image.number} className="relative  max-w-36 border " >
                                                <img

                                                    className="h-36 object-cover shadow-md rounded-md"
                                                    src={image.url || ''}
                                                    alt={`Foto do animal}`}
                                                />

                                                <label className="absolute top-0 left-0 bg-stone-500 text-white rounded-full p-1 cursor-pointer" onClick={() => changeImagePrincipal(image, idx)}>
                                                    <FaStar color="white" title="Definir como foto principal" size={12} />
                                                </label>
                                                <label className="absolute top-0 right-0 bg-stone-500 text-white rounded-full p-1 cursor-pointer" onClick={() => removeImage(image)}>
                                                    <FaTrash color="white" title="Remover" size={12} />
                                                </label>
                                            </li>
                                        )
                                    }
                                    )}

                                    <li>
                                        <label className="cursor-pointer" htmlFor="adoptionAnimalInput">
                                            <div className="h-24 w-24 bg-gray-100 flex flex-col items-center justify-center text-gray-400 mb-2 rounded">

                                                <BsCamera color="gray" size={40} />

                                                <div className="flex justify-center">
                                                    <p className="text-gray-500 text-sm text-center">Adicionar Imagem</p>
                                                </div>
                                            </div>
                                        </label>
                                    </li>


                                </ul>


                            }

                        </div>
                        <input className="hidden" id='adoptionAnimalInput' {...register("imagens")} type="file" accept="image/*" onChange={handleFileChange} />


                        {errors.imagens?.message && <p className="text-red-500 text-xs">{String(errors.imagens.message)}</p>}

                        <div className="mb-4 mt-2">
                            <Input id="nomeidx"
                                label="Nome"
                                type="text"
                                errors={errors.nome}
                                {...register('nome')}
                            />
                        </div>

                        <div className="mb-4">
                            <Input id="descricaoAnimalIdx"
                                label="Descrição do Animal"
                                type="textarea"
                                lines={6}
                                errors={errors.descricao}
                                {...register('descricao')}
                            />
                        </div>

                        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <Input id="idadeAnimalIdx"
                                    label="Idade do Animal"
                                    type="text"
                                    errors={errors.idade}
                                    {...register('idade')} />
                            </div>
                            <div>
                                <InputCombobox id="porteAnimalIdx"
                                    label="Porte do Animal"
                                    comboboxValues={PORTE_ANIMAIS}
                                    valueKey="value"
                                    arrayKey="label"
                                    errors={errors.porte}
                                    {...register('porte')} />
                            </div>

                            <div>
                                <Input id="racaIdx"
                                    label="Raça do Animal"
                                    type="text"
                                    errors={errors.raca}
                                    {...register('raca')}
                                />
                            </div>
                        </div>

                        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <Input id="telefoneIdx"
                                label="Telefone"
                                type="text"
                                {...registerWithMask('telefone', '(99) 99999-9999', { autoUnmask: true })}
                                errors={errors.telefone}
                            />
                            <InputCombobox id="generoAnimalIdx"
                                label="Gênero do Animal"
                                comboboxValues={GENERO}
                                valueKey="value"
                                arrayKey="label"
                                errors={errors.genero}
                                {...register('genero')} />
                            <InputCombobox id="tipoAnimalIdx"
                                label="Tipo de Animal"
                                comboboxValues={TIPO_ANIMAIS}
                                valueKey="value"
                                arrayKey="label"
                                errors={errors.tipoAnimal}
                                {...register('tipoAnimal')} />
                        </div>
                        <div>
                            <InputCombobox id="situacaoAdocaoIdx"
                                label="Situação da Adoção"
                                comboboxValues={SITUACAO_ADOCAO}
                                valueKey="value"
                                arrayKey="label"
                                errors={errors.situacao}
                                {...register('situacao')} />
                        </div>
                        <div className="mb-4 flex justify-between mt-4">
                            <div className="gap-4 flex">
                                <Button text="Salvar" class="w-32" type="default" buttonType="submit" />
                                <Button text="Voltar" type="neutral" buttonType="button" onClick={() => {
                                    navigate('/gerenciar/adocao');
                                    reset();
                                }} />
                            </div>

                            {id && id !== 'novo' && <Button text="Excluir" type="danger" onClick={() => setCfmDeleteAdoption(true)} />}

                        </div>
                    </form>
                    <ConfirmModal
                        show={cfmDeleteAdoption}
                        confirm={() => deleteAdoptionRequest()}
                        close={() => setCfmDeleteAdoption(false)}
                        title="Remover animal da lista de adoção"
                        text="Deseja realmente remover este animal da lista de adoção?"
                    />
                </div>
            </Pawbackground >
        )
    }

    return (
        <div className="flex flex-col grow">
            {id ? renderAdoption() : renderAdoptionList()}
            <Loading loading={loading} />
        </div >

    );
}
AdoptionsConfig.displayName = "AdoptionsConfig";
export default AdoptionsConfig;