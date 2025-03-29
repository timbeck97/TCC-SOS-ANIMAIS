package org.sos.animais.gestao.config;

import org.sos.animais.gestao.dto.UserDto;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Map;


public class AutenticationService {

    public static UserDto getUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            throw new RuntimeException("Usuário não autenticado");
        }
        String username = null;
        if (authentication.getPrincipal() instanceof Jwt) {
            Jwt jwt = (Jwt) authentication.getPrincipal();
            username = jwt.getClaim("preferred_username");
        } else if (authentication.getPrincipal() instanceof OAuth2User) {
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            username = oauth2User.getAttribute("preferred_username");
        }
        Collection<? extends GrantedAuthority> roles = authentication.getAuthorities();
        StringBuilder rolesString = new StringBuilder();
        for (GrantedAuthority role : roles) {
            rolesString.append(role.getAuthority()).append(" ");
        }
        return new UserDto(username, rolesString.toString());
    }

}
