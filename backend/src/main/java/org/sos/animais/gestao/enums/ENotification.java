package org.sos.animais.gestao.enums;

import java.text.MessageFormat;
import java.util.function.Function;

public enum ENotification{
    CASTRATION_REQUEST_CREATED("Nova solicitação de castração registrada por {0}"),
    ;

    private String message;

    ENotification(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
    public String getMessage(String... args) {
        return MessageFormat.format(message, args);
    }
}
