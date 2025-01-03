package org.sos.animais.gestao.service;

import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;

@Service
public class LocalFileUploadImplementation implements IFileUpload {

    @Value("${fileUploadPath}")
    private String localPath;

    private final CastrationFileRepository castrationFileRepository;

    public LocalFileUploadImplementation(CastrationFileRepository castrationFileRepository) {
        this.castrationFileRepository = castrationFileRepository;
    }

    public CastrationFile uploadFile(MultipartFile file, CastrationRequest castrationRequest) {
        File directory = new File(localPath);
        if (!directory.exists()) {
            boolean mkdirs = directory.mkdirs();
            if (!mkdirs) {
                throw new RuntimeException("Could not create directory");
            }
        }
        String randomFileName = java.util.UUID.randomUUID().toString()+"_"+castrationRequest.getId()+"_"+file.getOriginalFilename();
        File newFile = new File(localPath + randomFileName);
        try {
            file.transferTo(newFile);
            CastrationFile castrationFile = new CastrationFile();
            castrationFile.setName(file.getOriginalFilename());
            castrationFile.setUrl(ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/public/arquivos/" + randomFileName);
            castrationFile.setOrigin(EFileOrigin.LOCAL);
            castrationFile.setCastrationRequest(castrationRequest);
            return castrationFileRepository.save(castrationFile);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Could not save file");
        }
    }
}
