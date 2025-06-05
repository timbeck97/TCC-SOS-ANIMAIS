package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.dto.PaginatedDataDto;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalType;
import org.sos.animais.gestao.service.AdoptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public/adoption")
public class PublicAdoptionController {

    private final AdoptionService adoptionService;

    public PublicAdoptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }
    @GetMapping
    public ResponseEntity<PaginatedDataDto<AdoptionAnimalDto>> findAllAvailable(
            @RequestParam(required = false) EAnimalType tipoAnimal,
            @RequestParam(required = false) EAnimalGender genero,
            @RequestParam(required = false, defaultValue = "12") int quantidadeRegistros,
            @RequestParam(required = false, defaultValue = "0") int numeroPagina
    ){
        PaginatedDataDto<AdoptionAnimalDto> data = adoptionService.findAllAvailable(tipoAnimal, genero, quantidadeRegistros, numeroPagina);
        return ResponseEntity.ok(data);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionAnimalDto> findById(@PathVariable long id) {
        AdoptionAnimalDto resp = adoptionService.findById(id);
        if (resp == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(resp);
    }
}
