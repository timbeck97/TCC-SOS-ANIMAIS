
import { useModal } from '../../context/ModalContext';

const GenericModal = () => {
    const { isModalOpen, modalMessage, closeModal } = useModal();

    return (
        <div
            onClick={closeModal}
            style={{zIndex:'999'}}
            className={`fixed inset-0 flex justify-center items-start transition-colors 
                 ${isModalOpen ? "visible bg-black/20" : "invisible"}`} >
            <div
                onClick={(e) => e.stopPropagation()}
                className={` bg-white rounded-xl shadow px-10 pt-5 pb-2 transition-all md:w-2/6 w-full mt-10  transform
            ${isModalOpen ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <div>
                    <span className='font-bold text-lg'>Atenção</span>
                    <button
                        onClick={closeModal}
                        className="absolute top-1 right-3  font-bold float-right p-2 rounded-lg text-gray-400 bg-white hover:bg-gray-100 hover:text-gray-600">
                        X
                    </button>

                </div>
                <hr className='mt-2' />
                <p className='mb-5 mt-3'>{modalMessage}</p>
                <hr />
                <button
                    onClick={closeModal}
                    className="bg-blue-500 float-right text-white p-1 rounded-lg mt-2">
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default GenericModal;