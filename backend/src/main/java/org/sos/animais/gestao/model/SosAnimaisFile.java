package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.EFileOrigin;
import org.sos.animais.gestao.enums.EFileType;

import java.io.Serializable;

@Entity
public class SosAnimaisFile implements Serializable {
    @Id
    @SequenceGenerator(name = "SEQ_FILE", sequenceName = "file_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_FILE")
    private long id;
    @Column(columnDefinition = "text")
    private String name;
    @Column(columnDefinition = "text")
    private String originalName;
    @Column(columnDefinition = "varchar(500)")
    private String url;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "varchar(20)")
    private EFileOrigin origin;
    @Column(columnDefinition = "varchar(30)")
    private String folder;

    public SosAnimaisFile() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getOriginalName() {
        return originalName;
    }

    public void setOriginalName(String originalName) {
        this.originalName = originalName;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public EFileOrigin getOrigin() {
        return origin;
    }

    public void setOrigin(EFileOrigin origin) {
        this.origin = origin;
    }

    public String getFolder() {
        return folder;
    }

    public void setFolder(String folder) {
        this.folder = folder;
    }
}
