package org.sos.animais.gestao.service;

import jakarta.servlet.http.HttpServletRequest;
import org.sos.animais.gestao.model.AccessLog;
import org.sos.animais.gestao.repository.AccessLogRepository;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class LogService {


    private final AccessLogRepository accessLogRepository;

    public LogService(AccessLogRepository accessLogRepository) {
        this.accessLogRepository = accessLogRepository;
    }
    public void logAccess(String path, String ip){
        Date dataAcesso = new Date();
        AccessLog log = accessLogRepository.findByDataAcessoAndIpAndPath(dataAcesso, ip, path).orElse(new AccessLog(dataAcesso, ip, path));
        log.addQuantidade();
        accessLogRepository.save(log);
    }
}
