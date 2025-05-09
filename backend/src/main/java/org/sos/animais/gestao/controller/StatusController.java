package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.StatusDto;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import oshi.hardware.CentralProcessor;
import oshi.SystemInfo;
import oshi.hardware.CentralProcessor;
import oshi.hardware.GlobalMemory;
import oshi.software.os.OperatingSystem;
import oshi.software.os.OSFileStore;
import org.springframework.stereotype.Service;

import java.util.List;

@RestController
@RequestMapping
public class StatusController {

    private final SystemInfo systemInfo = new SystemInfo();

    @PreAuthorize("hasAnyRole('ADMIN')")
    @RequestMapping("/status")
    public StatusDto status() {
        double cpu = 0.0;
        double totalMemory = 0.0;
        double memoryUsage = 0.0;
        double totalDisk = 0.0;
        double diskUsage = 0.0;
        SystemInfo systemInfo = new SystemInfo();

        CentralProcessor processor = systemInfo.getHardware().getProcessor();
        double[] load = processor.getSystemLoadAverage(1);
        if (load[0] >= 0) {
            cpu = load[0]; // Load average dos últimos 1 min
        }

        GlobalMemory memory = systemInfo.getHardware().getMemory();
        totalMemory = memory.getTotal() / 1_000_000.0; // em MB
        memoryUsage = (memory.getTotal() - memory.getAvailable()) / 1_000_000.0; // em MB

        OperatingSystem os = systemInfo.getOperatingSystem();
        List<OSFileStore> fileStores = os.getFileSystem().getFileStores();

        long total = 0;
        long usado = 0;

        for (OSFileStore fs : fileStores) {
            total += fs.getTotalSpace();
            usado += fs.getTotalSpace() - fs.getUsableSpace();
        }

        totalDisk = total / 1_000_000_000.0;
        diskUsage = usado / 1_000_000_000.0;
        return new StatusDto(cpu, memoryUsage, totalMemory, diskUsage, totalDisk);
    }
}
