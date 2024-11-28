export interface ModalContextInterface {
    isModalOpen: boolean;
    modalMessage: string;
    openModal: (message: string) => void;
    closeModal: () => void;
}