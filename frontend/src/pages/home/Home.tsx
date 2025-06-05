import { NavLink } from "react-router-dom"
import banner from '../../assets/banner.jpg'
import logo from '../../assets/logo.png'
import family from '../../assets/family2.jpg'
import { MdOutlinePhoneEnabled } from "react-icons/md"
const Home = () => {


    return (
        <div style={{ overflowY: "auto", flex: '1' }}>
            <div className="font-sans bg-gray-50">


                <section className="relative w-full h-[500px] drop-shadow-md">
                    <img alt="banner" className="w-full h-full object-cover object-center" src={banner} />
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40">
                       
                     
                            <img src={logo} alt="Logo" className="sm:w-fit sm:h-fit w-1/2 h-1/2" />
                      
                    </div>
                </section>
                <section className="py-16 px-4 bg-white drop-shadow-md">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-4">Sobre a nossa ONG</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            ONG SOS Animais é dedicada ao cuidado e bem-estar dos animais de rua de nossa cidade. 
                            Trabalhamos para garantir que todos os animais tenham uma vida digna, oferecendo serviços de castração a baixo custo para animais sem raça definida.
                        </p>
                    </div>

                </section>


                <section className="py-16 bg-gray-100 drop-shadow-md" >
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-8">Nossos Serviços</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Castração a Baixo Custo</h3>
                                <p className="text-gray-700">Realizamos castração a baixo custo para animais sem raça definida. Agende a sua solicitação agora mesmo!</p>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Adoção Responsável</h3>
                                <p className="text-gray-700">Oferecemos animais para adoção responsável, todos  prontos para encontrar uma nova família. Aos que não estiverem castrados, asseguramos a castração a baixo custo.</p>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Educação e Conscientização</h3>
                                <p className="text-gray-700">Promovemos programas educacionais para conscientizar sobre a importância do bem-estar animal e controle populacional.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-16 px-4 text-center bg-emerald-500 text-white">
                    <h2 className="text-3xl font-bold mb-4">Solicite uma Castração</h2>
                    <p className="mb-6">Se o seu animal foi resgatado da rua, ele pode ser castrado por um valor acessível. Clique abaixo para fazer a solicitação.</p>
                    <NavLink to="/solicitarCastracao" end>
                        <span className="bg-white text-emerald-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
                            Solicitar Castração
                        </span>
                    </NavLink>

                </section>
               
                <section className="py-16 px-4 bg-white drop-shadow-md">
                    <div className="container mx-auto text-center flex justify-center items-center justify-center flex-col sm:flex-row ">
                        <img src={family} alt="" className="h-96" />
                        <div className="flex flex-col justify-center  items-center sm:items-start ml-8">
                            <h2 className="text-3xl font-bold text-emerald-600 mb-4">Adoção de Animais</h2>
                            <p className="text-lg text-gray-700 mb-8">
                                Conheça nossos animais disponíveis para adoção. Todos eles estão prontos para encontrar um lar amoroso.
                            </p>
                            <NavLink to="/adocao" end>
                                <span className="bg-emerald-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition duration-300">
                                    Ver Animais para Adoção
                                </span>
                            </NavLink>
                        </div>
                    </div>
                </section>

                <footer className="bg-gray-800 text-white py-6">
                    <div className="container mx-auto flex justify-center flex-col items-center">
                        <p>&copy; Nova Hartz, 2025. ONG SOS Animais. Todos os direitos reservados.</p>
                        <div className="flex items-center">
                            <MdOutlinePhoneEnabled/><p> &nbsp;(51) 9 9660-7792</p>
                        </div>
                    </div>
                </footer>
            </div>

        </div>
    )
}
Home.displayName = 'Home';
export default Home