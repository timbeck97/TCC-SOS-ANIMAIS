package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.EFileType;

@Entity
public class CastrationFile {
    @Id
    @SequenceGenerator(name = "SEQ_CASTRATION_FILE", sequenceName = "castration_file_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CASTRATION_FILE")
    private long id;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(40)")
    private EFileType tipoArquivo;
    @ManyToOne
    private CastrationRequest castrationRequest;

    @ManyToOne
    private SosAnimaisFile file;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public EFileType getTipoArquivo() {
        return tipoArquivo;
    }

    public void setTipoArquivo(EFileType tipoArquivo) {
        this.tipoArquivo = tipoArquivo;
    }

    public CastrationRequest getCastrationRequest() {
        return castrationRequest;
    }

    public void setCastrationRequest(CastrationRequest castrationRequest) {
        this.castrationRequest = castrationRequest;
    }

    public SosAnimaisFile getFile() {
        return file;
    }

    public void setFile(SosAnimaisFile file) {
        this.file = file;
    }
}
