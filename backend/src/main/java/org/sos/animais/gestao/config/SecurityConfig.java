package org.sos.animais.gestao.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.service.CastrationService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import com.nimbusds.jose.shaded.gson.internal.LinkedTreeMap;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.*;
import java.util.stream.Collectors;

@Component
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Value("${keycloak.client.id}")
    private String keyCloackClient;
    @Value("${spring.profiles.active}")
    private String profile;

    private final AccessDeniedHandlerJwt accessDeniedHandlerJwt;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CorsProperties corsProperties;
    private static final Logger logger = LoggerFactory.getLogger(SecurityConfig.class);

    public SecurityConfig(AccessDeniedHandlerJwt accessDeniedHandlerJwt, CustomAuthenticationEntryPoint customAuthenticationEntryPoint, CorsProperties corsProperties) {
        this.accessDeniedHandlerJwt = accessDeniedHandlerJwt;
        this.customAuthenticationEntryPoint = customAuthenticationEntryPoint;
        this.corsProperties = corsProperties;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(c->{
                    c.ignoringRequestMatchers("/public/**");
                })
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**").permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwtConfigurer -> jwtConfigurer
                                .jwtAuthenticationConverter(jwtAuthenticationConverterForKeycloak()) // Converte claims para roles
                        )
                        .authenticationEntryPoint(customAuthenticationEntryPoint)
                        .accessDeniedHandler(accessDeniedHandlerJwt)

                )

                .build();
    }


    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverterForKeycloak() {
        Converter<Jwt, Collection<GrantedAuthority>> jwtGrantedAuthoritiesConverter = jwt -> {
            Set<String> roles = new HashSet<>();

            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null && realmAccess.get("roles") instanceof List<?>) {
                List<?> realmRoles = (List<?>) realmAccess.get("roles");
                realmRoles.stream()
                        .filter(role -> role instanceof String)
                        .map(role -> "ROLE_" + role)
                        .forEach(roles::add);
            }

            Map<String, Object> resourceAccess = jwt.getClaim("resource_access");
            if (resourceAccess != null && resourceAccess.get(keyCloackClient) instanceof Map<?, ?> clientAccess) {
                Object clientRolesObj = clientAccess.get("roles");
                if (clientRolesObj instanceof List<?>) {
                    List<?> clientRoles = (List<?>) clientRolesObj;
                    clientRoles.stream()
                            .filter(role -> role instanceof String)
                            .map(role -> "ROLE_" + role)
                            .forEach(roles::add);
                }
            }


            return roles.stream()
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        };

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwtGrantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }


    @Bean
    public CorsFilter corsFilter() {
        return new CorsFilter(corsConfigurationSource());
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(corsProperties.getAllowedOrigins());
        if(profile.equals("dev")){
            for (int i = 2; i <= 254; i++) {
                config.addAllowedOrigin("http://192.168.2." + i + ":3000");
            }
        }else{
            config.getAllowedOrigins().forEach(x->logger.info("******* Allowed Origin: {}", x));
        }
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        config.addExposedHeader("Content-Disposition");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
