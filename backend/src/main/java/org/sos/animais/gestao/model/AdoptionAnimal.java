package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.EAdoptionSituation;
import org.sos.animais.gestao.enums.EAnimalGender;
import org.sos.animais.gestao.enums.EAnimalSize;

import java.util.ArrayList;
import java.util.List;

@Entity
public class AdoptionAnimal {
    @Id
    @SequenceGenerator(name = "SEQ_ADOPTION", sequenceName = "adoption_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ADOPTION")
    private long id;

    @Column(columnDefinition = "varchar(40)")
    private String nome;
    @Column(columnDefinition = "text")
    private String descricao;
    @Column(columnDefinition = "varchar(30)")
    private String idade;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private EAnimalSize porte;
    @Column(columnDefinition = "varchar(30)")
    private String raca;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private EAnimalGender genero;
    @Column(length = 15)
    private String telefone;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private EAdoptionSituation situacao;
    @OneToMany(mappedBy = "adoption", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("id ASC")
    private List<AdoptionImage> imagens;

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

    public List<AdoptionImage> getImagens() {
        if(imagens==null){
            imagens = new ArrayList<>();
        }
        return imagens;
    }

    public void setImagens(List<AdoptionImage> imagens) {
        this.imagens = imagens;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }
}
