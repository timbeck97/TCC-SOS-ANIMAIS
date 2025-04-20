package org.sos.animais.gestao.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class PriceRange {

    @Id
    @SequenceGenerator(name = "SEQ_FAIXA_PRECO", sequenceName = "faixa_preco_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FAIXA_PRECO")
    private long id;

    @Column(length = 100, nullable = false)
    private String descricao;

    @Column(columnDefinition = "numeric(14,2)", nullable = false)
    private double valor;

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Date dataInicio;

    @Temporal(TemporalType.DATE)
    private Date dataFim;

    public PriceRange() {
    }

    public PriceRange(String descricao, double valor, Date dataInicio, Date dataFim) {
        this.descricao = descricao;
        this.valor = valor;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

    public Date getDataInicio() {
        return dataInicio;
    }

    public void setDataInicio(Date dataInicio) {
        this.dataInicio = dataInicio;
    }

    public Date getDataFim() {
        return dataFim;
    }

    public void setDataFim(Date dataFim) {
        this.dataFim = dataFim;
    }
}
