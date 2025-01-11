package org.sos.animais.gestao.dto;

public class CastrationRequestTotalDto {
    private long total;
    private long totalDogs;
    private long totalCats;

    public CastrationRequestTotalDto() {
    }

    public CastrationRequestTotalDto(long total, long totalDogs, long totalCats) {
        this.total = total;
        this.totalDogs = totalDogs;
        this.totalCats = totalCats;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
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
}
