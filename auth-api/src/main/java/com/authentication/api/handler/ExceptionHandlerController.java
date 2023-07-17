package com.authentication.api.handler;

import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import java.util.List;
import java.util.stream.Collectors;

@ControllerAdvice
public class ExceptionHandlerController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDTO> handleException(MethodArgumentNotValidException exception){
        ErrorDTO dto = new ErrorDTO(HttpStatus.BAD_REQUEST, "Validation Error");
        dto.setDetailedMessage(exception.getBindingResult().getAllErrors().stream()
                .map(err -> err.unwrap(ConstraintViolation.class))
                .map(err -> String.format(" '%s' '%s'", err.getPropertyPath(), err.getMessage()))
                .collect(Collectors.toList()));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(dto);
    }



    @Data
    public static  class ErrorDTO{
        private final int status;
        private final String error;
        private final String message;
        private List<String> detailedMessage;

        public ErrorDTO(HttpStatus httpStatus, String message){
            status = httpStatus.value();
            error = httpStatus.getReasonPhrase();
            this.message = message;
        }
    }
}
