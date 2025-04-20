package org.sos.animais.gestao.dto;

import org.sos.animais.gestao.enums.EFileType;
import org.sos.animais.gestao.model.CastrationFile;
import org.sos.animais.gestao.model.CastrationRequest;
import org.sos.animais.gestao.service.Utils;

import java.util.Date;

public class CastrationRequestReturnDTO extends CastrationRequestDto{
    private String nomeRequerente;
    private Date dataSolicitacao;
    private String urlImagem;
    private String urlComprovante;
    private boolean paga;
    private String descricaoFaixa;
    private boolean faixaAtiva;
    private double valorFaixa;

    public CastrationRequestReturnDTO() {
    }
    public CastrationRequestReturnDTO(CastrationRequest c) {
        super(c);
        this.dataSolicitacao = c.getDataSolicitacao();
        this.paga = c.isPaga();
        this.nomeRequerente = c.getNome()+" "+c.getSobrenome();
        for (CastrationFile arq : c.getArquivos()) {
            if (arq.getTipoArquivo().equals(EFileType.FOTO)) {
                this.urlImagem = arq.getUrl();
            } else if (arq.getTipoArquivo().equals(EFileType.COMPROVANTE_PAGAMENTO)) {
                this.urlComprovante = arq.getUrl();
            }
        }
        if(c.getFaixaPreco()!=null){
            this.descricaoFaixa = c.getFaixaPreco().getDescricao();
            this.faixaAtiva= c.getFaixaPreco().getDataFim()==null || Utils.isDateBetween(new Date(),c.getFaixaPreco().getDataInicio(), c.getFaixaPreco().getDataFim());
            this.valorFaixa=c.getFaixaPreco().getValor();
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

    public String getDescricaoFaixa() {
        return descricaoFaixa;
    }

    public void setDescricaoFaixa(String descricaoFaixa) {
        this.descricaoFaixa = descricaoFaixa;
    }

    public boolean isFaixaAtiva() {
        return faixaAtiva;
    }

    public void setFaixaAtiva(boolean faixaAtiva) {
        this.faixaAtiva = faixaAtiva;
    }

    public double getValorFaixa() {
        return valorFaixa;
    }

    public void setValorFaixa(double valorFaixa) {
        this.valorFaixa = valorFaixa;
    }
}
