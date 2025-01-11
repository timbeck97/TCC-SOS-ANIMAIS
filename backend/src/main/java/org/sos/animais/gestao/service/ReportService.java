package org.sos.animais.gestao.service;

import org.sos.animais.gestao.model.Castration;
import org.springframework.core.io.Resource;

public interface ReportService {

    byte[] generateReport(Castration castrtion);
}
