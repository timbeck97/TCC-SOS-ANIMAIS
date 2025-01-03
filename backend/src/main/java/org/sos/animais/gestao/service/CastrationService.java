package org.sos.animais.gestao.service;

import org.sos.animais.gestao.dto.CastrationDto;
import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.factory.CastrationRequestFactory;
import org.sos.animais.gestao.model.Castration;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.repository.CastrationRepository;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.List;

@Service
public class CastrationService {


    private final CastrationRequestRepository castrationRequestRepository;
    private final CastrationRepository castrationRepository;
    private final IFileUpload fileUpload;
    private final CastrationFileRepository castrationFileRepository;


    public CastrationService(CastrationRequestRepository castrationRequestRepository, CastrationRepository castrationRepository, IFileUpload fileUpload, CastrationFileRepository castrationFileRepository) {
        this.castrationRequestRepository = castrationRequestRepository;
        this.castrationRepository = castrationRepository;
        this.fileUpload = fileUpload;
        this.castrationFileRepository = castrationFileRepository;
    }
    public List<CastrationDto> findAll(){
        return castrationRepository.findAll().stream().map(this::convertCastrationToDto).toList();
    }
    public CastrationDto findOne(Long id){
        return castrationRepository.findById(id).map(this::convertCastrationToDto).orElseThrow(()->new RuntimeException("Castration not found"));
    }
    public List<CastrationRequestDto> findAllRequest(){
        return castrationRequestRepository.findAllByCastracaoIsNullAndSituacaoIs(ERequestSituation.AGUARDANDO).stream().map(this::convertCastrationRequestToDto).toList();
    }
    public CastrationRequestDto findOneRequest(Long id){
        return castrationRequestRepository.findById(id).map(CastrationRequestDto::new).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
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
    public CastrationDto convertCastrationToDto(Castration entity){
        CastrationDto dto = new CastrationDto();
        dto.setData(entity.getData());
        dto.setId(entity.getId());
        dto.setObservacao(entity.getObservacao());
        dto.setAnimais(entity.getRequisicoes().stream().map(CastrationRequestDto::new).toList());
        dto.setQuantidadeAnimais(entity.getRequisicoes().size());
        dto.setSituacao(entity.getSituacao());
        return dto;
    }
    public CastrationRequestDto convertCastrationRequestToDto(CastrationRequest entity){
        CastrationRequestDto dto = new CastrationRequestDto(entity);
        CastrationFile file = castrationFileRepository.findByCastrationRequestId(entity.getId());
        if(file!=null){
            dto.setUrlImagem(file.getUrl());
        }

        return dto;
    }
    public CastrationRequestDto saveCastrationRequest(CastrationRequestDto castrationRequestDto, Long id, MultipartFile file){
        CastrationRequest entity;
        if(id!=null){
            entity = castrationRequestRepository.findById(id).orElseThrow(()->new RuntimeException("CastrationRequest not found"));
        }else{
            entity = CastrationRequestFactory.init().withDto(castrationRequestDto).build();
        }
        entity.setSituacao(ERequestSituation.AGUARDANDO);
        entity.setDataSolicitacao(new Date());
        entity = castrationRequestRepository.save(entity);
        if(id==null && file!=null){
            fileUpload.uploadFile(file, entity);
        }
        return convertCastrationRequestToDto(entity);
    }
}
