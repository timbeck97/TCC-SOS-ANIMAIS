package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.CastrationDto;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.dto.CastrationRequestTotalDto;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    @PostMapping("/waitingList/{id}/paymentReceipt")
    public ResponseEntity<?> sendPaymentReceipt(@PathVariable Long id, @RequestPart("file") MultipartFile file){
        castrationService.savePaymentReceipt(id,file);
        return ResponseEntity.ok().build();
    }
    @GetMapping("/waitingList")
    public ResponseEntity<List<CastrationRequestDto>> findAllWaitingList(){
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
    public ResponseEntity<?> deleteWaitingList(@PathVariable Long id){
        return castrationService.deleteRequest(id);
    }

}
