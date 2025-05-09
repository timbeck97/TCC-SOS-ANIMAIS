package org.sos.animais.gestao.dto;

import org.sos.animais.gestao.enums.ENotification;
import org.sos.animais.gestao.model.Notification;
import org.sos.animais.gestao.service.AutenticationService;

import java.util.Date;

public record NotificationDto(Long id, String mensagem, ENotification tipo, Date data, boolean lida, String usuario, Date dataLeitura) {
    public NotificationDto(Notification notification) {
        this(notification.getId(), notification.getMensagem(), notification.getTipo(), notification.getData(), notification.isLida(), notification.getUsuario(), notification.getDataLeitura());
    }
}