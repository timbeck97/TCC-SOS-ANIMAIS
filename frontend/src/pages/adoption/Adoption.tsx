import { useEffect, useState } from "react";
import Pawbackground from "../../components/pawbackground/Pawbackground";
import { AnimalAdoption } from "../../types/AnimalAdoption";
import Button from "../../components/button/Button";
import { publicRequest } from "../../services/Axios";
import Loading from "../../components/loading/Loading";
import { useNavigate, useParams } from "react-router-dom";
import {  FaTimes } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import paw from '../../assets/paw.svg';
import male from '../../assets/male.svg';
import female from '../../assets/female.svg'
import cake from '../../assets/cake.svg';
import { formatGeneroAnimal, formatNumeroTelefone, formatPorteAnimal } from "../../services/Util";
import Title from "../../components/title/Title";

const Adoption = () => {
    const { id } = useParams<{ id: string | undefined }>()
    const navigate = useNavigate();
    const [animals, setAnimals] = useState<AnimalAdoption[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [animalAdoption, setAnimalAdoption] = useState<AnimalAdoption | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getAnimals()
    }, []);
    useEffect(() => {
        if (id) {
            getAnimalAdoption(id);
        }
    }, [id]);
    const getAnimals = async () => {
        setIsLoading(true);
        let resp = await publicRequest<AnimalAdoption[]>('get', '/public/adoption')
        if (resp) {
            setAnimals(resp || []);
            console.log(resp)
        }
        setIsLoading(false);
    }
    const getAnimalAdoption = async (id: string) => {
        setIsLoading(true);
        let resp = await publicRequest<AnimalAdoption>('get', `/public/adoption/${id}`)
        if (resp) {
            setAnimalAdoption(resp);
        }
        setIsLoading(false);
    }
    const mandarMensagem = (animal: AnimalAdoption) => {
        const numero = `55${animal.telefone}`; 
        const mensagem = encodeURIComponent(`Olá, gostaria de adotar o animal ${animal.nome}.\n\n` +
            `Idade: ${animal.idade}\n` +
            `Porte: ${animal.porte}\n` +
            `Raça: ${animal.raca}\n` +
            `Gênero: ${animal.genero}\n` +
            `Descrição: ${animal.descricao}\n\n` +
            `Por favor, entre em contato comigo para mais informações.\n\n` +
            `Obrigado!`);
        const url = `https://wa.me/${numero}?text=${mensagem}`;
        window.open(url, '_blank'); 
 
    }
    if (id) {
        return (
            <Pawbackground>
                {image && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
                        onClick={() => setImage(null)}
                    >
                        <FaTimes className="absolute top-4 right-4 text-white  cursor-pointer" size={25} />
                        <img
                            onClick={(e) => e.stopPropagation()}
                            src={image}
                            alt={'animal'}
                            className="max-w-full max-h-full"
                        />
                    </div>
                )}
                <div className="container mx-auto p-4 bg-white ">
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <div className="flex-1">
                            <img
                                className="object-cover cursor-pointer rounded-lg shadow-lg col-span-1 md:col-span-2 lg:col-span-3"
                                src={animalAdoption?.imagens.find(x => x.principal)?.url || ''}
                                alt={`Foto de ${animalAdoption?.nome}`}
                                onClick={() => setImage(animalAdoption?.imagens.find(x => x.principal)?.url || '')}
                            />
                            {animalAdoption && animalAdoption.imagens.length > 1 && (
                                <div className="mt-2 grid grid-cols-3 gap-2">
                                    {animalAdoption.imagens.filter(x => !x.principal).map((image, idx) => (
                                        <img
                                            key={idx}
                                            className="w-full h-36 object-cover rounded-lg shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                                            src={image.url}
                                            alt={`Foto adicional de ${animalAdoption?.nome}`}
                                            onClick={() => setImage(image.url || '')}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex-1">

                            <div>
                                <h1 className="text-4xl poppins-bold text-purple-700 mb-4">{animalAdoption?.nome}</h1>
                                <p className="text-gray-600 poppins-regular mb-4">{animalAdoption?.descricao}</p>
                                <ul className="text-lg text-purple-700 poppins-regular space-y-3">
                                    <li className="flex gap-1 items-center"><img alt="bolo" src={cake} className="h-6" /><span className="ml-1">{animalAdoption?.idade}</span></li>
                                    <li className="flex gap-1 items-center"><img alt="porte" className="h-6" src={paw}/> <span className="ml-1">{formatPorteAnimal(animalAdoption?.porte)}</span></li>
                                    <li className="flex gap-1 items-center"><FcLike size={25} /><span className="ml-1">{animalAdoption?.raca}</span></li>
                                    <li className="flex gap-1 items-center">{animalAdoption?.genero === 'MACHO' ? <img alt="homem" className="h-6" src={male} /> : <img alt="mulher" className="h-6" src={female} />}<span className="ml-1">{formatGeneroAnimal(animalAdoption?.genero)}</span></li>
                                </ul>
                            </div>
                            <hr className="mt-5"/>
                            <div className="mt-4">
                                <Title text="Contato" color="text-purple-700" />
                                <p className="text-lg text-gray-600 poppins-semibold mt-2">Telefone: <a href={`tel:${animalAdoption?.telefone}`} className="poppins-regular hover:underline">{formatNumeroTelefone(animalAdoption?.telefone||'')}</a></p>
                            </div>
                            <div className="mt-6">
                                <Button text="Quero adotar" icon={<FcLike/>} onClick={() => mandarMensagem(animalAdoption||{} as AnimalAdoption)} type="success" class="w-full" />
                                <Button text="Voltar" onClick={() => navigate('/adocao')} type="default" class="w-full mt-2" />
                            </div>
                        </div>
                    </div>
                </div>



            </Pawbackground>
        )
    }
    return (
        <Pawbackground>
            <div className="flex flex-col bg-stone-100  items-center justify-center h-full">
                <div className="bg-[#0e9f6e] container mx-auto text-center p-4 rounded-sm shadow-md mb-6">
                    <h1 className="hd:text-2xl mobile:text-md  text-white poppins-semi-bold">Adoção de animais</h1>
                    <p className="text-lg text-white mb-6">
                        Conheça nossos animais disponíveis para adoção. Todos eles estão prontos para encontrar um lar amoroso.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 max-w-7xl w-full">
                    {animals.map((pet, idx) => (
                        <div key={pet.id} className="flex flex-col justify-between bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                            <img
                                className="w-full h-96 object-cover"
                                src={pet.imagens.find(x => x.principal)?.url || ''}
                                alt={`Foto de ${pet.nome}`}
                            />
                            <div className="p-4">
                                <h2 className="text-2xl font-bold text-gray-800 mb-3">{pet.nome}</h2>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    <li className="flex gap-1 items-center"><img alt="bolo" src={cake} className="h-5" /><span className="ml-1">{pet?.idade}</span></li>
                                    <li className="flex gap-1 items-center"><img alt="porte" className="h-5" src={paw}/> <span className="ml-1">{formatPorteAnimal(pet?.porte)}</span></li>
                                    <li className="flex gap-1 items-center"><FcLike size={20} /><span className="ml-1">{pet?.raca}</span></li>
                                    <li className="flex gap-1 items-center">{pet?.genero === 'MACHO' ? <img alt="homem" className="h-5" src={male} /> : <img alt="mulher" className="h-5" src={female} />}<span className="ml-1">{formatGeneroAnimal(pet?.genero)}</span></li>
                                </ul>
                            </div>
                            <div className="flex justify-center mb-4 px-5">
                                <Button text="Abrir" onClick={() => navigate('/adocao/' + pet.id)} type="success" class="w-full" />
                            </div>
                        </div>
                    ))}

                </div>
                <Loading loading={isLoading} />

            </div>





        </Pawbackground>
    );
}
Adoption.displayName = 'Adoption';
export default Adoption;