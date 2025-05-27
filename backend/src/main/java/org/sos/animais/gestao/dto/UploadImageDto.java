package org.sos.animais.gestao.dto;

import org.springframework.web.multipart.MultipartFile;

public class UploadImageDto {
    private Long id;
    private MultipartFile file;
    private boolean principal;
    private boolean alterou;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }

    public boolean isAlterou() {
        return alterou;
    }

    public void setAlterou(boolean alterou) {
        this.alterou = alterou;
    }
}
