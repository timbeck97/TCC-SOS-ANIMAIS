package org.sos.animais.gestao.dto;

public record StatusDto(double cpu, double memoryUsage,double totalMemory,double diskUsage, double totalDisk) {
    public StatusDto(double cpu, double memoryUsage, double totalMemory, double diskUsage, double totalDisk) {
        this.cpu = cpu;
        this.memoryUsage = memoryUsage;
        this.totalMemory = totalMemory;
        this.diskUsage = diskUsage;
        this.totalDisk = totalDisk;
    }
}
