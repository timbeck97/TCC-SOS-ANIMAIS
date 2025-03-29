package org.sos.animais.gestao.service;

import org.sos.animais.gestao.config.AutenticationService;
import org.sos.animais.gestao.dto.NotificationDto;
import org.sos.animais.gestao.dto.UserDto;
import org.sos.animais.gestao.enums.ENotification;
import org.sos.animais.gestao.model.Notification;
import org.sos.animais.gestao.repository.NotificationRepository;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }
    public List<NotificationDto> findAll(){
        return notificationRepository.findAllByLidaIsFalseOrderByDataDesc();
    }
    public List<NotificationDto> markAsRead(Long id){
        UserDto user = AutenticationService.getUser();
        notificationRepository.findById(id).map(notification -> {
            notification.setLida(true);
            notification.setUsuario(user.userName());
            notification=notificationRepository.save(notification);
            return notification;
        }).orElseThrow(()->new RuntimeException("Notification not found"));
        return findAll();
    }
    public Notification createNotification(ENotification tipo, String... args){
        Notification notification = new Notification();
        notification.setMensagem(tipo.getMessage(args));
        notification.setTipo(tipo);
        notification.setData(new Date());
        return notificationRepository.save(notification);
    }

}
