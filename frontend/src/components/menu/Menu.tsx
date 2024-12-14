import { useEffect, useState } from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextInterface';
import { FaPaw } from 'react-icons/fa';
import user from '../../assets/user.png'
import { Dropdown, Navbar } from 'flowbite-react';
export const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        //identify if is mobile
        const handleResize = () => {

            if (window.innerWidth < 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        }
        handleResize();
    }, [])

    const renderMenusMobile = () => {
        return (
            <div>
                {/* Ícone de menu no canto superior direito */}
                <div
                    className={`absolute top-4 right-4 cursor-pointer  ${!isOpen ? 'inline' : 'hidden'}`}
                    onClick={toggleMenu}
                >
                    <div className="w-8 h-1 bg-gray-700 mb-1 transition-all duration-300"></div>
                    <div className="w-8 h-1 bg-gray-700 mb-1 transition-all duration-300"></div>
                    <div className="w-8 h-1 bg-gray-700 transition-all duration-300"></div>
                </div>

                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-40 opacity-0 animate-fadeIn"
                        onClick={closeMenu}
                    >

                        <div
                            className="flex flex-col items-center justify-center space-y-4"
                            onClick={(e) => e.stopPropagation()} // Impede o fechamento ao clicar no menu
                        >
                            <NavLink to="/solicitarCastracao" className={'text-3xl text-white font-bold hover:scale-105 transition-transform duration-300'} onClick={toggleMenu} end>
                                Solicitar Castração
                            </NavLink>
                            {isAutenticated() && <NavLink to="/gerenciar/filaEspera" className={'text-3xl text-white font-bold hover:scale-105 transition-transform duration-300'} onClick={toggleMenu} end>
                                Lista de Espera
                            </NavLink>}
                            {!isAutenticated() &&
                                <button className={'text-3xl text-white font-bold hover:scale-105 transition-transform duration-300'} onClick={login}>
                                    Login
                                </button>}
                            {isAutenticated() && <button className={'text-3xl text-white font-bold hover:scale-105 transition-transform duration-300'} onClick={logout}>
                                Logout
                            </button>}

                        </div>
                        <div
                            className="absolute top-4 right-4 text-white text-2xl cursor-pointer hover:rotate-90 transition-transform duration-300"
                            onClick={closeMenu}
                        >
                            ✕
                        </div>
                    </div>
                )}
            </div>
        )
    }
    const renderMenusDesktop = () => {
        return (
            <ul className="flex space-x-6 items-center">
                <NavLink to="/" className={'text-md text-gray-600 font-bold hover:scale-105 transition-transform duration-300'} end>
                    Página Inicial
                </NavLink>
                <NavLink to="/solicitarCastracao" className={'text-md text-gray-600 font-bold hover:scale-105 transition-transform duration-300'} end>
                    Solicitar Castração
                </NavLink>
                {isAutenticated() && <NavLink to="/gerenciar/filaEspera" className={'text-md text-gray-600 font-bold hover:scale-105 transition-transform duration-300'} end>
                    Lista de Espera
                </NavLink>}
                {!isAutenticated() &&
                    <span className={'text-md text-gray-600 font-bold hover:scale-105 transition-transform duration-300'} onClick={login}>
                        Login
                    </span>}
                {isAutenticated() && <span className={'text-md text-gray-600 font-bold hover:scale-105 transition-transform duration-300'} onClick={logout}>
                    Logout
                </span>}

            </ul>
        )
    }
    const { isAutenticated, login, logout } = useAuthContext();

    return (
        // <header className="bg-[#e5e7eb82] shadow-md shadow-Stone-400">
        //     <div className="px-4 py-3 flex justify-between">
        //         <div className='flex items-center  text-gray-700 hover:text-gray-900 text-gray-700 hover:text-gray-900'>
        //             <FaPaw className="text-3xl  " />
        //             <span className="text-lg font-semibold   ml-2 border-b-2 border-gray-500">SOS Animais</span>
        //         </div>
        //         {isMobile ? renderMenusMobile() : renderMenusDesktop()}
        //     </div>
        // </header>
        <Navbar className="bg-white border border-gray-200 dark:bg-gray-900">
            <Navbar.Brand href="https://flowbite.com/">
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    SOS Animais
                </span>
            </Navbar.Brand>
            <div className="flex items-center md:order-2">
                {/* Dropdown */}
                <Dropdown
                    inline
                    label={
                        <img
                            className="w-8 h-8 rounded-full"
                            src={user}
                            alt="user"
                        />
                    }
                >
                    {/* <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">
                            name@flowbite.com
                        </span>
                    </Dropdown.Header> */}

                    {isAutenticated() ? <Dropdown.Item onClick={logout}>Logout</Dropdown.Item> : <Dropdown.Item onClick={login}>Login</Dropdown.Item>}
                </Dropdown>
                {/* Hamburger Menu */}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <NavLink to="/" end>
                    Página Inicial
                </NavLink>
                <NavLink to="/solicitarCastracao" end>
                    Solicitar Castração
                </NavLink>
                {isAutenticated() && <>
                    <NavLink to="/gerenciar/filaEspera" end>
                        Lista de Espera
                    </NavLink>
                    <NavLink to="/gerenciar/castracoes" end>
                        Castrações
                    </NavLink>
                    </>}

            </Navbar.Collapse>
        </Navbar>
    )


}