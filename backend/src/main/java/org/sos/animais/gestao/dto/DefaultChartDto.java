package org.sos.animais.gestao.dto;

import java.util.ArrayList;
import java.util.List;

public class DefaultChartDto {

    private List<String> labels;
    private List<String> values;


    public List<String> getLabels() {
        if(labels==null){
            labels = new ArrayList<>();
        }
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<String> getValues() {
        if(values==null){
            values = new ArrayList<>();
        }
        return values;
    }

    public void setValues(List<String> values) {
        this.values = values;
    }
}
