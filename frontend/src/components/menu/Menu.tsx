import { useState } from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextInterface';
export const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const closeMenu = () => setIsOpen(false);

    const { isAutenticated, login, logout } = useAuthContext();

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
                        <NavLink to="/" className={'text-3xl text-white font-bold hover:scale-105 transition-transform duration-300'} onClick={toggleMenu} end>
                            Página Inicial
                        </NavLink>
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
    );
}