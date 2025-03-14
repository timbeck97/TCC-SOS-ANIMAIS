package org.sos.animais.gestao.service.file;

import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.service.Constantes;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.UUID;

@Service
public class FileService {

    private final FileUploadService fileUpload;
    private final CastrationFileRepository castrationFileRepository;

    public FileService(FileUploadService fileUpload, CastrationFileRepository castrationFileRepository) {
        this.fileUpload = fileUpload;
        this.castrationFileRepository = castrationFileRepository;
    }

    public void uploadFileCastrationRequest(MultipartFile file, String folder, CastrationRequest castrationRequest, EFileType tipo) {
        String randomFileName = UUID.randomUUID().toString() + "_" + castrationRequest.getId() + "_" + file.getOriginalFilename();
        String urlFile = fileUpload.uploadFile(file, folder, randomFileName);
        CastrationFile castrationFile = new CastrationFile();
        castrationFile.setOriginalName(file.getOriginalFilename());
        castrationFile.setName(randomFileName);
        castrationFile.setUrl(urlFile);
        castrationFile.setOrigin(EFileOrigin.LOCAL);
        castrationFile.setCastrationRequest(castrationRequest);
        castrationFile.setTipoArquivo(tipo);
        castrationFile.setFolder(folder);
        castrationFileRepository.save(castrationFile);
    }
    public void deleteFileCastrationRequest(CastrationFile castrationFile) {
        fileUpload.deleteFile(castrationFile.getName(), castrationFile.getFolder());
        castrationFileRepository.delete(castrationFile);
    }
}
