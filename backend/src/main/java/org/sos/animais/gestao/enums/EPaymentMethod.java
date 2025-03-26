package org.sos.animais.gestao.enums;

public enum EPaymentMethod {
    PIX("Pix"),
    DINHEIRO("Dinheiro"),
    CASTRACAO_SOLIDARIA("Castração Solidária");

    private String descricao;

    EPaymentMethod(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
}
