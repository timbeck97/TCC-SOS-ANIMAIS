package org.sos.animais.gestao.service;

import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;

@Service
public class LocalFileUploadImp implements FileUploadService {

    @Value("${fileUploadPath}")
    private String localPath;

    private final CastrationFileRepository castrationFileRepository;

    public LocalFileUploadImp(CastrationFileRepository castrationFileRepository) {
        this.castrationFileRepository = castrationFileRepository;
    }

    public CastrationFile uploadFile(MultipartFile file, String pasta, CastrationRequest castrationRequest, EFileType tipo) {
        String folderPath = localPath.endsWith("/")?localPath:localPath+"/";
        folderPath=folderPath+pasta;
        File directory = new File(folderPath);
        if (!directory.exists()) {
            boolean mkdirs = directory.mkdirs();
            if (!mkdirs) {
                throw new RuntimeException("Could not create directory");
            }
        }
        folderPath=folderPath.endsWith("/")?folderPath:folderPath+"/";
        String randomFileName = java.util.UUID.randomUUID().toString()+"_"+castrationRequest.getId()+"_"+file.getOriginalFilename();
        File newFile = new File(folderPath + randomFileName);
        try {
            file.transferTo(newFile);
            CastrationFile castrationFile = new CastrationFile();
            castrationFile.setName(file.getOriginalFilename());
            castrationFile.setUrl(ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString()+"/public/arquivos/"+pasta+"/" + randomFileName);
            castrationFile.setOrigin(EFileOrigin.LOCAL);
            castrationFile.setCastrationRequest(castrationRequest);
            castrationFile.setTipoArquivo(tipo);
            return castrationFileRepository.save(castrationFile);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Could not save file");
        }
    }
}
