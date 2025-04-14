package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.CastrationDto;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.dto.CastrationRequestReturnDTO;
import org.sos.animais.gestao.dto.CastrationRequestTotalDto;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/castration")
public class CastrationController {

   private final CastrationService castrationService;


    public CastrationController(CastrationService castrationService) {
        this.castrationService = castrationService;
    }
    @PostMapping
    public ResponseEntity<CastrationDto> save(@RequestBody CastrationDto dto ){
        return ResponseEntity.ok(castrationService.saveCastration(dto));
    }
    @PutMapping("/concluir/{id}")
    public  ResponseEntity<Void> finishCastration(@PathVariable Long id){
        castrationService.finishCastration(id);
        return ResponseEntity.ok().build();
    }
    @GetMapping
    public ResponseEntity<List<CastrationDto>> findAll(){
        return ResponseEntity.ok(castrationService.findAll());
    }
    @GetMapping("/{id}")
    public ResponseEntity<CastrationDto> findCastration(@PathVariable Long id){
        return ResponseEntity.ok(castrationService.findOne(id));
    }
    @PostMapping("/waitingList/{id}/addAnimal/{idAnimal}")
    public ResponseEntity<?> addAnimal(@PathVariable Long id, @PathVariable Long idAnimal){
        castrationService.addAnimal(id, idAnimal);
        return ResponseEntity.status(201).build();
    }
    @PostMapping("/waitingList/{id}/payment")
    public ResponseEntity<?> sendPaymentReceipt(@PathVariable Long id, @RequestPart(value = "file", required = false) MultipartFile file){
        castrationService.savePayment(id,file);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/waitingList")
    public ResponseEntity<List<CastrationRequestReturnDTO>> findAllWaitingList(){
        return ResponseEntity.ok(castrationService.findAllRequest());
    }
    @GetMapping("/waitingList/{id}")
    public ResponseEntity<CastrationRequestDto> findOne(@PathVariable Long id){
        return ResponseEntity.ok(castrationService.findOneRequest(id));
    }
    @GetMapping("/waitingList/totais")
    public ResponseEntity<CastrationRequestTotalDto> findTotal(){
        return ResponseEntity.ok(castrationService.getTotal());
    }
    @DeleteMapping("/waitingList/{id}")
    public ResponseEntity<?> removeCastration(@PathVariable Long id){
        return castrationService.removeCastrationRequest(id);
    }
    @PutMapping("/waitingList/{id}")
    public ResponseEntity<CastrationRequestDto> update(@PathVariable Long id, @RequestBody CastrationRequestDto dto){
        return ResponseEntity.ok(castrationService.saveCastrationRequest(dto, id, null));
    }
    @DeleteMapping("/waitingList/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id){
        castrationService.deleteCastrationRequest(id);
        return ResponseEntity.ok().build();
    }

}
