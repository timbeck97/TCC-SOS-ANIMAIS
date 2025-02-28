import { Modal } from "flowbite-react"
import { useEffect } from "react"

export const ConfirmModal = ({ show, confirm, close, title, text }: {
    show: boolean,
    confirm: () => void,
    close: () => void,
    title?: string,
    text?: string
}) => {
    useEffect(()=>{
        console.log('alterou valor de show');
        
    },[show])
    return (
        <Modal show={show} size="3xl" onClose={()=>close()} position="top-center">
            <Modal.Header >
                {title || 'Confirmar Ação'}
            </Modal.Header>
            <Modal.Body>
                <div>
                    {text || 'Tem certeza que deseja realizar essa operação?'}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-end w-full space-x-2">
                    <button type="submit" onClick={()=>confirm()}
                        className="bg-indigo-500 float-right text-white px-4 rounded-xl py-1  float-right rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Confirmar
                    </button>
                    <button
                        type="button"
                        onClick={()=>close()}
                        className="bg-white float-right text-gray-700 px-4 rounded-xl py-1 border border-gray-300 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Cancelar
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}