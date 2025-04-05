import { NavLink } from "react-router-dom"
import banner from '../../assets/banner.jpg'
import logo from '../../assets/logo.png'
export const Home = () => {


    return (
        <div style={{ overflowY: "auto", flex: '1' }}>
            <div className="font-sans bg-gray-50">


                <section className="relative w-full h-[500px] drop-shadow-md">
                    <img alt="banner" className="w-full h-full object-cover object-center" src={banner} />
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-40">
                       
                            {/* <h1 className="text-8xl poppins-bold text-white ">SOS Animais</h1> */}
                            <img src={logo} alt="Logo" className="sm:w-fit sm:h-fit w-1/2 h-1/2" />
                      
                    </div>
                </section>
                <section className="py-16 px-4 bg-white drop-shadow-md">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-4">Sobre a nossa ONG</h2>
                        <p className="text-lg text-gray-700 mb-8">
                            A ONG SOS Animais é dedicada ao resgate, cuidado e bem-estar dos animais abandonados. Trabalhamos para garantir que
                            todos os animais tenham uma vida digna, oferecendo serviços de castração gratuita para os animais resgatados da rua.
                        </p>
                    </div>

                </section>


                <section className="py-16 bg-gray-100 drop-shadow-md" >
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold text-emerald-600 mb-8">Nossos Serviços</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Castração Gratuita</h3>
                                <p className="text-gray-700">Realizamos castração gratuita para animais que foram resgatados da rua. Agende a sua solicitação agora mesmo!</p>
                            </div>
                            <div className="bg-white p-6 shadow-lg rounded-lg">
                                <h3 className="text-xl font-semibold text-emerald-600 mb-4">Adoção Responsável</h3>
                                <p className="text-gray-700">Oferecemos animais para adoção responsável, todos cuidados e prontos para encontrar uma nova família.</p>
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
                    <p className="mb-6">Se o seu animal foi resgatado da rua, ele pode ser castrado gratuitamente. Clique abaixo para fazer a solicitação.</p>
                    <NavLink to="/solicitarCastracao" end>
                        <span className="bg-white text-emerald-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition duration-300">
                            Solicitar Castração
                        </span>
                    </NavLink>

                </section>

                <footer className="bg-gray-800 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2025 ONG SOS Animais. Todos os direitos reservados.</p>

                    </div>
                </footer>
            </div>

        </div>
    )
}