package org.sos.animais.gestao.controller;

import org.sos.animais.gestao.dto.DashboardCards;
import org.sos.animais.gestao.dto.DashboardsDto;
import org.sos.animais.gestao.enums.EPaymentMethod;
import org.sos.animais.gestao.repository.CastrationRequestRepository;
import org.sos.animais.gestao.service.Utils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    private final CastrationRequestRepository castrationRequestRepository;

    public DashboardController(CastrationRequestRepository castrationRequestRepository) {
        this.castrationRequestRepository = castrationRequestRepository;
    }

    @GetMapping
    public DashboardsDto getData(@RequestParam String startDate, @RequestParam String endDate) {
        Date initialDate = Utils.getFirstDyByCompetencia(startDate);
        Date finalDate = Utils.getLastDyByCompetencia(endDate);
        List<Object> dadosLineChar = castrationRequestRepository.countByData(initialDate, finalDate);
        DashboardsDto dashboardsDto = new DashboardsDto();
        for (Object dado : dadosLineChar) {
            Object[] obj = (Object[]) dado;
            dashboardsDto.getLineChart().getLabels().add(Utils.formateCompetencia((String) obj[1]));
            dashboardsDto.getLineChart().getValues().add(String.valueOf((Long) obj[0]));
        }
        List<Object> dadosBarChart = castrationRequestRepository.countByPaymentMethod(initialDate, finalDate);
        for (Object dado : dadosBarChart) {
            Object[] obj = (Object[]) dado;
            dashboardsDto.getBarChart().getLabels().add(EPaymentMethod.valueOf((String) obj[1]).getDescricao());
            dashboardsDto.getBarChart().getValues().add(String.valueOf((Long) obj[0]));
        }
        List<Object> dadosPieChart = castrationRequestRepository.sumPaymentPercent(initialDate, finalDate);
        for (Object dado : dadosPieChart) {
            Object[] obj = (Object[]) dado;
            double valorSos=((Number) obj[0]).doubleValue();
            double valorPopulacao= ((Number) obj[1]).doubleValue();
            double total= ((Number) obj[2]).doubleValue();
            double percentSos=total>0?valorSos/total*100:0;
            double percentPopulacao=total>0?valorPopulacao/total*100:0;
            dashboardsDto.getPieChart().getValues().add(String.valueOf(percentSos));
            dashboardsDto.getPieChart().getValues().add(String.valueOf(percentPopulacao));
            dashboardsDto.getPieChart().getLabels().add("Pago pela SOS Animais");
            dashboardsDto.getPieChart().getLabels().add("Pago pela população");
        }
        Object dadosCards = castrationRequestRepository.countTotalCards(initialDate, finalDate);
        long totalDogs = ((Number) ((Object[]) dadosCards)[0]).longValue();
        long totalCats = ((Number) ((Object[]) dadosCards)[1]).longValue();
        long totalAnimals = ((Number) ((Object[]) dadosCards)[2]).longValue();
        double averageDays = ((Number) ((Object[]) dadosCards)[3]).doubleValue();
        dashboardsDto.setTotalCards(new DashboardCards(totalDogs, totalCats, totalAnimals, averageDays));
        return dashboardsDto;
    }

}
