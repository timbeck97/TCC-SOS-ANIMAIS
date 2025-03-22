package org.sos.animais.gestao.enums;

public enum EAnimalGender {

    MACHO("Macho"),
    FEMEA("Fêmea");

    private final String value;

    EAnimalGender(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
