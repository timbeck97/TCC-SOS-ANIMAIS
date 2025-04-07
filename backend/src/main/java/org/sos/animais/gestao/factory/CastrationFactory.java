package org.sos.animais.gestao.factory;

import org.sos.animais.gestao.enums.ERequestSituation;
import org.sos.animais.gestao.model.Castration;

import java.util.Date;

public class CastrationFactory {
    Castration c;

    public static CastrationFactory create(){
        return new CastrationFactory();
    }

    public CastrationFactory() {
        this.c = new Castration();
    }
    public CastrationFactory withId(Long id){
        this.c.setId(id);
        return this;
    }
    public CastrationFactory withData(Date data){
        this.c.setData(data);
        return this;
    }
    public CastrationFactory withSituacao(ERequestSituation situacao){
        this.c.setSituacao(situacao);
        return this;
    }
    public CastrationFactory withObservacao(String observacao){
        this.c.setObservacao(observacao);
        return this;
    }
    public Castration build(){
        return this.c;
    }
}
