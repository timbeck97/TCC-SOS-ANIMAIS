import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContextInterface';
import { FaBell, FaChartLine, FaCog, FaList, FaRegClock, FaUser } from 'react-icons/fa';
import { IoIosHome } from "react-icons/io";
import user from '../../assets/user.png'
import { Dropdown, DropdownDivider } from 'flowbite-react';
import { login, logout } from '../../services/AuthRequest';
import { useDevice } from '../../context/DeviceContext';
import { request } from '../../services/Axios';
import { Notification } from '../../types/Notification';
import { CiLogout } from "react-icons/ci";
import { IoListSharp } from 'react-icons/io5';
import { BsList } from "react-icons/bs";
import { FcChargeBattery } from 'react-icons/fc';


export const Menu = () => {

    const [isOpen, setIsOpen] = useState(false);

    const [notifications, setNotifications] = useState<Notification[]>([])
    const { isMobile } = useDevice();
    const navigate = useNavigate();
    const { isAutenticated, roles } = useAuthContext()
    const getNotifications = async () => {
        let response = await request<Notification[]>('get', '/notification')
        setNotifications(response || [])
    }
    const markNotificationsAsReaded = async (notification: Notification) => {
        await request<Notification[]>('put', `/notification/${notification.id}/markAsRead`, notifications)
        setNotifications(notifications.map(x => ({ ...x, lida: x.id === notification.id ? true : x.lida })))

    }


    useEffect(() => {
        if (isAutenticated()) {
            getNotifications();

        }
    }, [isAutenticated])

    const toggleMenu = () => setIsOpen(!isOpen);

    const renderMenusMobile = () => {
        return (
            <nav className='bg-[#464549]'>
                <div className="px-4 py-3  flex justify-between">
                    <NavLink to="/" end className='flex items-center bg-white rounded rounded-xl'>
                        {/* <FaPaw className="text-3xl text-white " />
                    <span className="text-lg  text-white  ml-2 border-b-2 border-gray-500 poppins-semibold">SOS Animais</span> */}
                       
                    </NavLink>
                    <div className='flex items-center'>
                        {isAutenticated() &&
                            <Dropdown
                                dismissOnClick={false}
                                inline
                                floatingArrow={false}
                                arrowIcon={false}
                                label={
                                    <span
                                        className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                        </svg>
                                        <span className="sr-only">Notifications</span>
                                        {
                                            notifications.filter(x => !x.lida).reduce((acumulator, c) => acumulator + 1, 0) > 0 &&
                                            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-4 dark:border-gray-900">{notifications.filter(x => !x.lida).reduce((acumulator, c) => acumulator + 1, 0)}</div>
                                        }

                                    </span>
                                }
                            >
                                <Dropdown.Header>Notificações</Dropdown.Header>
                                {notifications.length === 0 && <Dropdown.Item className='cursor-auto' >Nenhuma notificação</Dropdown.Item>}
                                {notifications.map((n, idx) => (
                                    <Dropdown.Item key={idx} onClick={() => markNotificationsAsReaded(n)}>{renderCheckIcon(n)}<span className={`ml-1 poppins-semibold max-w-48 text-left ml-3 hover:bg-white-100 ${!n.lida ? 'poppins-semibold' : 'cursor-auto'}`}>{n.mensagem}</span></Dropdown.Item>
                                ))}

                                <DropdownDivider />
                                <Dropdown.Item icon={IoListSharp} >
                                    <NavLink to="/gerenciar/notificacoes" className='flex w-full' end>
                                        Ver todas
                                    </NavLink>
                                </Dropdown.Item>

                            </Dropdown>




                        }
                        <Dropdown
                            inline
                            floatingArrow={false}
                            arrowIcon={false}
                            label={
                                <img
                                    className="w-8 h-8 rounded-full ml-6"
                                    src={user}
                                    alt="user"
                                />
                            }
                        >

                            {isAutenticated() ? <Dropdown.Item onClick={logout}>Logout</Dropdown.Item> : <Dropdown.Item onClick={login}>Login</Dropdown.Item>}
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
                        {isAutenticated() && <>
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
                            <li className='w-full' onClick={toggleMenu}>
                                <NavLink to="/gerenciar/dashboard" className='block text-white p-2 hover:bg-cyan-300 hover:text-black w-full text-center' end>
                                    Indicadores
                                </NavLink>
                            </li>
                        </>}
                    </ul>
                </div>
            </nav>
        )
    }
    const renderCheckIcon = (notification: Notification) => {
        if (notification.lida) {
            return <span></span>
        }
        return <>
            <span className='bg-blue-500 h-7 w-7 flex justify-center items-center rounded rounded-full'>
                <span className='text-white'><FaBell size={18} /></span>
            </span>
        </>
    }

    const renderItensDropDownUser = () => {
        let itens: ReactElement[] = []
        if (isAutenticated()) {
            itens.push(<Dropdown.Item key={1} icon={FaCog} onClick={() => navigate('/gerenciar/configuracoes')}>Configurações</Dropdown.Item>)
            itens.push(<Dropdown.Item key={2} icon={FaBell} onClick={() => navigate('/gerenciar/notificacoes')}>Notificações</Dropdown.Item>)
            if(roles.includes('ADMIN')) {
                itens.push(<Dropdown.Item key={2} icon={FcChargeBattery} onClick={() => navigate('/gerenciar/status')}>Status do Sistema</Dropdown.Item>)
            }
            itens.push(<DropdownDivider key={3} />)
            itens.push(<Dropdown.Item key={4} icon={CiLogout} onClick={logout}>Sair</Dropdown.Item>)
        } else {
            itens.push(<Dropdown.Item key={5} icon={FaUser} onClick={login}>Login</Dropdown.Item>)

        }
        return itens;
    }
    const renderDesktop = () => {
        return (
            <nav className={`bg-[#3d454c] h-screen bg-gray-800 text-white transition-all flex items-center duration-300 ${isOpen ? 'w-56 min-w-56' : 'w-16 min-w-16'} flex flex-col`} >
                <div className={`py-3 border-b-2 border-gray-400 w-full flex justify-center hover:bg-gray-700 cursor-pointer`} onClick={() => setIsOpen(!isOpen)}>
                    <BsList size={22} />
                </div>

                <ul className='flex flex-col gap-8 mt-4 items-center'>
                    {isAutenticated() && <>
                        <li className='w-full'>
                            <NavLink to="/" className={({ isActive }) => `${defaultCss} ${isActive ? active : ''}`} end>

                                <IoIosHome size={22} className='ml-4' />
                                <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '140px' : '0px' }}>
                                    <span>Página Inicial</span>
                                </div>

                            </NavLink>

                        </li>
                        <li className='w-full'>
                            <NavLink to="/gerenciar/filaEspera" className={({ isActive }) => `${defaultCss} ${isActive ? active : ''}`} end>

                                <FaRegClock size={22} className='ml-4' />
                                <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '140px' : '0px' }}>
                                    <span>Lista de Espera</span>
                                </div>

                            </NavLink>

                        </li>
                        <li>
                            <NavLink to="/gerenciar/castracoes" className={({ isActive }) => `${defaultCss} ${isActive ? active : ''}`} end>

                                <FaList size={22} className='ml-2' />
                                <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '140px' : '0px' }}>
                                    <span>Castrações</span>
                                </div>

                            </NavLink>
                        </li>
                        <li>

                            <NavLink to="/gerenciar/dashboard" className={({ isActive }) => `${defaultCss} ${isActive ? active : ''}`} end>

                                <FaChartLine size={22} className='ml-2' />
                                <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '140px' : '0px' }}>
                                    <span>Indicadores</span>
                                </div>

                            </NavLink>
                        </li>
                        <li className='py-3 border-b-2 border-gray-400 w-full'></li>
                        {isAutenticated() && <li className='w-full'>
                            <Dropdown
                                dismissOnClick={false}
                                inline
                                floatingArrow={false}
                                arrowIcon={false}
                                label={
                                    <div className='flex items-center justify-center ml-3'>
                                        <span
                                            className="relative inline-flex items-center p-2 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-800   dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                                                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                                            </svg>
                                            <div>

                                            </div>

                                            {
                                                notifications.filter(x => !x.lida).reduce((acumulator, c) => acumulator + 1, 0) > 0 &&
                                                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -end-4 dark:border-gray-900">{notifications.filter(x => !x.lida).reduce((acumulator, c) => acumulator + 1, 0)}</div>
                                            }

                                        </span>
                                        <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '112px' : '0px' }}>
                                            <span>Notificações</span>
                                        </div>
                                    </div>
                                }
                            >
                                <Dropdown.Header>Notificações</Dropdown.Header>
                                {notifications.length === 0 && <Dropdown.Item className='cursor-auto' >Nenhuma notificação</Dropdown.Item>}
                                {notifications.map((n, idx) => (
                                    <Dropdown.Item key={idx} onClick={() => markNotificationsAsReaded(n)}>{renderCheckIcon(n)}<span className={`ml-1 poppins-semibold max-w-48 text-left ml-3 hover:bg-white-100 ${!n.lida ? 'poppins-semibold' : 'cursor-auto'}`}>{n.mensagem}</span></Dropdown.Item>
                                ))}

                                <DropdownDivider />
                                <Dropdown.Item icon={IoListSharp} >
                                    <NavLink to="/gerenciar/notificacoes" className='flex w-full' end>
                                        Ver todas
                                    </NavLink>
                                </Dropdown.Item>

                            </Dropdown>




                        </li>}



                    </>

                    }
                    <li className='w-full'>
                        <Dropdown
                            inline
                            floatingArrow={false}
                            arrowIcon={false}
                            label={
                                <div className='flex items-center justify-center'>
                                    <img
                                        className="w-9 h-9 rounded-full ml-2"
                                        src={user}
                                        alt="user"
                                    />  <div className='w-0 overflow-hidden transition-all duration-300 ease-in-out transform whitespace-nowrap ml-3' style={{ width: isOpen ? '110px' : '0px' }}>
                                        <span>Configurações</span>
                                    </div>
                                </div>
                            }
                        >
                            {renderItensDropDownUser()}
                        </Dropdown>

                    </li>
                </ul>


            </nav>

        )
    }
    let defaultCss = 'text-md text-white  hover:scale-105 transition-transform duration-300  flex items-center'
    let active = ''
    return (
        isMobile ? renderMenusMobile() : renderDesktop()

    )


}
