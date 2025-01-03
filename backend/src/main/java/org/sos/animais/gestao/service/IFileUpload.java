package org.sos.animais.gestao.service;

import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.springframework.web.multipart.MultipartFile;

public interface IFileUpload {

    CastrationFile uploadFile(MultipartFile file, CastrationRequest castrationRequest);
}
