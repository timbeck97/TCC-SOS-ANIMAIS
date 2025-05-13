package org.sos.animais.gestao.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.sos.animais.gestao.config.TokenExpiredException;
import org.sos.animais.gestao.dto.TokenKeycloakDto;
import org.sos.animais.gestao.service.AutenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;

@RestController
@RequestMapping("/public/auth/")
public class LoginController {

    private final AutenticationService autenticationService;

    public LoginController(AutenticationService autenticationService) {
        this.autenticationService = autenticationService;
    }

    @GetMapping("/keycloak")
    public void login(HttpServletRequest req, HttpServletResponse response) throws IOException {
        response.sendRedirect(autenticationService.getKeycloakUrl());

    }
    @GetMapping("/keycloak/token")
    public ResponseEntity<TokenKeycloakDto> getToken(@RequestParam String code) {
        return ResponseEntity.ok(autenticationService.getToken(code));
    }
    @GetMapping("/keycloak/logout")
    public void logout(@RequestParam String tokenId, HttpServletRequest req, HttpServletResponse response) {
        autenticationService.logoutKeycloak(tokenId,response);
    }
    @GetMapping("/keycloak/refresh")
    public ResponseEntity<TokenKeycloakDto> refreshToken(@RequestParam String refreshToken) throws TokenExpiredException {
        return ResponseEntity.ok(autenticationService.getRefreshToken(refreshToken));
    }

}
