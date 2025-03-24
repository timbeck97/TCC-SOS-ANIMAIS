import Input from "../../components/input/Input"
import { useEffect, useState } from "react"
import { Bar, Line, Pie } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
} from 'chart.js';
import { useDevice } from "../../context/DeviceContext";
import { Button } from "../../components/button/Button";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);
export const Dashboard = () => {

    const [periodoInicio, setPeriodoInicio] = useState<string>('2025-01-01')
    const [periodoFinal, setPeriodoFinal] = useState<string>('2025-01-12')
    const [loading, setLoading] = useState(false)
    const { isMobile } = useDevice()


    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 3000);
    }
    const renderCard = (title: string, value: string, valueDescription: string, detail: string) => {
        return (
            <div className="bg-[#fffff] min-h-64 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 poppins-regular">
                <div className="rounded-t-lg min-h-24 border-b border-gray-200 shadow-sm flex justify-center items-center">
                    <div className="flex justify-center items-end space-x-2">
                        <h1 className="text-4xl font-medium text-[#464549] dark:text-white">{value}</h1>
                        <span className="text-sm text-[#464549] dark:text-gray-300">{valueDescription}</span>
                    </div>
                </div>
                <div className="p-4 mt-3 h-full">
                    <h3 className="font-bold text-xl text-[#464549] dark:text-white">{title}</h3>
                    <p className="mt-2 text-sm text-[#464549] dark:text-gray-400">{detail}</p>
                </div>
            </div>
        )
    }
    const renderDashboards = () => {
        return (
            <div className="p-6 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 border rounded-lg shadow-lg col-span-2">
                        <h2 className="text-xl text-[#464549] poppins-semibold mb-2">Castrações Realizadas no Período</h2>
                        {renderChartLine()}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2">
                        <div className="p-4 border rounded-lg shadow-lg col-span-1">
                            <h2 className="text-xl text-[#464549] poppins-semibold mb-2">Formas de Pagamento</h2>
                            {renderBarChart()}
                        </div>
                        <div className="p-4 border rounded-lg shadow-lg col-span-1">
                            <h2 className="text-xl text-[#464549] poppins-semibold mb-2">Percentuais de Pagamento</h2>
                            {renderPieChart()}
                        </div>
                    </div>



                </div>
            </div>
        )
    }
    const renderPieChart = () => {
        return (
            <Pie data={{
                labels: ['Pago pela população', 'Pago pela SOS Animais'],
                datasets: [
                    {
                        data: [12, 19],
                        backgroundColor: [
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                        ],
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(153, 102, 255, 1)',
                        ],
                        borderWidth: 1,
                    },
                ],
            }} options={{
                aspectRatio: 1.5
            }} />
        )
    }
    const renderBarChart = () => {
        const labels = ['PIX', 'Dinheiro','Castração Solidária'];
        return (
            <Bar data={{
                labels,
                datasets: [
                    {
                        data: labels.map(() => Math.floor(Math.random() * (1000 - 300 + 1)) + 300),
                        backgroundColor: '#42A5F5',
                    },
                ],
            }} options={{
                responsive: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        display: false
                    },
                },
            }} />
        )
    }
    const renderChartLine = () => {
        const labels = mockData.map((item) => item.mes);
        const data = mockData.map((item) => item.valor);
        return (
            <Line options={{
                responsive: true,
                aspectRatio: 3,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                },
            }} data={{
                labels: labels, // Meses como labels
                datasets: [
                    {
                        label: 'Castrações no Mês', // Título da linha
                        data: data, // Dados do gráfico
                        fill: false, // Não preencher a área abaixo da linha
                        borderColor: '#42A5F5', // Cor da linha
                        borderWidth: 2, // Espessura da linha
                        pointBackgroundColor: '#42A5F5', // Cor dos pontos da linha
                        pointBorderColor: '#fff', // Cor da borda dos pontos
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        backgroundColor: '#42A5F5'
                    },
                ],
            }} />
        )
    }

    const mockData = [
        { mes: 'Jan/2025', valor: 25 },
        { mes: 'Fev/2025', valor: 32 },
        { mes: 'Mar/2025', valor: 20 },
        { mes: 'Abr/2025', valor: 11 },
        { mes: 'Mai/2025', valor: 15 },
        { mes: 'Jun/2025', valor: 26 },
        { mes: 'Jul/2025', valor: 22 },
        { mes: 'Ago/2025', valor: 25 },
        { mes: 'Set/2025', valor: 23 },
        { mes: 'Out/2025', valor: 32 },
        { mes: 'Nov/2025', valor: 31 },
        { mes: 'Dez/2025', valor: 29 },
        { mes: 'Jan/2026', valor: 35 },
        { mes: 'Fev/2026', valor: 22 },
        { mes: 'Mar/2026', valor: 40 },
        { mes: 'Abr/2026', valor: 21 },
        { mes: 'Mai/2026', valor: 35 },
        { mes: 'Jun/2026', valor: 16 },
        { mes: 'Jul/2026', valor: 12 },
        { mes: 'Ago/2026', valor: 35 },
        { mes: 'Set/2026', valor: 13 },
        { mes: 'Out/2026', valor: 22 },
        { mes: 'Nov/2026', valor: 21 },
        { mes: 'Dez/2026', valor: 39 },
    ]
    const mockPagamentos = [
        { tipo: 'PIX', quantidade: 160 },
        { tipo: 'Dinheiro', quantidade: 45 },
        { tipo: 'Castração Solidária', quantidade: 24 },
    ]
    return (
        <div className="bg-[#f3f4f6] flex-1 relative">
            <div className="md:w-1/4 px-2 m-auto flex space-x-5 mt-5">
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
                <div className="flex items-end py-2">
                    <Button text="Buscar" onClick={handleSearch} type="neutral" />
                </div>
            </div>
            <div>
                <div className="grid md:grid-cols-4 grid-cols-1 md:space-y-0 space-y-3 auto-rows-auto md:w-4/5 w-3/4 gap-10 m-auto mt-5 ">
                    {renderCard('Tempo de Espera', '14,5', 'dias', 'Tempo de espera desde a solicitação até a finalização da castração.')}
                    {renderCard('Animais', '150', 'animais', 'Total de animais castrados no período')}
                    {renderCard('Cachorros', '100', 'animais', 'Total de cachorros castrados no período')}
                    {renderCard('Gatos', '50', 'animais', 'Total de gatos castrados no período')}


                </div>
                {renderDashboards()}

            </div>
            <div
                className={`absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center 
          transition-opacity duration-50 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
            >
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            </div>



        </div>
    )
}