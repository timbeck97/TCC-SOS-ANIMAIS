package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.model.Castration;
import org.sos.animais.gestao.repository.CastrationRepository;
import org.sos.animais.gestao.service.ReportService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/report")
public class ReportController {

    private final ReportService reportService;
    private final CastrationRepository castrationRepository;

    public ReportController(ReportService reportService, CastrationRepository castrationRepository) {
        this.reportService = reportService;
        this.castrationRepository = castrationRepository;
    }

    @GetMapping("/castration/{id}")
    public ResponseEntity<byte[]> generateReport(@PathVariable Long id) {
        Castration entity = castrationRepository.findById(id).orElseThrow(() -> new RuntimeException("Castration not found"));
        byte[] body = reportService.generateReport(entity);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "inline; filename=" + "RelatorioCastracao" + ".pdf");
        headers.setContentType(org.springframework.http.MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("filename", "RelatorioCastracao.pdf");
        return new ResponseEntity<>(body, headers, HttpStatus.OK);
    }
}
