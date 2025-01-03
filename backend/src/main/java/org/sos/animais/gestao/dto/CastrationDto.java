package org.sos.animais.gestao.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import org.sos.animais.gestao.enums.ERequestSituation;

import java.util.Date;
import java.util.List;

public class CastrationDto {
    private Long id;
    private Date data;
    private String observacao;
    private int quantidadeAnimais;
    private ERequestSituation situacao;
    private List<CastrationRequestDto> animais;

    public CastrationDto() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getObservacao() {
        return observacao;
    }

    public void setObservacao(String observacao) {
        this.observacao = observacao;
    }

    public List<CastrationRequestDto> getAnimais() {
        return animais;
    }

    public void setAnimais(List<CastrationRequestDto> animais) {
        this.animais = animais;
    }

    public int getQuantidadeAnimais() {
        return quantidadeAnimais;
    }

    public void setQuantidadeAnimais(int quantidadeAnimais) {
        this.quantidadeAnimais = quantidadeAnimais;
    }

    public ERequestSituation getSituacao() {
        return situacao;
    }

    public void setSituacao(ERequestSituation situacao) {
        this.situacao = situacao;
    }
}
