import Input from "../../components/input/Input"
import { useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useDevice } from "../../context/DeviceContext";


Chart.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);
export const Dashboard = () => {

    const [periodoInicio, setPeriodoInicio] = useState<string>('2025-01-01')
    const [periodoFinal, setPeriodoFinal] = useState<string>('2025-01-12')
    const {isMobile} = useDevice()
    const renderCard = (title: string, value: string, valueDescription: string, detail: string) => {
        return (
            <div className="border bg-white border-gray-200 min-h-64 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 drop-shadow-md">
                <div className="rounded-t-lg min-h-24 border-b border-gray-200 shadow-sm flex justify-center items-center">
                    <div className="flex justify-center items-end space-x-2">
                        <h1 className="text-4xl font-medium text-gray-800 dark:text-white">{value}</h1>
                        <span className="text-sm text-gray-500 dark:text-gray-300">{valueDescription}</span>
                    </div>
                </div>
                <div className="p-4 mt-3 h-full">
                    <h3 className="font-bold text-xl text-gray-800 dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{detail}</p>
                </div>
            </div>
        )
    }
    const renderPanelDashboard = () => {
        return (
            <div className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg shadow-md col-span-3">
                        <h2 className="text-xl font-medium mb-2">Gráfico 1</h2>
                        {renderChartV2Line()}
                    </div>


                    {/* Adicione mais gráficos conforme necessário */}
                </div>
            </div>
        )
    }
    const renderChartV2Line = () => {
        const labels = mockData.map((item) => item.mes);
        const data = mockData.map((item) => item.valor);
        return (
            <Line options={{
                responsive: true,
                aspectRatio: isMobile?1:5,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                },
            }} data={{
                labels: labels, // Meses como labels
                datasets: [
                    {
                        label: 'Valor por Mês', // Título da linha
                        data: data, // Dados do gráfico
                        fill: false, // Não preencher a área abaixo da linha
                        borderColor: '#42A5F5', // Cor da linha
                        borderWidth: 2, // Espessura da linha
                        pointBackgroundColor: '#42A5F5', // Cor dos pontos da linha
                        pointBorderColor: '#fff', // Cor da borda dos pontos
                        pointBorderWidth: 2,
                        pointRadius: 5,
                    },
                ],
            }} />
        )
    }

    const mockData = [
        { mes: 'Jan', valor: 25 },
        { mes: 'Fev', valor: 32 },
        { mes: 'Mar', valor: 20 },
        { mes: 'Abr', valor: 11 },
        { mes: 'Mai', valor: 15 },
        { mes: 'Jun', valor: 26 },
        { mes: 'Jul', valor: 22 },
        { mes: 'Ago', valor: 25 },
        { mes: 'Set', valor: 23 },
        { mes: 'Out', valor: 32 },
        { mes: 'Nov', valor: 31 },
        { mes: 'Dez', valor: 29 },
    ]
    const mockPagamentos = [
        { tipo: 'PIX', quantidade: 160 },
        { tipo: 'Dinheiro', quantidade: 45 },
        { tipo: 'Castração Solidária', quantidade: 24 },
    ]
    return (
        <div className="bg-[#f3f4f6] flex-1">
            <div className="md:w-1/4 px-2 m-auto flex space-x-5 mt-5 ">
                <div className="flex-1">
                    <Input id="dataIdx"
                        label="Data Inicial"
                        type="date"
                        name='periodoInicial'
                        value={periodoInicio}
                        onChange={(e: any) => setPeriodoInicio(e.target.value)}
                    />
                </div>
                <div className="flex-1">

                    <Input id="dataIdx"
                        label="Data Final"
                        type="date"
                        name='periodoFinal'
                        value={periodoFinal}
                        onChange={(e: any) => setPeriodoFinal(e.target.value)}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-4 grid-cols-1 md:space-y-0 space-y-3 auto-rows-auto md:w-4/5 w-3/4 gap-10 m-auto mt-5">
                {renderCard('Tempo de Espera', '14,5', 'dias', 'Tempo de espera desde a solicitação até a finalização da castração.')}
                {renderCard('Animais', '150', 'animais', 'Total de animais castrados no período')}
                {renderCard('Cachorros', '100', 'animais', 'Total de cachorros castrados no período')}
                {renderCard('Gatos', '50', 'animais', 'Total de gatos castrados no período')}

            </div>
            {renderPanelDashboard()}


        </div>
    )
}