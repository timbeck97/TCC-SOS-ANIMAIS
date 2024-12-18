export interface ModalContextInterface {
    isModalOpen: boolean;
    modalMessage: string;
    openModal: (message: string, callback:()=>void|undefined) => void;
    closeModal: () => void;
}