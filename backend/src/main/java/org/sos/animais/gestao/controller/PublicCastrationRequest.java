package org.sos.animais.gestao.controller;

import jakarta.validation.Valid;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/public/castration")
public class PublicCastrationRequest {
    private final CastrationService castrationService;

    public PublicCastrationRequest(CastrationService castrationService) {
        this.castrationService = castrationService;
    }

    @PostMapping()
    public ResponseEntity<CastrationRequestDto> save(@Valid @RequestPart CastrationRequestDto dto,
                                                     @RequestPart(value = "file", required = false) MultipartFile file){
        CastrationRequestDto entity = castrationService.saveCastrationRequest(dto, null, file);
        return ResponseEntity.ok(entity);
    }
}
