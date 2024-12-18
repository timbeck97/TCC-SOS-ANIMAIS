package org.sos.animais.gestao.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class UsuarioController {

    @GetMapping("/private")
    public String protegido() {
        return "Protegido";
    }

    @PreAuthorize("hasAnyAuthority('USER')")
    @GetMapping("/private/user")
    public String user() {
        return "REQUISITOU COMO USER";
    }

    @PreAuthorize("hasAnyAuthority('ADMIN')")
    @GetMapping("/private/admin")
    public String admin() {
        return "REQUISITOU COMO ADMIN";
    }


    @GetMapping("/public")
    public String publico() {
        return "Publico";
    }

    @GetMapping("/me")
    public String me() {
        return "Me";
    }

}
