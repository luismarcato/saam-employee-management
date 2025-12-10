package com.saamauditoria.backend.exception;

public class InvalidCredentialsException extends RuntimeException {
    
    private static final String DEFAULT_MESSAGE = "Email e/ou senha inválidos";

    public InvalidCredentialsException() {
        super(DEFAULT_MESSAGE);
    }
    
    public InvalidCredentialsException(String message) {
        super(message);
    }
}
