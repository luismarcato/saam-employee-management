package com.saamauditoria.backend.exception;

public class EmployeeNotFoundException extends RuntimeException {
    
    private static final String DEFAULT_MESSAGE = "Funcionário não encontrado";
    
    public EmployeeNotFoundException() {
        super(DEFAULT_MESSAGE);
    }
    
    public EmployeeNotFoundException(String message) {
        super(message);
    }
}
