import { Pawbackground } from "../../components/pawbackground/Pawbackground"
import { IoNotifications } from "react-icons/io5"
import { Table } from "../../components/table/Table"
import { useEffect, useState } from "react"
import { Notification as NotificacioInterface } from "../../types/Notification"
import { Column } from "../../components/table/Column"
import { request } from "../../services/Axios"
import { Subtitle } from "../../components/title/Subtitle"

export const Notification = () => {

    const [notificacoes, setNotificacoes] = useState<NotificacioInterface[]>([])
    useEffect(()=>{
        getNotificacions()
    },[])
    const getNotificacions = async()=>{
        let resp = await request<NotificacioInterface[]>('get','/notification/all')
        setNotificacoes(resp || [])
    }

    return (
        <Pawbackground>
            <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white relative'>
                <div className="rounded px-2 pt-4 flex items-center  border-b border-gray-900/10 pb-5">
                    <Subtitle text="Notificações" icon={<IoNotifications size={22} color="#464549" />} />
                </div>
                <div className="rounded px-2 pt-4 flex items-center ">

                   <Table<NotificacioInterface> id='tbNotificacoes' data={notificacoes} enablePagination={true}>
                     <Column<NotificacioInterface> field="mensagem" align='center' label="Mensagem" />
                     <Column<NotificacioInterface> field="data" align='center' label="Data" format="dataHora"/>
                     <Column<NotificacioInterface> field="usuario" align='center' label="Usuário" />
                     <Column<NotificacioInterface> field="lida" align='center' label="Lida" format="boolean" />
                   </Table>
                </div>
            </div>
        </Pawbackground>
    )
}