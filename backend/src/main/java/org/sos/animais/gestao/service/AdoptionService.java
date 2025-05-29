package org.sos.animais.gestao.service;

import jakarta.transaction.Transactional;
import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.dto.UploadImageDto;
import org.sos.animais.gestao.dto.UploadAdoptionDto;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.sos.animais.gestao.model.AdoptionImage;
import org.sos.animais.gestao.model.SosAnimaisFile;
import org.sos.animais.gestao.repository.AdoptionRepository;
import org.sos.animais.gestao.service.file.FileService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptionService {

    private final AdoptionRepository adoptionRepository;
    private final FileService fileService;


    public AdoptionService(AdoptionRepository adoptionRepository, FileService fileService) {
        this.adoptionRepository = adoptionRepository;
        this.fileService = fileService;

    }

    public List<AdoptionAnimalDto> findAll() {
        List<AdoptionAnimal> entities = adoptionRepository.findAll();
        return entities.stream().map(AdoptionAnimalDto::new).collect(Collectors.toList());
    }

    public List<AdoptionAnimalDto> findAllAvailable() {
        List<AdoptionAnimal> entities = adoptionRepository.findAllBySituacaoOrderByIdAsc(EAdoptionSituation.DISPONIVEL);
        return entities.stream().map(AdoptionAnimalDto::new).collect(Collectors.toList());
    }

    public AdoptionAnimalDto findById(Long id) {
        AdoptionAnimal entity = adoptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Adoption animal not found"));
        return new AdoptionAnimalDto(entity);
    }

    public AdoptionAnimalDto save(UploadAdoptionDto dto) {
        AdoptionAnimal entity = null;
        if (dto.getId() != null) {
            entity = adoptionRepository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("Adoption animal not found"));
        } else {
            entity = new AdoptionAnimal();
        }
        entity.setNome(dto.getNome());
        entity.setDescricao(dto.getDescricao());
        entity.setIdade(dto.getIdade());
        entity.setPorte(dto.getPorte());
        entity.setRaca(dto.getRaca());
        entity.setGenero(dto.getGenero());
        entity.setSituacao(dto.getSituacao());
        entity.setTelefone(dto.getTelefone());
        entity = adoptionRepository.save(entity);

        if (dto.getId() == null) {
            for (UploadImageDto imagem : dto.getFiles()) {
                AdoptionImage imgFile = fileService.uploadFileAdoption(imagem.getFile(), "adoption", entity, imagem.isPrincipal());
                entity.getImagens().add(imgFile);
            }
        } else {
            List<SosAnimaisFile> listDelete = new ArrayList<>();

            entity.getImagens().removeIf(imagemExistente -> {
                boolean remover = dto.getFiles().stream().noneMatch(img -> img.getId() != null && img.getId().equals(imagemExistente.getId()));
                if (remover) {
                    listDelete.add(imagemExistente.getFile());
                }
                return remover;
            });
            entity = adoptionRepository.save(entity);
            for (SosAnimaisFile sosAnimaisFile : listDelete) {
                fileService.deleteFile(sosAnimaisFile);
            }
            for (UploadImageDto imgDto : dto.getFiles()) {
                if (imgDto.getId() != null) {
                    AdoptionImage imgEntity = entity.getImagens().stream()
                            .filter(img -> img.getId() == imgDto.getId())
                            .findFirst()
                            .orElseThrow(() -> new RuntimeException("Image not found"));
                    imgEntity.setPrincipal(imgDto.isPrincipal());

                }else{
                    AdoptionImage imgFile = fileService.uploadFileAdoption(imgDto.getFile(), "adoption", entity, imgDto.isPrincipal());
                    entity.getImagens().add(imgFile);
                }
            }
        }
        entity = adoptionRepository.save(entity);
        return new AdoptionAnimalDto(entity);
    }

    @Transactional
    public void delete(Long id) {
        AdoptionAnimal entity = adoptionRepository.findById(id).orElseThrow(() -> new RuntimeException("Adoption animal not found"));
        entity.getImagens().forEach(i->{
            fileService.deleteFile(i.getFile());
        });
        adoptionRepository.delete(entity);
    }


}
