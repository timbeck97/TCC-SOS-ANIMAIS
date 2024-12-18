import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ModalContextInterface } from "../types/ModalContextInterface";
import { setOpenModalRef } from "../services/ModalTrigger";

const ModalContext = createContext<ModalContextInterface | undefined>(undefined);


export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [onConfirm, setOnConfirm] = useState<()=>void | undefined>();

    useEffect(() => {
        setOpenModalRef(openModal);
    },[])
    const openModal = (message: string, callback:any) => {
        setModalMessage(message);
        setIsModalOpen(true);
        setOnConfirm(()=>callback);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalMessage('');
        if(onConfirm){
            onConfirm();
            setOnConfirm(undefined);
        }
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