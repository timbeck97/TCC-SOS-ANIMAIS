package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.PriceRangeDto;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.model.PriceRange;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.sos.animais.gestao.repository.PriceRangeRepository;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/faixapreco")
public class PriceRangeController {

    private final PriceRangeRepository priceRangeRepository;
    private final CastrationRequestRepository castrationRequestRepository;

    public PriceRangeController(PriceRangeRepository priceRangeRepository, CastrationRequestRepository castrationRequestRepository) {
        this.priceRangeRepository = priceRangeRepository;
        this.castrationRequestRepository = castrationRequestRepository;
    }


    @GetMapping
    public ResponseEntity<List<PriceRange>> findAll(){
        return ResponseEntity.ok(priceRangeRepository.findAll(Sort.by(Sort.Order.asc("id"))));
    }
    @PostMapping
    public ResponseEntity<PriceRange> save(@RequestBody PriceRangeDto faixaPreco){
        return ResponseEntity.ok(priceRangeRepository.save(new PriceRange(faixaPreco.getDescricao(), faixaPreco.getValor())));
    }
    @PutMapping("/{id}")
    public ResponseEntity<PriceRange> update(@PathVariable long id, @RequestBody PriceRangeDto faixaPreco){
        PriceRange faixa = priceRangeRepository.findById(id).orElseThrow(()->new RuntimeException("Faixa de preço não encontrada"));
        faixa.setDescricao(faixaPreco.getDescricao());
        faixa.setValor(faixaPreco.getValor());
        return ResponseEntity.ok(priceRangeRepository.save(faixa));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id){
        PriceRange faixa = priceRangeRepository.findById(id).orElseThrow(()->new RuntimeException("Faixa de preço não encontrada"));
        priceRangeRepository.delete(faixa);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/solicitacaoCastracao/{id}")
    public ResponseEntity<PriceRange> updateCastracao(@PathVariable Long id, @RequestParam Long idFaixa){
        PriceRange faixa = priceRangeRepository.findById(idFaixa).orElse(null);
        CastrationRequest request= castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("Solicitação de castração não encontrada"));
        request.setFaixaPreco(faixa);
        castrationRequestRepository.save(request);
        return ResponseEntity.ok(faixa);

    }

}
