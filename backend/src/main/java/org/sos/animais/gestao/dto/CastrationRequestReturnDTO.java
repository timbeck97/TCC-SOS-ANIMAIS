package org.sos.animais.gestao.dto;

import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;

import java.util.Date;

public class CastrationRequestReturnDTO extends CastrationRequestDto{
    private String nomeRequerente;
    private Date dataSolicitacao;
    private String urlImagem;
    private String urlComprovante;
    private boolean paga;

    public CastrationRequestReturnDTO() {
    }
    public CastrationRequestReturnDTO(CastrationRequest c) {
        super(c);
        this.dataSolicitacao = c.getDataSolicitacao();
        this.paga = c.isPaga();
        this.nomeRequerente = c.getNome()+" "+c.getSobrenome();
        for (CastrationFile arq : c.getArquivos()) {
            if (arq.getTipoArquivo().equals("IMAGEM")) {
                this.urlImagem = arq.getUrl();
            } else if (arq.getTipoArquivo().equals("COMPROVANTE")) {
                this.urlComprovante = arq.getUrl();
            }
        }

    }

    public String getNomeRequerente() {
        return nomeRequerente;
    }

    public void setNomeRequerente(String nomeRequerente) {
        this.nomeRequerente = nomeRequerente;
    }

    public Date getDataSolicitacao() {
        return dataSolicitacao;
    }

    public void setDataSolicitacao(Date dataSolicitacao) {
        this.dataSolicitacao = dataSolicitacao;
    }

    public String getUrlImagem() {
        return urlImagem;
    }

    public void setUrlImagem(String urlImagem) {
        this.urlImagem = urlImagem;
    }

    public String getUrlComprovante() {
        return urlComprovante;
    }

    public void setUrlComprovante(String urlComprovante) {
        this.urlComprovante = urlComprovante;
    }

    public boolean isPaga() {
        return paga;
    }

    public void setPaga(boolean paga) {
        this.paga = paga;
    }
}
