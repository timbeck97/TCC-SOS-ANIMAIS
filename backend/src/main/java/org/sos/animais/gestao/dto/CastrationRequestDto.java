package org.sos.animais.gestao.dto;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import org.sos.animais.gestao.enums.*;
import org.sos.animais.gestao.model.CastrationRequest;

import java.util.Date;

public class CastrationRequestDto {

    private long id;
    @NotBlank
    private String nome;
    @NotBlank
    private String sobrenome;
    @NotBlank
    private String cpf;
    @NotBlank
    private String telefone;
    @NotBlank
    private String rua;
    @NotBlank
    private String bairro;
    @NotBlank
    private String numero;
    @NotNull
    private EAnimalType tipoAnimal;
    @NotBlank
    private String nomeAnimal;
    private String racaAnimal;
    private double pesoAnimal;
    @NotNull
    private EAnimalSize porteAnimal;
    private String descricaoAnimal;
    private boolean animalVacinado;
    @NotNull
    private EPaymentMethod formaPagamento;
    private String observacoes;
    @NotNull
    private EAnimalGender generoAnimal;
    private Long idFaixa;
    public CastrationRequestDto() {
    }

    public CastrationRequestDto(CastrationRequest c) {
        this.id = c.getId();
        this.nome = c.getNome();
        this.sobrenome = c.getSobrenome();
        this.cpf = c.getCpf();
        this.telefone = c.getTelefone();
        this.rua = c.getRua();
        this.bairro = c.getBairro();
        this.numero = c.getNumero();
        this.tipoAnimal = c.getTipoAnimal();
        this.nomeAnimal = c.getNomeAnimal();
        this.racaAnimal = c.getRacaAnimal();
        this.pesoAnimal = c.getPesoAnimal();
        this.porteAnimal = c.getPorteAnimal();
        this.descricaoAnimal = c.getDescricaoAnimal();
        this.animalVacinado = c.isAnimalVacinado();

        this.formaPagamento = c.getFormaPagamento();
        this.observacoes=c.getObservacoes();
        this.generoAnimal=c.getGeneroAnimal();
        if(c.getFaixaPreco()!=null){
            this.idFaixa = c.getFaixaPreco().getId();
        }
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

    public EPaymentMethod getFormaPagamento() {
        return formaPagamento;
    }

    public void setFormaPagamento(EPaymentMethod formaPagamento) {
        this.formaPagamento = formaPagamento;
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

    public Long getIdFaixa() {
        return idFaixa;
    }

    public void setIdFaixa(Long idFaixa) {
        this.idFaixa = idFaixa;
    }
}
