import { useEffect, useState } from "react"
import { Pawbackground } from "../../components/pawbackground/Pawbackground"
import { Subtitle } from "../../components/title/Subtitle"
import { SystemStatus } from "../../types/SystemStatus"
import { request } from "../../services/Axios"
import { FcChargeBattery } from "react-icons/fc"
import { SlRefresh } from "react-icons/sl";

import { Button } from "../../components/button/Button"
import { FaExclamationTriangle, FaHdd, FaMemory, FaMicrochip } from "react-icons/fa"

export const Status = () => {

    const [status, setStatus] = useState<SystemStatus>({
        cpu: 0,
        memoryUsage: 0,
        totalMemory: 0,
        diskUsage: 0,
        totalDisk: 0
    } as SystemStatus)
    useEffect(() => {
        getStatus()
    }, [])
    const getStatus = async () => {
        let resp = await request<SystemStatus>('get', '/status')
        setStatus(resp || {
            cpu: 0,
            memoryUsage: 0,
            totalMemory: 0,
            diskUsage: 0,
            totalDisk: 0
        } as SystemStatus)
  
    }
    const cards = [
        {
            title: 'Uso de CPU',
            value: `${status.cpu?.toFixed(2)}%`,
            icon: <FaMicrochip className="text-indigo-600 text-3xl" />,
        },
        {
            title: 'Memória Usada',
            value: `${status.memoryUsage?.toFixed(0)} GB / ${status.totalMemory.toFixed(0)} GB`,
            icon: <FaMemory className="text-blue-600 text-3xl" />,
        },
        {
            title: 'Disco Usado',
            value: `${status.diskUsage?.toFixed(0)} GB / ${status.totalDisk.toFixed(0)} GB`,
            icon: <FaHdd className="text-green-600 text-3xl" />,
        },
    ];
    const alerts: string[] = [];

    const memoryPercent = (status.memoryUsage / status.totalMemory) * 100;
    const diskPercent = (status.diskUsage / status.totalDisk) * 100;

    if (status.cpu > 80) {
        alerts.push('Uso de CPU acima de 80%');
    }
    if (memoryPercent > 80) {
        alerts.push('Uso de memória acima de 80%');
    }
    if (diskPercent > 80) {
        alerts.push('Uso de disco acima de 80%');
    }
    return (
        <Pawbackground>
            <div className='border-b border-gray-900/10 pb-12 px-5 shadow-lg rounded-md bg-white relative'>
                <div className="rounded px-2 pt-4 flex items-center justify-between  border-b border-gray-900/10 pb-5">
                    <Subtitle text="Status do Sistema" icon={<FcChargeBattery size={22} color="#464549" />} />
                    <Button text="Atualizar" icon={<SlRefresh />} onClick={getStatus} type="success" />
                </div>
                <div className="rounded px-2 pt-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                        {cards.map((card, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-4 bg-white col-span-1 rounded-2xl shadow-md p-4"
                            >
                                <div className="p-3 bg-gray-100 rounded-full">{card.icon}</div>
                                <div>
                                    <div className="text-sm text-gray-500">{card.title}</div>
                                    <div className="text-md font-bold">{card.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {alerts.length > 0 && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl flex flex-col gap-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <FaExclamationTriangle className="text-red-600" />
                                Atenção: alto uso de recursos detectado!
                            </div>
                            <ul className="list-disc pl-6 text-sm">
                                {alerts.map((msg, idx) => (
                                    <li key={idx}>{msg}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </Pawbackground>
    )
}