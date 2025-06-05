package org.sos.animais.gestao.service.telegram;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Service
public class TelegramBot {

    @Value("${telegram.bot-token}")
    private String botToken;
    @Value("${telegram.chat-id}")
    private String chatId;
    @Value("${telegram.habilitar-telegram}")
    private boolean habilitarTelegram;

    private static final Logger logger = LoggerFactory.getLogger(TelegramBot.class);

    public void sendMessage(String mensagem){
        if(habilitarTelegram){
            String apiUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage";
            String url = String.format(
                    "%s?chat_id=%s&text=%s&parse_mode=HTML",
                    apiUrl,
                    chatId,
                    encode(mensagem)
            );
            try {
                HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
                connection.setRequestMethod("GET");
                connection.connect();
                int responseCode = connection.getResponseCode();
                if (responseCode != 200) {
                    logger.error("Erro ao enviar mensagem para o Telegram: " + responseCode);
                }
            } catch (Exception e) {
                logger.error("Erro ao enviar mensagem para o Telegram: " + e.getMessage(), e);
            }
        }
    }
    private String encode(String value) {
        try {
            return URLEncoder.encode(value, "UTF-8");
        } catch (Exception e) {
            return value;
        }
    }
}
