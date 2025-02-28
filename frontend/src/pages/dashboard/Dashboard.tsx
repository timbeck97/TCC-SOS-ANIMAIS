import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryStack, VictoryTheme, VictoryTooltip } from "victory"
import Input from "../../components/input/Input"
import { useState } from "react"


export const Dashboard = () => {

    const [periodoInicio, setPeriodoInicio] = useState<string>('2025-01-01')
    const [periodoFinal, setPeriodoFinal] = useState<string>('2025-01-12')
    const renderCard = (title: string, value: string, valueDescription: string, detail: string) => {
        return (
            <div className="border bg-white border-gray-200 min-h-64 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 drop-shadow-md">
                <div className="rounded-t-lg min-h-24 border-b border-gray-200 shadow drop-shadow-sm flex  justify-center items-center">
                    <div className="flex justify-center items-end space-x-2">
                        <h1 className="poppins-medium text-4xl">
                            {value}
                        </h1>
                        <span>{valueDescription}</span>
                    </div>
                </div>
                <div className="p-4 mt-3 h-full">
                    <h3 className="font-bold poppins-medium">{title}</h3>
                    <p className="mt-2 poppins-light break-words">{detail}</p>
                </div>

            </div>
        )
    }
    const mockData = [
        { mes: 'jan', valor: 25 },
        { mes: 'fev', valor: 32 },
        { mes: 'mar', valor: 20 },
        { mes: 'abr', valor: 11 },
        { mes: 'mai', valor: 15 },
        { mes: 'jun', valor: 26 },
        { mes: 'jul', valor: 22 },
        { mes: 'ago', valor: 25 },
        { mes: 'set', valor: 23 },
        { mes: 'out', valor: 32 },
        { mes: 'nov', valor: 31 },
        { mes: 'dez', valor: 29 },
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
            <div >
                
                <VictoryChart theme={VictoryTheme.material} domainPadding={20} height={150}>
                    {/* Eixo X */}
                    <VictoryAxis
                        tickValues={mockData.map((d) => d.mes)}
                        tickLabelComponent={<VictoryLabel angle={-45} />}
                        style={{
                            tickLabels: { fontSize: 4, padding: 5, fontWeight: 'bold' },
                        }}
                    />
                    {/* Eixo Y */}
                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => `${x}`}
                        style={{
                            tickLabels: { fontSize: 4, padding: 5 },
                        }}
                    />
                    {/* Gráfico de Linha */}
                    <VictoryLine
                        data={mockData}
                        x="mes"
                        y="valor"
                        labels={({ datum }) => datum.valor}
                        style={{
                            data: { stroke: "#4CAF50", strokeWidth: 1 },
                            labels: { fontSize: 4, fontWeight: 'bold' },
                        }}

                    />
                    {/* Legenda */}
                    {/* <VictoryLegend
                        x={125}
                        y={10}
                        orientation="horizontal"
                        gutter={20}
                        style={{ labels: { fontSize: 4 } }}
                        data={[
                            { name: "Animais Castrados", symbol: { fill: "#4CAF50" } },
                        ]}
                    /> */}
                    <VictoryScatter
                        data={mockData}
                        x="mes"
                        y="valor"
                        size={2} // Tamanho dos pontos
                        style={{
                            data: { fill: "#98FB98" }, // Cor dos pontos
                        }}


                    />

                </VictoryChart>
            </div>
            <div className="w-2/4 m-auto">

                <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={{ x: [40, 20] }} // Espaçamento entre as barras

                    height={200} // Altura do gráfico
                >
                    {/* Eixo X com os tipos de pagamento */}
                    <VictoryAxis
                        tickValues={mockPagamentos.map((data) => data.tipo)}
                        tickFormat={mockPagamentos.map((data) => data.tipo)}
                        style={{
                            tickLabels: { fontSize: 8, padding: 5, fontWeight: 'bold' }, // Rotação para caber os textos
                        }}

                    />
                    {/* Eixo Y para as quantidades */}
                    <VictoryAxis dependentAxis
                        tickFormat={(x) => `${x}`}
                        style={{
                            tickLabels: { fontSize: 8, padding: 5 },
                        }} />

                    {/* Gráfico de Barras */}
                    <VictoryBar
                    
                        data={mockPagamentos}
                        x="tipo"
                        y="quantidade"
                        alignment='middle'
                        barWidth={40} // Largura das barras
                        style={{
                            data: { fill: "#4caf50", padding: '10px' }, // Cor das barras
                        }}
                        labels={({ datum }) => datum.quantidade}

                    />
                </VictoryChart>
            </div>
        </div>
    )
}