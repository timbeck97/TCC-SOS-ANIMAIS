package org.sos.animais.gestao.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class BeanService {


    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
    private String jwkSetUri;


    private static final Logger logger = LoggerFactory.getLogger(BeanService.class);

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @EventListener(ApplicationReadyEvent.class)
    public void logOauth2Config() {
        logger.info("=== OAuth2 Resource Server Config ===");
        logger.info("Issuer URI: {}", issuerUri);
        logger.info("JWK Set URI: {}", jwkSetUri);
        logger.info("======================================");
    }

}
