package com.ajin.user_service.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

import com.ajin.user_service.dto.ErrorResponse;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(value = UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public @ResponseBody ErrorResponse handleException(UserNotFoundException e, WebRequest request) {
        return ErrorResponse.builder()
                .message(e.getMessage())
                .statusCode(HttpStatus.NOT_FOUND.value())
                .path(request.getDescription(false))
                .timestamp(LocalDateTime.now())
                .build();
    }
}
