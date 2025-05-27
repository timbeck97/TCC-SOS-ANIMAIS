package org.sos.animais.gestao.dto;

import org.sos.animais.gestao.model.AdoptionImage;

public class AdoptionImageDto {
    private long id;
    private String url;
    private boolean principal;

    public AdoptionImageDto() {
    }

    public AdoptionImageDto(AdoptionImage i) {
        this.id = i.getId();
        this.url = i.getFile().getUrl();
        this.principal = i.isPrincipal();
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }
}
