package org.sos.animais.gestao.service.report;

import org.sos.animais.gestao.model.Castration;

public interface ReportService {

    byte[] generateReport(Castration castrtion);
}
