import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextInterface';
import { FaChartLine, FaList, FaPaw, FaRegClock } from 'react-icons/fa';
import user from '../../assets/user.png'
import { Dropdown } from 'flowbite-react';
import { isAutenticado, login, logout } from '../../services/AuthRequest';
import { LuDog } from 'react-icons/lu';
import { useDevice } from '../../context/DeviceContext';
export const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const { isMobile } = useDevice();
    const navigate = useNavigate();

   

    const toggleMenu = () => setIsOpen(!isOpen);

    const renderMenusMobile = () => {
        return (
            <div className='flex items-center'>
                <Dropdown
                    inline
                    floatingArrow={false}
                    arrowIcon={false}
                    label={
                        <img
                            className="w-8 h-8 rounded-full"
                            src={user}
                            alt="user"
                        />
                    }
                >

                    {isAutenticado() ? <Dropdown.Item onClick={logout}>Logout</Dropdown.Item> : <Dropdown.Item onClick={login}>Login</Dropdown.Item>}
                </Dropdown>
                <div
                    className={`cursor-pointer ml-4`}
                    title='Abrir menus'
                    onClick={toggleMenu}
                >
                    <div className="w-8 h-1 bg-white mb-1 transition-all duration-300"></div>
                    <div className="w-8 h-1 bg-white mb-1 transition-all duration-300"></div>
                    <div className="w-8 h-1 bg-white transition-all duration-300"></div>
                </div>
            </div>
        )
    }
    const renderMenusDesktop = () => {
        let defaultCss='text-md text-white font-bold hover:scale-105 transition-transform duration-300 poppins-medium flex items-center gap-1'
        let active='border-b-2 border-gray-400'
        return (
            <ul className="flex justify-center items-center gap-x-10">
                <li>
                    <NavLink to="/solicitarCastracao" className={({isActive})=>`${defaultCss} ${isActive?active:''}`} end>
                    <LuDog/>Solicitar Castração
                    </NavLink>
                </li>
                {isAutenticado() && <>
                    <li>
                        <NavLink to="/gerenciar/filaEspera" className={({isActive})=>`${defaultCss} ${isActive?active:''}`} end>
                            <FaRegClock/>Lista de Espera
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gerenciar/castracoes" className={({isActive})=>`${defaultCss} ${isActive?active:''}`} end>
                            <FaList />Castrações
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/gerenciar/dashboard" className={({isActive})=>`${defaultCss} ${isActive?active:''}`} end>
                            <FaChartLine/>Indicadores
                        </NavLink>
                    </li>
                </>
                }
                <li>

                    <div className='flex justify-center'>
                        <Dropdown
                            inline
                            floatingArrow={false}
                            arrowIcon={false}
                            label={
                                <img
                                    className="w-9 h-9 rounded-full"
                                    src={user}
                                    alt="user"
                                />
                            }
                        >
                            {renderItensDropDownUser()}
                        </Dropdown>
                    </div>
                </li>


            </ul>
        )
    }
    const renderItensDropDownUser = () => {
        let itens: ReactElement[] = []
        if (isAutenticado()) {
            itens.push(<Dropdown.Item key={2} onClick={() => navigate('/gerenciar/configuracoes')}>Configurações</Dropdown.Item>)
            itens.push(<Dropdown.Item key={1} onClick={logout}>Sair</Dropdown.Item>)
        } else {
            itens.push(<Dropdown.Item key={3} onClick={login}>Login</Dropdown.Item>)

        }
        return itens;
    }

    

    return (
        <nav className='bg-[#464549]'>
            <div className="px-4 py-3  flex justify-between">
                <NavLink to="/" end className='flex items-center'>
                    <FaPaw className="text-3xl text-white " />
                    <span className="text-lg  text-white  ml-2 border-b-2 border-gray-500 poppins-semibold">SOS Animais</span>
                </NavLink>
                {isMobile ? renderMenusMobile() : renderMenusDesktop()}
            </div>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-5'
                    }`}
            >
                <ul className='flex flex-col items-center border-t border-gray-500'>
                    <li className='w-full' onClick={toggleMenu}>
                        <NavLink to="/" end className='block text-white p-2 hover:bg-cyan-300 hover:text-black w-full text-center'>
                            Página Inicial
                        </NavLink>
                    </li>
                    <li className='w-full' onClick={toggleMenu}>
                        <NavLink to="/solicitarCastracao" className='block text-white p-2 hover:bg-cyan-300 hover:text-black w-full text-center' end>
                            Solicitar Castração
                        </NavLink>
                    </li>
                    {isAutenticado() && <>
                        <li className='w-full' onClick={toggleMenu}>
                            <NavLink to="/gerenciar/filaEspera" className='block text-white p-2 hover:bg-cyan-300 hover:text-black w-full text-center' end>
                                Lista de Espera
                            </NavLink>
                        </li>
                        <li className='w-full' onClick={toggleMenu}>
                            <NavLink to="/gerenciar/castracoes" className='block text-white p-2 hover:bg-cyan-300 hover:text-black w-full text-center' end>
                                Castrações
                            </NavLink>
                        </li>
                    </>}
                </ul>
            </div>
        </nav>
    )


}