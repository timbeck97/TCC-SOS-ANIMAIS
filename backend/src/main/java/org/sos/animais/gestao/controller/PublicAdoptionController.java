package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.service.AdoptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public/adoption")
public class PublicAdoptionController {

    private final AdoptionService adoptionService;

    public PublicAdoptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }
    @GetMapping
    public ResponseEntity<List<AdoptionAnimalDto>> findAllAvailable(){
        List<AdoptionAnimalDto> resp = adoptionService.findAllAvailable();
        return ResponseEntity.ok(resp);
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
