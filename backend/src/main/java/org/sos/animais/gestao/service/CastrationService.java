package org.sos.animais.gestao.service;

import org.sos.animais.gestao.dto.CastrationDto;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.dto.CastrationRequestTotalDto;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.factory.CastrationRequestFactory;
import org.sos.animais.gestao.model.Castration;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.model.PriceRange;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.repository.CastrationRepository;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.sos.animais.gestao.repository.PriceRangeRepository;
import org.sos.animais.gestao.service.file.FileService;
import org.sos.animais.gestao.service.file.FileUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class CastrationService {


    private final CastrationRequestRepository castrationRequestRepository;
    private final CastrationRepository castrationRepository;
    private final FileService fileService;
    private final CastrationFileRepository castrationFileRepository;
    private final PriceRangeRepository priceRangeRepository;

    public CastrationService(CastrationRequestRepository castrationRequestRepository, CastrationRepository castrationRepository, FileService fileService, CastrationFileRepository castrationFileRepository, PriceRangeRepository priceRangeRepository) {
        this.castrationRequestRepository = castrationRequestRepository;
        this.castrationRepository = castrationRepository;
        this.fileService = fileService;
        this.castrationFileRepository = castrationFileRepository;
        this.priceRangeRepository = priceRangeRepository;
    }


    public List<CastrationDto> findAll(){
        return castrationRepository.findAll().stream().map(this::convertCastrationToDto).toList();
    }
    public CastrationDto findOne(Long id){
        return castrationRepository.findById(id).map(this::convertCastrationToDto).orElseThrow(()->new RuntimeException("Castration not found"));
    }
    public List<CastrationRequestDto> findAllRequest(){
        return castrationRequestRepository.findAllByCastracaoIsNullAndSituacaoIsOrderByDataSolicitacaoAsc(ERequestSituation.AGUARDANDO).stream().map(this::convertCastrationRequestToDto).toList();
    }
    public CastrationRequestDto findOneRequest(Long id){
        return castrationRequestRepository.findById(id).map(this::convertCastrationRequestToDto).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
    }
    public CastrationRequestTotalDto getTotal(){
        return castrationRequestRepository.countAll();
    }
    public ResponseEntity<?> removeCastrationRequest(Long id){
        return castrationRequestRepository.findById(id).map(castrationRequest -> {
            castrationRequest.setCastracao(null);
            castrationRequest.setSituacao(ERequestSituation.AGUARDANDO);
            castrationRequestRepository.save(castrationRequest);
            return ResponseEntity.ok().build();
        }).orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());

    }
    public CastrationDto saveCastration(CastrationDto dto){
        Castration entity = new Castration();
        entity.setData(dto.getData());
        entity.setObservacao(dto.getObservacao());
        entity.setSituacao(ERequestSituation.EM_ANDAMENTO);
        for (CastrationRequestDto animal : dto.getAnimais()) {
            CastrationRequest castrationRequest = castrationRequestRepository.findById(animal.getId()).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
            castrationRequest.setCastracao(entity);
            castrationRequest.setSituacao(ERequestSituation.EM_ANDAMENTO);
            entity.getRequisicoes().add(castrationRequest);
        }
        entity = castrationRepository.save(entity);
        return convertCastrationToDto(entity);
    }
    public void addAnimal(Long idCastration, Long idAnimal){
        Castration entity = castrationRepository.findById(idCastration).orElseThrow(()->new RuntimeException("Castration not found"));
        CastrationRequest castrationRequest = castrationRequestRepository.findById(idAnimal).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        castrationRequest.setCastracao(entity);
        castrationRequest.setSituacao(ERequestSituation.EM_ANDAMENTO);
        entity.getRequisicoes().add(castrationRequest);
        castrationRepository.save(entity);
    }
    public void finishCastration(Long id){
        Castration entity = castrationRepository.findById(id).orElseThrow(()->new RuntimeException("Castration not found"));
       if(! entity.getRequisicoes().stream()
               .allMatch(x->x.getFaixaPreco()!=null)){
              throw new RuntimeException("Nem todos os animais possuem faixa de preço vinculada");
       }
        if(entity.getData().after(new Date())){
            throw new RuntimeException("Data de castração não pode ser anterior a data atual");
        }
        entity.setSituacao(ERequestSituation.FINALIZADA);
        castrationRepository.save(entity);
    }
    public void savePayment(Long id, MultipartFile file){
        CastrationRequest entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        if(file!=null){
            fileService.uploadFileCastrationRequest(file, Constantes.PAYMENT_RECEIPT_FOLDER, entity, EFileType.COMPROVANTE_PAGAMENTO);
            entity.setPaga(true);
        }else{
            entity.setPaga(true);
        }
        castrationRequestRepository.save(entity);
    }
    public CastrationDto convertCastrationToDto(Castration entity){
        CastrationDto dto = new CastrationDto();
        dto.setData(entity.getData());
        dto.setId(entity.getId());
        dto.setObservacao(entity.getObservacao());
        dto.setAnimais(entity.getRequisicoes().stream().map(x->convertCastrationRequestToDto(x)).toList());
        dto.setQuantidadeAnimais(entity.getRequisicoes().size());
        dto.setSituacao(entity.getSituacao());
        return dto;
    }
    public CastrationRequestDto convertCastrationRequestToDto(CastrationRequest entity){
        CastrationRequestDto dto = new CastrationRequestDto(entity);
        List<CastrationFile> imgFile = castrationFileRepository.findByCastrationRequestId(entity.getId());
        for (CastrationFile file : imgFile) {
            if(file.getTipoArquivo().equals(EFileType.FOTO)){
                dto.setUrlImagem(file.getUrl());
            } else if (file.getTipoArquivo().equals(EFileType.COMPROVANTE_PAGAMENTO)){
                dto.setUrlComprovante(file.getUrl());
            }
        }

        return dto;
    }
    public CastrationRequestDto saveCastrationRequest(CastrationRequestDto castrationRequestDto, Long id, MultipartFile file){
        CastrationRequest entity=new CastrationRequest();
        if(id!=null){
            entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        }
        entity = CastrationRequestFactory.init().withEntity(entity).withDto(castrationRequestDto).build();
        if(castrationRequestDto.getIdFaixa()!=null && castrationRequestDto.getIdFaixa()>0l){
            PriceRange priceRange = priceRangeRepository.findById(castrationRequestDto.getIdFaixa()).orElseThrow(()->new RuntimeException("PriceRange not found"));
            entity.setFaixaPreco(priceRange);
        }else{
            entity.setFaixaPreco(null);
        }
        if(id==null){
            entity.setSituacao(ERequestSituation.AGUARDANDO);
            entity.setDataSolicitacao(new Date());
        }
        entity = castrationRequestRepository.save(entity);
        if(id==null && file!=null){
            fileService.uploadFileCastrationRequest(file, Constantes.CASTRATION_FOLDER, entity, EFileType.FOTO);
        }
        return convertCastrationRequestToDto(entity);
    }
    public void deleteCastrationRequest(Long id){
        CastrationRequest entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        List<CastrationFile> imgFile = castrationFileRepository.findByCastrationRequestId(entity.getId());
        for (CastrationFile file : imgFile) {
            fileService.deleteFileCastrationRequest(file);
        }
        castrationRequestRepository.delete(entity);
    }
}
