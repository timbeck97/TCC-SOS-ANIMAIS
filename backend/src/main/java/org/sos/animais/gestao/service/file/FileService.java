package org.sos.animais.gestao.service.file;

import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.*;
import org.sos.animais.gestao.repository.AdoptionImageRepository;
import org.sos.animais.gestao.repository.CastrationFileRepository;
import org.sos.animais.gestao.repository.SosAnimaisFileRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Service
public class FileService {

    private final FileUploadService fileUpload;
    private final CastrationFileRepository castrationFileRepository;
    private final SosAnimaisFileRepository sosAnimaisFileRepository;
    private final AdoptionImageRepository adoptionImageRepository;
    public FileService(FileUploadService fileUpload, CastrationFileRepository castrationFileRepository, SosAnimaisFileRepository sosAnimaisFileRepository, AdoptionImageRepository adoptionImageRepository) {
        this.fileUpload = fileUpload;
        this.castrationFileRepository = castrationFileRepository;
        this.sosAnimaisFileRepository = sosAnimaisFileRepository;
        this.adoptionImageRepository = adoptionImageRepository;
    }


    public CastrationFile uploadFileCastrationRequest(MultipartFile file, String folder, CastrationRequest castrationRequest, EFileType tipo) {
        String randomFileName = UUID.randomUUID().toString() + "_" + castrationRequest.getId() + "_" + file.getOriginalFilename();
        String urlFile = fileUpload.uploadFile(file, folder, randomFileName);
        CastrationFile castrationFile = new CastrationFile();
        SosAnimaisFile sosFile = new SosAnimaisFile();
        sosFile.setOriginalName(file.getOriginalFilename());
        sosFile.setName(randomFileName);
        sosFile.setUrl(urlFile);
        sosFile.setOrigin(EFileOrigin.LOCAL);
        sosFile.setFolder(folder);
        sosFile = sosAnimaisFileRepository.save(sosFile);
        castrationFile.setFile(sosFile);
        castrationFile.setTipoArquivo(tipo);
        castrationFile.setCastrationRequest(castrationRequest);

        return castrationFileRepository.save(castrationFile);
    }
    public AdoptionImage uploadFileAdoption(MultipartFile file, String folder, AdoptionAnimal adoption, boolean principal) {
        String randomFileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        String urlFile = fileUpload.uploadFile(file, folder, randomFileName);
        AdoptionImage image = new AdoptionImage();
        SosAnimaisFile sosFile = new SosAnimaisFile();
        sosFile.setOriginalName(file.getOriginalFilename());
        sosFile.setName(randomFileName);
        sosFile.setUrl(urlFile);
        sosFile.setOrigin(EFileOrigin.LOCAL);
        sosFile.setFolder(folder);
        sosFile = sosAnimaisFileRepository.save(sosFile);
        image.setFile(sosFile);
        image.setAdoption(adoption);
        image.setPrincipal(principal);
        image = adoptionImageRepository.save(image);
        return image;

    }
    public void deleteFileCastrationRequest(CastrationFile castrationFile) {
        SosAnimaisFile sosFile = castrationFile.getFile();
        fileUpload.deleteFile(sosFile.getName(), sosFile.getFolder());
        castrationFileRepository.delete(castrationFile);
        sosAnimaisFileRepository.delete(sosFile);
    }
    public void deleteFile(SosAnimaisFile sosAnimaisFile) {
        fileUpload.deleteFile(sosAnimaisFile.getName(), sosAnimaisFile.getFolder());
        sosAnimaisFileRepository.delete(sosAnimaisFile);
    }
}
