package org.sos.animais.gestao.dto;

import jakarta.validation.constraints.NotNull;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalSize;
import org.sos.animais.gestao.model.AdoptionAnimal;
import org.sos.animais.gestao.model.AdoptionImage;

import java.util.List;

public class AdoptionAnimalDto {

    private Long id;
    @NotNull
    private String nome;
    @NotNull
    private String descricao;
    @NotNull
    private String idade;
    @NotNull
    private EAnimalSize porte;
    @NotNull
    private String raca;
    private String telefone;
    @NotNull
    private EAnimalGender genero;
    private EAdoptionSituation situacao;
    private List<AdoptionImageDto> imagens;

    public AdoptionAnimalDto() {
    }

    public AdoptionAnimalDto(AdoptionAnimal a) {
        this.id = a.getId();
        this.nome = a.getNome();
        this.descricao = a.getDescricao();
        this.idade = a.getIdade();
        this.porte = a.getPorte();
        this.raca = a.getRaca();
        this.genero = a.getGenero();
        this.situacao = a.getSituacao();
        this.telefone = a.getTelefone();
        this.imagens = a.getImagens().stream().map(AdoptionImageDto::new).toList();
    }
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getIdade() {
        return idade;
    }

    public void setIdade(String idade) {
        this.idade = idade;
    }

    public EAnimalSize getPorte() {
        return porte;
    }

    public void setPorte(EAnimalSize porte) {
        this.porte = porte;
    }

    public String getRaca() {
        return raca;
    }

    public void setRaca(String raca) {
        this.raca = raca;
    }

    public EAnimalGender getGenero() {
        return genero;
    }

    public void setGenero(EAnimalGender genero) {
        this.genero = genero;
    }

    public EAdoptionSituation getSituacao() {
        return situacao;
    }

    public void setSituacao(EAdoptionSituation situacao) {
        this.situacao = situacao;
    }

    public List<AdoptionImageDto> getImagens() {
        return imagens;
    }

    public void setImagens(List<AdoptionImageDto> imagens) {
        this.imagens = imagens;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
