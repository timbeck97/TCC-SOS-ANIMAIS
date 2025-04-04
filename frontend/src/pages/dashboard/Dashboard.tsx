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
import { Button } from "../../components/button/Button";
import { request } from "../../services/Axios";
import { Dashboards } from "../../types/Dashboards";
import { InputCombobox } from "../../components/input/InputCombobox";
import { formatValorMoeda, getInitialMonth, getYearsCombobox } from "../../services/Util";
import { MESES } from "../../services/Constantes";
import { DashboardCards } from "../../types/DashboardCards";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement,
    ChartDataLabels
);
export const Dashboard = () => {


    const [anoInicio, setAnoInicio] = useState<string>(String(new Date().getFullYear()))
    const [mesInicio, setMesInicio] = useState<string>(getInitialMonth(false))

    const [anoFim, setAnoFim] = useState<string>(String(new Date().getFullYear()))
    const [mesFim, setMesFim] = useState<string>(getInitialMonth(true))

    const [loading, setLoading] = useState(true)
    const [listDate, setListData] = useState<Dashboards>({
        lineChart: { labels: [], values: [] },
        barChart: { labels: [], values: [] },
        pieChart: { labels: [], values: [] },
        totalCards: {} as DashboardCards
    })


    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    }, [])

    const getDateFilter = () => {
        return {
            startDate: anoInicio + mesInicio,
            endDate: anoFim + mesFim
        }
    }
    const fetchData = async () => {
        let response = await request<Dashboards>('get', '/dashboard', null, { params: { ...getDateFilter() } })
        setListData(response || {
            lineChart: { labels: [], values: [] },
            barChart: { labels: [], values: [] },
            pieChart: { labels: [], values: [] },
            totalCards: {} as DashboardCards
        })
        setLoading(false)
    }


    const handleSearch = () => {
        setLoading(true);
        fetchData()
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
                        {renderLineChart()}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 col-span-2">
                        <div className="p-4 border rounded-lg shadow-lg col-span-1">
                            <h2 className="text-xl text-[#464549] poppins-semibold mb-2">Castrações por Meio de Pagamento</h2>
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
                labels: listDate.pieChart.labels,
                datasets: [
                    {
                        data: listDate.pieChart.values,
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
                aspectRatio: 1.5,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem: any) {
                                const value = tooltipItem.raw;
                                return `${formatValorMoeda(value, false)}%`;
                            },
                        },
                    },
                    datalabels: {
                        formatter: value => `${formatValorMoeda(value, false)}%`,
                        font: {
                            weight: "bold",
                            size: 14,
                        },
                    }
                },
            }} />
        )
    }
    const renderBarChart = () => {
        const labels = listDate.barChart.labels
        const data = listDate.barChart.values
        return (
            <Bar data={{
                labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: '#42A5F5',
                    },
                ],
            }} options={{
                responsive: true,
                aspectRatio: 1.5,

                plugins: {
                    legend: {
                        display: false,
                        position: "top",

                    },
                    datalabels: {
                        anchor: "end", // Posição do valor (pode ser "center", "start", etc.)
                        align: "bottom", // Alinhamento do valor
                        color: "#000", // Cor do texto
                        font: {
                            weight: "bold",
                            size: 14,
                        },
                        formatter: (value) => `${value}`, // Formato do texto (pode adicionar "%" ou "R$")
                    },
                },

            }} />
        )
    }
    const renderLineChart = () => {

        const labels = listDate.lineChart.labels
        const data = listDate.lineChart.values
        return (
            <Line options={{
                responsive: true,
                aspectRatio: 3,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    datalabels: {
                        display: false
                    }
                },
            }} data={{
                labels: labels,
                datasets: [
                    {
                        label: 'Castrações no mês',
                        data: data,
                        borderColor: '#42A5F5',
                        borderWidth: 2,
                        pointBackgroundColor: '#42A5F5',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        backgroundColor: '#42A5F5'
                    },
                ],
            }} />
        )
    }

    return (
        <div className="bg-[#f3f4f6] flex-1 relative">
            <div className="w-full sm:w-2/5 px-4 m-auto flex justify-center sm:space-x-5 mt-5 rounded rounded  shadow-sm p-3 border flex-col sm:flex-row">
                <div className="flex flex-col flex-1">
                    <div>
                        <h3 className="poppins-semibold">Período Inicial</h3>
                    </div>
                    <div className="flex">
                        <InputCombobox
                            id="mesInicial"
                            comboboxValues={MESES}
                            name="faixaValor"
                            className="text-xs"
                            value={mesInicio}
                            valueKey="value"
                            arrayKey="label"
                            onChange={(e: any) => setMesInicio(e.target.value)}

                        />
                        <InputCombobox
                            id="anoInicio"
                            comboboxValues={getYearsCombobox()}
                            name="anoInicio"
                            className="text-xs"
                            value={anoInicio}
                            valueKey="id"
                            arrayKey="label"
                            onChange={(e: any) => setAnoInicio(e.target.value)}

                        />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <div>
                        <h3 className="poppins-semibold">Período Final</h3>
                    </div>
                    <div className="flex">
                        <InputCombobox
                            id="mesFinal"
                            comboboxValues={MESES}
                            name="mesFinal"
                            className="text-xs"
                            value={mesFim}
                            valueKey="value"
                            arrayKey="label"
                            onChange={(e: any) => setMesFim(e.target.value)}

                        />
                        <InputCombobox
                            id="anoFim"
                            comboboxValues={getYearsCombobox()}
                            name="anoFim"
                            className="text-xs"
                            value={anoFim}
                            valueKey="id"
                            arrayKey="label"
                            onChange={(e: any) => setAnoFim(e.target.value)}

                        />
                    </div>
                </div>
                <div className="flex items-end py-2">
                    <Button text="Buscar" onClick={handleSearch} type="neutral" />
                </div>
            </div>
            <div>
                <div className="grid md:grid-cols-4 grid-cols-1 md:space-y-0 space-y-3 auto-rows-auto md:w-4/5 w-3/4 gap-10 m-auto mt-5 ">
                    {renderCard('Tempo de Espera', formatValorMoeda(listDate.totalCards.averageTime, false), 'dias', 'Tempo de espera desde a solicitação até a finalização da castração.')}
                    {renderCard('Animais', String(listDate.totalCards.totalCastrations), 'animais', 'Total de animais castrados no período')}
                    {renderCard('Cachorros', String(listDate.totalCards.totalDogs), 'animais', 'Total de cachorros castrados no período')}
                    {renderCard('Gatos', String(listDate.totalCards.totalCats), 'animais', 'Total de gatos castrados no período')}


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