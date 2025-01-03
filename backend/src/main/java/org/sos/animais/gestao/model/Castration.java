package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.ERequestSituation;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Castration {
    @Id
    @SequenceGenerator(name = "SEQ_CASTRATION", sequenceName = "castration_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CASTRATION")
    private long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date data;
    @Column(columnDefinition = "text")
    private String observacao;
    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private ERequestSituation situacao;
    @OneToMany(mappedBy = "castracao")
    private List<CastrationRequest> requisicoes;

    public Castration() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
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

    public List<CastrationRequest> getRequisicoes() {
        if(requisicoes==null){
            requisicoes = new ArrayList<>();
        }
        return requisicoes;
    }

    public void setRequisicoes(List<CastrationRequest> requisicoes) {
        this.requisicoes = requisicoes;
    }

    public ERequestSituation getSituacao() {
        return situacao;
    }

    public void setSituacao(ERequestSituation situacao) {
        this.situacao = situacao;
    }
}
