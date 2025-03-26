package org.sos.animais.gestao.dto;

public class DashboardCards {
    private long totalDogs;
    private long totalCats;
    private long totalCastrations;
    private double averageTime;

    public DashboardCards() {
    }

    public DashboardCards(long totalDogs, long totalCats, long totalCastrations, double averageTime) {
        this.totalDogs = totalDogs;
        this.totalCats = totalCats;
        this.totalCastrations = totalCastrations;
        this.averageTime = averageTime;
    }

    public long getTotalDogs() {
        return totalDogs;
    }

    public void setTotalDogs(long totalDogs) {
        this.totalDogs = totalDogs;
    }

    public long getTotalCats() {
        return totalCats;
    }

    public void setTotalCats(long totalCats) {
        this.totalCats = totalCats;
    }

    public long getTotalCastrations() {
        return totalCastrations;
    }

    public void setTotalCastrations(long totalCastrations) {
        this.totalCastrations = totalCastrations;
    }

    public double getAverageTime() {
        return averageTime;
    }

    public void setAverageTime(double averageTime) {
        this.averageTime = averageTime;
    }
}
