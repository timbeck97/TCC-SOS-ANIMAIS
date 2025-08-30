package org.sos.animais.gestao.config;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.service.CastrationService;
import org.sos.animais.gestao.service.LogService;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Service
public class FilterConfig extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(FilterConfig.class);
    private final LogService logService;


    public FilterConfig(LogService logService) {
        this.logService = logService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null) {
            ip = request.getRemoteAddr();
        }
        String path = request.getRequestURI();
        if(path.equals("/api/public/adoption")){
            logService.logAccess(path, ip);
        }
        filterChain.doFilter(request, response);
    }
}