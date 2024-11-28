import { createContext, ReactNode, useContext, useState } from "react";
import { ModalContextInterface } from "../types/ModalContextInterface";

const ModalContext = createContext<ModalContextInterface | undefined>(undefined);


export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    const openModal = (message: string) => {
        console.log('chamou');

        setModalMessage(message);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
    };

    return (
        <ModalContext.Provider value={{ isModalOpen, modalMessage, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};