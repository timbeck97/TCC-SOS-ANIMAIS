package org.sos.animais.gestao.model;

import jakarta.persistence.*;
import org.sos.animais.gestao.enums.ENotification;

import java.util.Date;

@Entity
public class Notification {
    @Id
    @SequenceGenerator(name = "SEQ_CASTRATION", sequenceName = "castration_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CASTRATION")
    private long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date data;
    @Column(columnDefinition = "text")
    private String mensagem;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false, length = 30)
    private ENotification tipo;

    @Column(columnDefinition = "boolean not null default false")
    private boolean lida;

    @Temporal(TemporalType.TIMESTAMP)
    private Date dataLeitura;

    @Column(length = 100)
    private String usuario;


    public Notification() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public String getMensagem() {
        return mensagem;
    }

    public void setMensagem(String mensagem) {
        this.mensagem = mensagem;
    }

    public ENotification getTipo() {
        return tipo;
    }

    public void setTipo(ENotification tipo) {
        this.tipo = tipo;
    }

    public boolean isLida() {
        return lida;
    }

    public void setLida(boolean lida) {
        this.lida = lida;
    }

    public Date getDataLeitura() {
        return dataLeitura;
    }

    public void setDataLeitura(Date dataLeitura) {
        this.dataLeitura = dataLeitura;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}
