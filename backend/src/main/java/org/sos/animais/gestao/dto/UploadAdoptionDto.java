package org.sos.animais.gestao.dto;

import jakarta.validation.constraints.NotNull;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalSize;

import java.util.List;

public class UploadAdoptionDto {
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
    @NotNull
    private EAnimalGender genero;
    @NotNull
    private String telefone;
    private EAdoptionSituation situacao;
    private boolean alterouImagem;
    private List<UploadImageDto> files;

    public UploadAdoptionDto() {
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

    public boolean isAlterouImagem() {
        return alterouImagem;
    }

    public void setAlterouImagem(boolean alterouImagem) {
        this.alterouImagem = alterouImagem;
    }

    public List<UploadImageDto> getFiles() {
        return files;
    }

    public void setFiles(List<UploadImageDto> files) {
        this.files = files;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
