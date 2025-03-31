package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.dto.NotificationDto;
import org.sos.animais.gestao.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("select new org.sos.animais.gestao.dto.NotificationDto(n) from Notification n where n.lida is false order by n.data desc limit 5")
    List<NotificationDto> findAllByLidaIsFalseOrderByDataDesc();
    @Query("select new org.sos.animais.gestao.dto.NotificationDto(n) from Notification n order by n.data desc")
    List<NotificationDto> findAllDto();
}
