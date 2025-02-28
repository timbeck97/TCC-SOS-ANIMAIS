package org.sos.animais.gestao.model;

import jakarta.persistence.*;

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

    public PriceRange() {
    }

    public PriceRange(String descricao, double valor) {
        this.descricao = descricao;
        this.valor = valor;
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
}
