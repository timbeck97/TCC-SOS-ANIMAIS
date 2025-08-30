package org.sos.animais.gestao.repository;

import org.sos.animais.gestao.model.AccessLog;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.Optional;

public interface AccessLogRepository extends JpaRepository<AccessLog, Long> {

    Optional<AccessLog> findByDataAcessoAndIpAndPath(Date dataAcesso, String ip, String path);
}
