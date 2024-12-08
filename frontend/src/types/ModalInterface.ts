export interface ModalInterface {
    isModalOpen: boolean;
    closeModal: () => void;
    children?: React.ReactNode;
    modalSize?: 'medium' | 'large';
}