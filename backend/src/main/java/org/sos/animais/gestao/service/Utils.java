package org.sos.animais.gestao.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class Utils {

    private static final SimpleDateFormat sdfCompetencia = new SimpleDateFormat("yyyyMM");
    private static final SimpleDateFormat sdfCompetenciaFmt = new SimpleDateFormat("MMM/yyyy");

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
    public static String formateCompetencia(String competencia) {
        System.out.println(competencia);
        if (competencia == null || competencia.length() != 6) {
            return "";
        }
        String mes = competencia.substring(4);
        String nomeMes = getNomeMesAbrev(mes);
        System.out.println(nomeMes);
        return nomeMes + "/" + competencia.substring(0, 4);
    }
}
