package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.NotificationDto;
import org.sos.animais.gestao.model.Notification;
import org.sos.animais.gestao.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notification")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @GetMapping
    public ResponseEntity<List<NotificationDto>> findAll(){
        return ResponseEntity.ok(notificationService.findAll());
    }
    @PutMapping("/{id}/markAsRead")
    public ResponseEntity<List<NotificationDto>> markAsRead(@PathVariable Long id){
        return ResponseEntity.ok(notificationService.markAsRead(id));
    }
}
