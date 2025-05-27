package org.sos.animais.gestao.model;

import jakarta.persistence.*;

@Entity
public class AdoptionImage {
    @Id
    @SequenceGenerator(name = "SEQ_ADOPTION_FILE", sequenceName = "adoption_file_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ADOPTION_FILE")
    private long id;
    @ManyToOne
    private AdoptionAnimal adoption;
    @ManyToOne
    private SosAnimaisFile file;
    @Column(columnDefinition = "boolean default false")
    private boolean principal;

    public AdoptionImage() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public AdoptionAnimal getAdoption() {
        return adoption;
    }

    public void setAdoption(AdoptionAnimal adoption) {
        this.adoption = adoption;
    }

    public SosAnimaisFile getFile() {
        return file;
    }

    public void setFile(SosAnimaisFile file) {
        this.file = file;
    }

    public boolean isPrincipal() {
        return principal;
    }

    public void setPrincipal(boolean principal) {
        this.principal = principal;
    }
}
