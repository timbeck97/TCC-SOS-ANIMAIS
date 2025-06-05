package org.sos.animais.gestao.dto;

import java.util.List;

public class PaginatedDataDto <T>{
    private List<T> data;
    private long totalElements;
    private long totalPages;

    public PaginatedDataDto() {
    }

    public PaginatedDataDto(List<T> data, long totalElements, long totalPages) {
        this.data = data;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public long getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(long totalPages) {
        this.totalPages = totalPages;
    }
}
