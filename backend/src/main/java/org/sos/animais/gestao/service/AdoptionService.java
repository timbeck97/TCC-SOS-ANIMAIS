package org.sos.animais.gestao.service;

import jakarta.transaction.Transactional;
import org.sos.animais.gestao.dto.AdoptionAnimalDto;
import org.sos.animais.gestao.dto.PaginatedDataDto;
import org.sos.animais.gestao.dto.UploadImageDto;
import org.sos.animais.gestao.dto.UploadAdoptionDto;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalType;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.sos.animais.gestao.model.AdoptionImage;
import org.sos.animais.gestao.model.SosAnimaisFile;
import org.sos.animais.gestao.repository.AdoptionRepository;
import org.sos.animais.gestao.service.file.FileService;
import org.sos.animais.gestao.service.telegram.TelegramBot;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdoptionService {

    private final AdoptionRepository adoptionRepository;
    private final FileService fileService;
    private final TelegramBot telegramBot;

    public AdoptionService(AdoptionRepository adoptionRepository, FileService fileService, TelegramBot telegramBot) {
        this.adoptionRepository = adoptionRepository;
        this.fileService = fileService;

        this.telegramBot = telegramBot;
    }

    public PaginatedDataDto<AdoptionAnimalDto> findAll(EAnimalType tipoAnimal, EAnimalGender genero, EAdoptionSituation situacaoAdocao, int quantidadeRegistros, int numeroPagina) {
        Pageable page = PageRequest.of(numeroPagina,quantidadeRegistros);
        Page<AdoptionAnimalDto> result = adoptionRepository.findAllFiltered(tipoAnimal, genero, situacaoAdocao, page);
        PaginatedDataDto dto = new PaginatedDataDto(result.getContent(), result.getTotalElements(), result.getTotalPages());
        return dto;
    }

    public PaginatedDataDto<AdoptionAnimalDto> findAllAvailable(EAnimalType tipoAnimal, EAnimalGender genero, int quantidadeRegistros, int numeroPagina) {
        Pageable page = PageRequest.of(numeroPagina,quantidadeRegistros);
        Page<AdoptionAnimalDto> result = adoptionRepository.findAllFiltered(tipoAnimal, genero, EAdoptionSituation.DISPONIVEL, page);
        PaginatedDataDto dto = new PaginatedDataDto(result.getContent(), result.getTotalElements(), result.getTotalPages());
        return dto;
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
        entity.setTipoAnimal(dto.getTipoAnimal());
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
        String mensagem = "<b>🐾 Novo animal para adoção cadastrado</b>\n" +
                "<b>Nome:</b> " + entity.getNome() + "\n" +
                "<b>ID:</b> " + entity.getId() + "\n" +
                "<b>Tipo:</b> " + entity.getTipoAnimal() + "\n" +
                "<b>Gênero:</b> " + entity.getGenero() + "\n" +
                "<b>Porte:</b> " + entity.getPorte() + "\n" +
                "<b>Situação:</b> " + entity.getSituacao();
        telegramBot.sendMessage(mensagem);
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
