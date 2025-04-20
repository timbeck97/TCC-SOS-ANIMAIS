package org.sos.animais.gestao.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Utils {

    private static final SimpleDateFormat sdfCompetencia = new SimpleDateFormat("yyyyMM");
    private static final SimpleDateFormat sdfCompetenciaFmt = new SimpleDateFormat("MMM/yyyy");
    private static final SimpleDateFormat sdf_dd_mm_yyyy = new SimpleDateFormat("dd/MM/yyyy");

    public static Date getFirstDyByCompetencia(String competencia){
        try {
            return sdfCompetencia.parse(competencia);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    public static Date getLastDyByCompetencia(String competencia){
        Date data = null;
        try {
            data = sdfCompetencia.parse(competencia);
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(data);
        calendar.set(Calendar.DAY_OF_MONTH, calendar.getActualMaximum(Calendar.DAY_OF_MONTH));

        return calendar.getTime();
    }
    public static Date getDate(int day, int month, int year){
        Date data = null;
        try {
            String dataStr = String.format("%02d/%02d/%04d", day, month, year);
            data = sdf_dd_mm_yyyy.parse(dataStr);
            return data;
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
    }
    public static String getNomeMesAbrev(String stringMes) {
        int mes = Integer.parseInt(stringMes);
        switch (mes) {
            case 1:
                return "Jan";
            case 2:
                return "Fev";
            case 3:
                return "Mar";
            case 4:
                return "Abr";
            case 5:
                return "Mai";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Ago";
            case 9:
                return "Set";
            case 10:
                return "Out";
            case 11:
                return "Nov";
            case 12:
                return "Dez";
        }
        return stringMes;
    }
    public static boolean isDateBetween(Date data, Date dataInicio, Date dataFim) {
        if (data == null || dataInicio == null || dataFim == null) {
            return false;
        }
        data = clearHours(data);
        dataInicio = clearHours(dataInicio);
        dataFim = clearHours(dataFim);
        return !data.before(dataInicio) && !data.after(dataFim);
    }
    public static Date clearHours(Date data) {
        Calendar cal = Calendar.getInstance();
        cal.setTime(data);
        cal.set(Calendar.HOUR_OF_DAY, 0);
        cal.set(Calendar.MINUTE, 0);
        cal.set(Calendar.SECOND, 0);
        return cal.getTime();
    }
    public static String formateCompetencia(String competencia) {
        if (competencia == null || competencia.length() != 6) {
            return "";
        }
        String mes = competencia.substring(4);
        String nomeMes = getNomeMesAbrev(mes);
        return nomeMes + "/" + competencia.substring(0, 4);
    }
    public static String convertObjectToJson(Object object){
        ObjectMapper mapper = new ObjectMapper();
        try {
            String jsonFormatado = mapper
                    .writeValueAsString(object);
            return jsonFormatado;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
}
