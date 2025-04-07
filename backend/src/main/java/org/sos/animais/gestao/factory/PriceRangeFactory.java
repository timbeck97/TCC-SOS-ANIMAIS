package org.sos.animais.gestao.factory;

import org.sos.animais.gestao.model.PriceRange;

public class PriceRangeFactory {
    PriceRange p;

    public PriceRangeFactory(){
        this.p = new PriceRange();
    }
    public static PriceRangeFactory init(){
        return new PriceRangeFactory();
    }
    public PriceRangeFactory withId(long id){
        this.p.setId(id);
        return this;
    }
    public PriceRangeFactory withValor(double valor){
        this.p.setValor(valor);
        return this;
    }
    public PriceRangeFactory withDescricao(String descricao){
        this.p.setDescricao(descricao);
        return this;
    }
    public PriceRange build(){
        return this.p;
    }

}
