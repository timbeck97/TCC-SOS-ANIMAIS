import { ModalInterface } from "../../types/ModalInterface"
import { IoClose } from "react-icons/io5";


export const Modal = ({closeModal, isModalOpen, children, modalSize='medium'}: ModalInterface) => {
    return (
        <div
            onClick={closeModal}
            className={`fixed inset-0 flex justify-center items-center transition-colors
                 ${isModalOpen ? "visible bg-black/20" : "invisible"}`} >
            <div
                onClick={(e) => e.stopPropagation()}
                className={` bg-white rounded-xl shadow p-6 transition-all w-${modalSize==='medium'?'2':'4'}/6  transform
            ${isModalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">
                    <IoClose color="black" size={20} />
                </button>
                {
                    children
                }
            </div>
        </div>
    )
}