package org.sos.animais.gestao.service.file;

import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    CastrationFile uploadFile(MultipartFile file, String folder, CastrationRequest castrationRequest, EFileType tipo);
}
