package org.sos.animais.gestao.service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import org.sos.animais.gestao.model.Castration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

@Service
public class JasperReportImp implements ReportService {

    private final DataSource dataSource;

    public JasperReportImp(DataSource dataSource) {
        this.dataSource = dataSource;
    }


    public byte[] generateReport(Castration castration) {


        // Get database connection
        try (Connection connection = dataSource.getConnection()) {
            InputStream reportStream = new FileInputStream(new File("/opt/sosreports/castration.jasper"));
            Map<String, Object> parameters = new HashMap<>();
            parameters.put("P_CASTRATION_ID", castration.getId());
            JasperPrint jasperPrint = JasperFillManager.fillReport(reportStream, parameters, connection);
            return JasperExportManager.exportReportToPdf(jasperPrint);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } catch (JRException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
