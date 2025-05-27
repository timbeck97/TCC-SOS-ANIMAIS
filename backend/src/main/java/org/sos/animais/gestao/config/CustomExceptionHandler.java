package org.sos.animais.gestao.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.sos.animais.gestao.dto.ApiErrorDto;
import org.sos.animais.gestao.dto.UserDto;
import org.sos.animais.gestao.service.AutenticationService;
import org.sos.animais.gestao.service.CastrationService;
import org.sos.animais.gestao.service.Utils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class CustomExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);


    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> ApiErrorDtohandleInvalidArgument(MethodArgumentNotValidException ex)
    {
        ex.printStackTrace();
        List<String> details = ex
                .getBindingResult()
                .getFieldErrors()
                .stream()
                .map(fieldError -> fieldError.getField()+" - "+fieldError.getDefaultMessage())
                .collect(Collectors.toList());
        ApiErrorDto err = new ApiErrorDto(LocalDateTime.now(),HttpStatus.BAD_REQUEST,HttpStatus.BAD_REQUEST.value(), "Dados invalidos" ,details);
        return new ResponseEntity<>(err, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<?> ApiErrorAccessDenied(Exception ex)
    {

        List<String> details = Arrays.asList(ex.getMessage());
        UserDto user = AutenticationService.getUser();
        logger.error("Usuario {} sem permissão para acessar este recurso", user!=null?user.userName():"");
        ApiErrorDto err = new ApiErrorDto(LocalDateTime.now(),HttpStatus.FORBIDDEN,HttpStatus.FORBIDDEN.value(), "r" ,details);
        return new ResponseEntity<>(err, HttpStatus.FORBIDDEN);
    }
    @ExceptionHandler(TokenExpiredException.class)
    public ResponseEntity<?> tokenExpired(Exception ex, WebRequest request) {
        List<String> details = new ArrayList<>();
        details.add(ex.getMessage());
        ApiErrorDto err = new ApiErrorDto(LocalDateTime.now(),HttpStatus.UNAUTHORIZED,HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage() ,details);
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> defaultException(Exception ex, WebRequest request) {
        logger.error("Erro inesperado: ", ex);
        List<String> details = new ArrayList<>();
        details.add(ex.getMessage());
        ApiErrorDto err = new ApiErrorDto(LocalDateTime.now(),HttpStatus.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR.value(), ex.getMessage() ,details);
        return new ResponseEntity<>(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
