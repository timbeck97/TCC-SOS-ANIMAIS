package org.sos.animais.gestao.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.sos.animais.gestao.config.TokenExpiredException;
import org.sos.animais.gestao.dto.TokenKeycloakDto;
import org.sos.animais.gestao.dto.UserDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestClient;
import org.springframework.web.client.RestTemplate;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.*;

@Service
public class AutenticationService {

    @Value("${keycloak.url}")
    private String KEYCLOACK_URL;
    @Value("${keycloak.token.url}")
    private String KEYCLOACK_TOKEN_URL;
    @Value("${keycloak.logout.url}")
    private String KEYCLOACK_LOGOUT_URL;
    @Value("${keycloak.redirect.uri}")
    private String KEYCLOACK_REDIRECT_URI;
    @Value("${keycloak.client.id}")
    private String KEYCLOACK_CLIENT_ID;
    @Value("${keycloak.client.secret}")
    private String KEYCLOACK_CLIENT_SECRET;

    private final RestTemplate restTemplate;

    public AutenticationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public String getKeycloakUrl() throws UnsupportedEncodingException {
        String url = new StringBuilder(KEYCLOACK_URL)
                .append("?client_id=").append(KEYCLOACK_CLIENT_ID)
                .append("&response_type=code")
                .append("&scope=openid")
                .append("&redirect_uri=").append(URLEncoder.encode(KEYCLOACK_REDIRECT_URI,"UTF-8"))
                .toString();
        return url;
    }
    public TokenKeycloakDto getToken(String code) {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "authorization_code");
        requestBody.add("code", code);
        requestBody.add("client_id", KEYCLOACK_CLIENT_ID);
        requestBody.add("client_secret", KEYCLOACK_CLIENT_SECRET);
        requestBody.add("redirect_uri", KEYCLOACK_REDIRECT_URI);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<TokenKeycloakDto> response = restTemplate.exchange(
                KEYCLOACK_TOKEN_URL, HttpMethod.POST, request, TokenKeycloakDto.class);

        TokenKeycloakDto body = response.getBody();
        body.setRoles(getRoles(body.getAccessToken()));
        body.setExpiresIn((System.currentTimeMillis()/1000) + (body.getExpiresIn()));
        body.setRefreshExpiresIn((System.currentTimeMillis()/1000) + (body.getRefreshExpiresIn()));
        return body;
    }
    public List<String> getRoles(String tokenJwt){
        DecodedJWT jwt = JWT.decode(tokenJwt);

        Map<String, Object> resourceAccess = jwt.getClaim("resource_access").asMap();
        Map<String, Object> clientRoles = (Map<String, Object>) resourceAccess.get(KEYCLOACK_CLIENT_ID);
        List<String> roles = (List<String>) clientRoles.get("roles");
        StringBuilder rolesString = new StringBuilder();
        for (String role : roles) {
            rolesString.append(role).append(" ");
        }
        return roles;

    }
    public TokenKeycloakDto getRefreshToken(String refreshToken) throws TokenExpiredException {
        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        requestBody.add("grant_type", "refresh_token");
        requestBody.add("refresh_token", refreshToken);
        requestBody.add("client_id", KEYCLOACK_CLIENT_ID);
        requestBody.add("client_secret", KEYCLOACK_CLIENT_SECRET);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(requestBody, headers);

        ResponseEntity<TokenKeycloakDto> response;
        try{
            response = restTemplate.exchange(
                    KEYCLOACK_TOKEN_URL, HttpMethod.POST, request, TokenKeycloakDto.class);
        }catch (HttpStatusCodeException ex) {
            String responseBody = ex.getResponseBodyAsString();
            throw new TokenExpiredException(responseBody);
        }catch (Exception e){
            throw new RuntimeException("Erro ao atualizar o token");
        }

        TokenKeycloakDto body = response.getBody();
        body.setRoles(getRoles(body.getAccessToken()));
        body.setExpiresIn((System.currentTimeMillis()/1000) + body.getExpiresIn());
        body.setRefreshExpiresIn((System.currentTimeMillis()/1000) + body.getRefreshExpiresIn());
        return body;
    }
    public void logoutKeycloak(String tokenId,HttpServletResponse response) {
        try {
            String url = new StringBuilder(KEYCLOACK_LOGOUT_URL)
                    .append("?id_token_hint=").append(tokenId)
                    .append("&post_logout_redirect_uri=").append(URLEncoder.encode(KEYCLOACK_REDIRECT_URI, "UTF-8"))
                    .toString();
            response.sendRedirect(url);
        } catch (Exception e) {
            throw new RuntimeException("Erro ao deslogar do keycloak");
        }
    }
    public static UserDto getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("Usuário não autenticado");
        }
        String username = null;
        String name = null;
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            username = jwt.getClaim("preferred_username");
            name = jwt.getClaim("name");
        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            username = oauth2User.getAttribute("preferred_username");
            name = oauth2User.getAttribute("name");
        }
        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
        StringBuilder rolesString = new StringBuilder();
        for (GrantedAuthority role : roles) {
            rolesString.append(role.getAuthority()).append(" ");
        }
        return new UserDto(username, name, rolesString.toString());
    }


}
