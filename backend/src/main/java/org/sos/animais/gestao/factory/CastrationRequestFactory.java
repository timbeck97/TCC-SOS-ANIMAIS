package org.sos.animais.gestao.factory;

import org.sos.animais.gestao.dto.CastrationRequestDto;
import org.sos.animais.gestao.enums.EAnimalSize;
import org.sos.animais.gestao.enums.EAnimalType;
import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.model.CastrationRequest;

public class CastrationRequestFactory {

    CastrationRequest castrationRequest;

    public CastrationRequestFactory(){
        this.castrationRequest = new CastrationRequest();
    }
    public static CastrationRequestFactory init(){;
        return new CastrationRequestFactory();
    }
    public CastrationRequestFactory withEntity(CastrationRequest r){
        this.castrationRequest = r;
        return this;
    }
    public CastrationRequestFactory withId(long id){
        this.castrationRequest.setId(id);
        return this;
    }
    public CastrationRequestFactory withNome(String nome){
        this.castrationRequest.setNome(nome);
        return this;
    }
    public CastrationRequestFactory withSobrenome(String sobrenome){
        this.castrationRequest.setSobrenome(sobrenome);
        return this;
    }
    public CastrationRequestFactory withCpf(String cpf){
        this.castrationRequest.setCpf(cpf);
        return this;
    }
    public CastrationRequestFactory withTelefone(String telefone){
        this.castrationRequest.setTelefone(telefone);
        return this;
    }
    public CastrationRequestFactory withRua(String rua){
        this.castrationRequest.setRua(rua);
        return this;
    }
    public CastrationRequestFactory withBairro(String bairro){
        this.castrationRequest.setBairro(bairro);
        return this;
    }
    public CastrationRequestFactory withNumero(String numero){
        this.castrationRequest.setNumero(numero);
        return this;
    }
    public CastrationRequestFactory withTipoAnimal(EAnimalType tipoAnimal){
        this.castrationRequest.setTipoAnimal(tipoAnimal);
        return this;
    }
    public CastrationRequestFactory withNomeAnimal(String nomeAnimal){
        this.castrationRequest.setNomeAnimal(nomeAnimal);
        return this;
    }
    public CastrationRequestFactory withRacaAnimal(String racaAnimal){
        this.castrationRequest.setRacaAnimal(racaAnimal);
        return this;
    }
    public CastrationRequestFactory withPesoAnimal(double pesoAnimal){
        this.castrationRequest.setPesoAnimal(pesoAnimal);
        return this;
    }
    public CastrationRequestFactory withPorteAnimal(EAnimalSize porteAnimal){
        this.castrationRequest.setPorteAnimal(porteAnimal);
        return this;
    }
    public CastrationRequestFactory withDescricaoAnimal(String descricaoAnimal){
        this.castrationRequest.setDescricaoAnimal(descricaoAnimal);
        return this;
    }
    public CastrationRequestFactory withAnimalVacinado(boolean animalVacinado){
        this.castrationRequest.setAnimalVacinado(animalVacinado);
        return this;
    }
    public CastrationRequestFactory withSituacao(ERequestSituation situacao){
        this.castrationRequest.setSituacao(situacao);
        return this;
    }
    public CastrationRequestFactory withDto(CastrationRequestDto dto){
        this.castrationRequest.setNome(dto.getNome());
        this.castrationRequest.setSobrenome(dto.getSobrenome());
        this.castrationRequest.setCpf(dto.getCpf());
        this.castrationRequest.setTelefone(dto.getTelefone());
        this.castrationRequest.setRua(dto.getRua());
        this.castrationRequest.setBairro(dto.getBairro());
        this.castrationRequest.setNumero(dto.getNumero());
        this.castrationRequest.setTipoAnimal(dto.getTipoAnimal());
        this.castrationRequest.setNomeAnimal(dto.getNomeAnimal());
        this.castrationRequest.setRacaAnimal(dto.getRacaAnimal());
        this.castrationRequest.setPesoAnimal(dto.getPesoAnimal());
        this.castrationRequest.setPorteAnimal(dto.getPorteAnimal());
        this.castrationRequest.setDescricaoAnimal(dto.getDescricaoAnimal());
        this.castrationRequest.setAnimalVacinado(dto.isAnimalVacinado());
        this.castrationRequest.setFormaPagamento(dto.getFormaPagamento());
        return this;
    }
    public CastrationRequest build(){
        return this.castrationRequest;
    }
}
