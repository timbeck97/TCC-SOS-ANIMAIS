package org.sos.animais.gestao.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(uniqueConstraints={@UniqueConstraint(columnNames={"dataAcesso","ip","path"})})
public class AccessLog {
    @Id
    @SequenceGenerator(name = "SEQ_ACCESS_LOG", sequenceName = "access_log_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_ACCESS_LOG")
    private long id;

    @Temporal(TemporalType.DATE)
    private Date dataAcesso;

    private String ip;

    @Column(length = 255)
    private String path;

    private int quantidade;

    public AccessLog() {
    }

    public AccessLog(Date dataAcesso, String ip, String path) {
        this.dataAcesso = dataAcesso;
        this.ip = ip;
        this.path = path;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDataAcesso() {
        return dataAcesso;
    }

    public void setDataAcesso(Date dataAcesso) {
        this.dataAcesso = dataAcesso;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
    public void addQuantidade() {
        this.quantidade++;
    }
}
