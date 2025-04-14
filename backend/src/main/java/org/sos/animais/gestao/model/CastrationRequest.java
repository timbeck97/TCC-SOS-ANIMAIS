package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.*;

import java.util.Date;


@Entity
public class CastrationRequest {
    @Id
    @SequenceGenerator(name = "SEQ_WAITING_LIST", sequenceName = "waitinglist_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_WAITING_LIST")
    private long id;
    @Column(length = 100, nullable = false)
    private String nome;
    @Column(length = 100, nullable = false)
    private String sobrenome;
    @Column(length = 11, nullable = false)
    private String cpf;
    @Column(length = 100, nullable = false)
    private String telefone;
    @Column(length = 100)
    private String rua;
    @Column(length = 50)
    private String bairro;
    @Column(length = 50)
    private String numero;
    @Enumerated(EnumType.STRING)
    @Column(length = 15, nullable = false)
    private EAnimalType tipoAnimal;
    @Column(length = 100, nullable = false)
    private String nomeAnimal;
    @Column(length = 100)
    private String racaAnimal;
    @Column(columnDefinition = "numeric(15,2) default 0.0")
    private double pesoAnimal;
    @Enumerated(EnumType.STRING)
    @Column(length = 20, nullable = false)
    private EAnimalSize porteAnimal;
    @Column(columnDefinition = "text")
    private String descricaoAnimal;
    @Column(columnDefinition = "boolean not null default false")
    private boolean animalVacinado;
    @Column(length = 20, nullable = false)
    @Enumerated(EnumType.STRING)
    private ERequestSituation situacao;
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataSolicitacao;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private EPaymentMethod formaPagamento;
    @Column(columnDefinition = "boolean not null default false")
    private boolean paga;
    @ManyToOne
    private Castration castracao;
    @Column(columnDefinition = "text")
    private String observacoes;
    @Enumerated(EnumType.STRING)
    @Column(length = 6, nullable = false)
    private EAnimalGender generoAnimal;
    @ManyToOne
    private PriceRange faixaPreco;

    public CastrationRequest() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public EAnimalType getTipoAnimal() {
        return tipoAnimal;
    }

    public void setTipoAnimal(EAnimalType tipoAnimal) {
        this.tipoAnimal = tipoAnimal;
    }

    public String getNomeAnimal() {
        return nomeAnimal;
    }

    public void setNomeAnimal(String nomeAnimal) {
        this.nomeAnimal = nomeAnimal;
    }

    public String getRacaAnimal() {
        return racaAnimal;
    }

    public void setRacaAnimal(String racaAnimal) {
        this.racaAnimal = racaAnimal;
    }

    public double getPesoAnimal() {
        return pesoAnimal;
    }

    public void setPesoAnimal(double pesoAnimal) {
        this.pesoAnimal = pesoAnimal;
    }

    public EAnimalSize getPorteAnimal() {
        return porteAnimal;
    }

    public void setPorteAnimal(EAnimalSize porteAnimal) {
        this.porteAnimal = porteAnimal;
    }

    public String getDescricaoAnimal() {
        return descricaoAnimal;
    }

    public void setDescricaoAnimal(String descricaoAnimal) {
        this.descricaoAnimal = descricaoAnimal;
    }

    public boolean isAnimalVacinado() {
        return animalVacinado;
    }

    public void setAnimalVacinado(boolean animalVacinado) {
        this.animalVacinado = animalVacinado;
    }

    public ERequestSituation getSituacao() {
        return situacao;
    }

    public void setSituacao(ERequestSituation situacao) {
        this.situacao = situacao;
    }

    public Castration getCastracao() {
        return castracao;
    }

    public void setCastracao(Castration castracao) {
        this.castracao = castracao;
    }

    public Date getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Date dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public EPaymentMethod getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(EPaymentMethod formaPagamento) {
        this.formaPagamento = formaPagamento;
    }

    public PriceRange getFaixaPreco() {
        return faixaPreco;
    }

    public void setFaixaPreco(PriceRange faixaPreco) {
        this.faixaPreco = faixaPreco;
    }

    public boolean isPaga() {
        return paga;
    }

    public void setPaga(boolean paga) {
        this.paga = paga;
    }

    public String getObservacoes() {
        return observacoes;
    }

    public void setObservacoes(String observacoes) {
        this.observacoes = observacoes;
    }

    public EAnimalGender getGeneroAnimal() {
        return generoAnimal;
    }

    public void setGeneroAnimal(EAnimalGender generoAnimal) {
        this.generoAnimal = generoAnimal;
    }
    public String getNomeFormatado(){
        if(nome==null || sobrenome==null){
            return "";
        }
        StringBuffer sb = new StringBuffer();
        sb.append(nome.substring(0,1).toUpperCase());
        sb.append(nome.substring(1).toLowerCase());
        sb.append(" ");
        sb.append(sobrenome.substring(0,1).toUpperCase());
        sb.append(sobrenome.substring(1).toLowerCase());
        return sb.toString();
    }
}
