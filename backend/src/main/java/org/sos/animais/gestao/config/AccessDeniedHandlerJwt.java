package org.sos.animais.gestao.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
public class AccessDeniedHandlerJwt implements AccessDeniedHandler {
    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException e) throws IOException, ServletException {

        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        response.setStatus(HttpStatus.FORBIDDEN.value());
        Map<String, Object> body = new HashMap<>();
        body.put("error", "Forbidden");
        body.put("message", e.getMessage());
        body.put("path", request.getRequestURI());
        body.put("status", HttpStatus.FORBIDDEN.value());
        response.getOutputStream()
                .write(new com.fasterxml.jackson.databind.ObjectMapper().writeValueAsBytes(body));
    }
}