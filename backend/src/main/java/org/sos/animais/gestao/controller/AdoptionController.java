package org.sos.animais.gestao.controller;

import jakarta.validation.Valid;
import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.dto.PaginatedDataDto;
import org.sos.animais.gestao.dto.UploadAdoptionDto;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalType;
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
    public ResponseEntity<PaginatedDataDto<AdoptionAnimalDto>> getAll(
            @RequestParam(required = false)EAnimalType tipoAnimal,
            @RequestParam(required = false) EAnimalGender genero,
            @RequestParam(required = false) EAdoptionSituation situacaoAdocao,
            @RequestParam(required = false, defaultValue = "12") int quantidadeRegistros,
             @RequestParam(required = false, defaultValue = "0") int numeroPagina
            ){
        System.out.println(tipoAnimal+"-"+ genero+"-"+situacaoAdocao);
        System.out.println("quantidadeRegistros: "+quantidadeRegistros+" - numeroPagina: "+numeroPagina);
        PaginatedDataDto<AdoptionAnimalDto> dto = adoptionService.findAll(tipoAnimal, genero, situacaoAdocao, quantidadeRegistros, numeroPagina);
        dto.getData().forEach(x->System.out.print(x.getNome()+"-"));
        System.out.println();
        System.out.println("total elements: "+dto.getTotalElements());
        System.out.println("total pages: "+dto.getTotalPages());
        System.out.println("--------------------");
        return ResponseEntity.ok(dto);
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
