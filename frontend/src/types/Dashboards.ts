import { DashboardCards } from "./DashboardCards"

export interface Dashboards{
    lineChart:{labels:string[],values:string[]}
    barChart:{labels:string[], values:string[]}
    pieChart:{labels:string[], values:string[]}
    totalCards:DashboardCards
}