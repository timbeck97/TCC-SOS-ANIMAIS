package org.sos.animais.gestao.service.file;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.File;

@Service
public class LocalFileUploadImp implements FileUploadService {

    @Value("${fileUploadPath}")
    private String localPath;
    private static final Logger logger = LoggerFactory.getLogger(LocalFileUploadImp.class);
    private final CastrationFileRepository castrationFileRepository;
    @Value("${enableHttpsUrl}")
    private boolean enableHttpsUrl;

    public LocalFileUploadImp(CastrationFileRepository castrationFileRepository) {
        this.castrationFileRepository = castrationFileRepository;
    }

    public String uploadFile(MultipartFile file, String pasta, String fileName) {
        String folderPath = localPath.endsWith("/") ? localPath : localPath + "/";
        folderPath = folderPath + pasta;
        File directory = new File(folderPath);
        if (!directory.exists()) {
            boolean mkdirs = directory.mkdirs();
            if (!mkdirs) {
                throw new RuntimeException("Could not create directory");
            }
        }
        folderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        File newFile = new File(folderPath + fileName);
        try {
            file.transferTo(newFile);
            String uriString = ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
            if(enableHttpsUrl){
                uriString = uriString.replace("/api", "/service");
                uriString = uriString.replace("http", "https");
            }
            return uriString + "/public/arquivos/" + pasta + "/" + fileName;
        } catch (Exception e) {
            logger.error("Error uploading file", e);
            throw new RuntimeException("Could not save file");
        }
    }

    @Override
    public void deleteFile(String fileName, String folder) {
        String folderPath = localPath.endsWith("/") ? localPath : localPath + "/";
        folderPath = folderPath + folder;
        folderPath = folderPath.endsWith("/") ? folderPath : folderPath + "/";
        File file = new File(folderPath + fileName);
        if (file.exists()) {
            boolean delete = file.delete();
            if (!delete) {
                throw new RuntimeException("Could not delete file");
            }
        }else{
            throw new RuntimeException("File not found");
        }
    }
}
