package org.sos.animais.gestao.dto;

public class DashboardsDto {

    private DefaultChartDto lineChart;

    private DefaultChartDto barChart;

    private DefaultChartDto pieChart;

    private DashboardCards totalCards;

    public DashboardsDto() {
    }

    public DefaultChartDto getLineChart() {
        if(lineChart==null){
            lineChart = new DefaultChartDto();
        }
        return lineChart;
    }

    public void setLineChart(DefaultChartDto lineChart) {
        this.lineChart = lineChart;
    }

    public DefaultChartDto getBarChart() {
        if(barChart==null){
            barChart = new DefaultChartDto();
        }
        return barChart;
    }

    public void setBarChart(DefaultChartDto barChart) {
        this.barChart = barChart;
    }

    public DefaultChartDto getPieChart() {
        if(pieChart==null){
            pieChart = new DefaultChartDto();
        }
        return pieChart;
    }

    public void setPieChart(DefaultChartDto pieChart) {
        this.pieChart = pieChart;
    }

    public DashboardCards getTotalCards() {
        return totalCards;
    }

    public void setTotalCards(DashboardCards totalCards) {
        this.totalCards = totalCards;
    }
}
