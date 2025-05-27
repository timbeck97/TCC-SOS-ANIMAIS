package org.sos.animais.gestao.controller;

import jakarta.validation.Valid;
import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.dto.UploadAdoptionDto;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.sos.animais.gestao.service.AdoptionService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/adoption")
public class AdoptionController {

    private final AdoptionService adoptionService;

    public AdoptionController(AdoptionService adoptionService) {
        this.adoptionService = adoptionService;
    }
    @GetMapping
    public ResponseEntity<List<AdoptionAnimalDto>> getAll(){
        List<AdoptionAnimalDto> resp = adoptionService.findAll();
        return ResponseEntity.ok(resp);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AdoptionAnimalDto> getById(@PathVariable Long id){
        AdoptionAnimalDto resp = adoptionService.findById(id);
        return ResponseEntity.ok(resp);
    }
    @PostMapping
    public ResponseEntity<AdoptionAnimalDto> save(@ModelAttribute UploadAdoptionDto dto){
        AdoptionAnimalDto resp = adoptionService.save(dto);
        return ResponseEntity.ok(resp);
    }
    @PutMapping(value = "/{id}")
    public ResponseEntity<AdoptionAnimalDto> update(@ModelAttribute UploadAdoptionDto dto,
                                                  @PathVariable Long id){
        if(!dto.getId().equals(id)){
            return ResponseEntity.badRequest().build();
        }
        AdoptionAnimalDto resp = adoptionService.save(dto);
        return ResponseEntity.ok(resp);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id){
        adoptionService.delete(id);
        return ResponseEntity.noContent().build();
    }

}
